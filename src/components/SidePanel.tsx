import { Suspense } from "react"
import { getAirPollution } from "../api"
import { useSuspenseQuery } from "@tanstack/react-query"
import LoadingState from "./LoadingState"

export default function SidePanel(props: { lat: number; lon: number }) {
  return (
    <div className="fixed z-20 top-0 right-0 h-screen w-[var(--sidebar-width)] bg-light-background dark:bg-background flex flex-col gap-6 p-4 translate-x-full sm:translate-x-0 transition-transform duration-300">
      <Suspense fallback={<LoadingState />}>
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
        <h1 className="text-2xl font-semibold">AQI</h1>
      </div>
      {Object.entries(airPollutionData.list[0].components).map(
        ([key, value]) => (
          <div key={key} className="flex justify-between">
            <h2>{key}</h2>
            <p>
              {value} <sup>μg/m3</sup>
            </p>
          </div>
        )
      )}
    </div>
  )
}
