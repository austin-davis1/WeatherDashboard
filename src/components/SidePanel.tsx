import { Suspense, useContext } from "react"
import Information from "/src/assets/information.svg?react"
import { getAirPollution } from "../api"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Slider } from "./ui/slider"
import {
  airQualityRanges,
  getAirQualityLevel,
  getSliderColor,
  getSliderTrackColor,
  pollutantKeyMapping,
  pollutantNameMapping,
  type AirQualityLevel,
  type Range,
} from "@/utils/airPollution"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import AirPollutionSkeleton from "./skeletons/AirPollutionSkeleton"
import { SidePanelContext } from "@/app"
import clsx from "clsx"
import { cn } from "@/lib/utils"
import ChevronLeft from "/src/assets/ChevronLeft.svg?react"

export default function SidePanel(props: { lat: number; lon: number }) {
  const { isSidePanelOpen, setIsSidePanelOpen } = useContext(SidePanelContext)
  return (
    <div
      className={clsx(
        "fixed z-10005 top-0 right-0 h-screen w-[var(--sidebar-width)] bg-sidebar-accent lg:translate-x-0! p-4 py-8 transition-transform duration-300 overflow-y-scroll shadow-md",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button onClick={() => setIsSidePanelOpen(false)} className="lg:hidden">
        <ChevronLeft className="size-8" />
      </button>
      <Suspense fallback={<AirPollutionSkeleton />}>
        <AirPollution {...props} />
      </Suspense>
    </div>
  )
}

function AirPollution({ lat, lon }: { lat: number; lon: number }) {
  const { data: airPollutionData } = useSuspenseQuery({
    queryKey: ["airPollution", lat, lon],
    queryFn: () => getAirPollution({ lat, lon }),
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-semibold">
          {airPollutionData.list[0].main.aqi}
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">AQI</h1>
          <Tooltip>
            <TooltipTrigger>
              <Information className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 =
                Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(airPollutionData.list[0].components).map(
          ([key, value]) => {
            // Normalize the key to match our pollutant types
            const normalizedKey = key.toLowerCase()
            const pollutant = pollutantKeyMapping[normalizedKey]

            const ranges = airQualityRanges[pollutant]
            if (!ranges) {
              console.log("No ranges found for pollutant:", pollutant)
              return null
            }

            const currentLevel = getAirQualityLevel(pollutant, value)
            const maxValue = Math.max(
              ...Object.values(ranges).map((r: Range) => r.max || 0)
            )
            const normalizedValue = Math.min(value, maxValue)

            return (
              <div
                key={key}
                className="bg-card shadow-md rounded-lg p-4 hover:scale-105 transition-all duration-300"
              >
                <div className="animate-[fade-in_0.6s_ease-out_forwards] space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold capitalize">{key}</h2>
                      <Tooltip>
                        <TooltipTrigger>
                          <Information className="size-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Concentration of {pollutantNameMapping[pollutant]}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">{value}</span>
                      <span className="text-xs text-muted-foreground">
                        μg/m³
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <Slider
                      value={[normalizedValue]}
                      min={0}
                      max={maxValue}
                      disabled
                      className="w-full"
                    />
                    {/* Custom colored track overlay */}
                    <div className="absolute top-0 left-0 w-full h-2 pointer-events-none">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          getSliderTrackColor(currentLevel)
                        )}
                        style={{
                          width: `${(normalizedValue / maxValue) * 100}%`,
                          backgroundColor:
                            currentLevel === "Good"
                              ? "#dcfce7"
                              : currentLevel === "Fair"
                                ? "#fef3c7"
                                : currentLevel === "Moderate"
                                  ? "#fed7aa"
                                  : currentLevel === "Poor"
                                    ? "#fecaca"
                                    : "#e9d5ff",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>0</span>
                    <span>{maxValue}</span>
                  </div>
                  <div className="flex gap-1">
                    {Object.entries(ranges).map(([level]) => (
                      <span
                        key={level}
                        className={cn(
                          "px-2 py-1 rounded text-xs font-medium transition-all duration-200",
                          level === currentLevel
                            ? getSliderColor(level as AirQualityLevel) +
                                " text-white shadow-sm"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
