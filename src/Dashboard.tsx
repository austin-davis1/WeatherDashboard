import { Suspense, useRef, useState } from "react"
import Map from "./components/Map"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "./api"
import { MapTypeEnum } from "./utils/MapTypeEnum"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import SidePanel from "@/components/SidePanel"
import DailyForecast from "@/components/cards/DailyForecast"
import AdditionalWeatherInfo from "@/components/cards/AdditionalWeatherInfo"
import { ThemeToggle } from "@/components/ui/switch"
import { useTheme } from "@/components/ThemeProvider"
import HourlyForecast from "@/components/cards/HourlyForecast"
import AdditionalInfoSkeleton from "@/components/skeletons/AdditionalInfoSkeleton"
import HourlyForecastSkeleton from "@/components/skeletons/HourlyForecastSkeleton"
import DailyForecastSkeleton from "@/components/skeletons/DailyForecastSkeleton"
import CurrentWeatherSkeleton from "@/components/skeletons/CurrentWeatherSkeleton"
import CurrentWeather from "@/components/cards/CurrentWeather"

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState("Bangkok")
  const [mapType, setMapType] = useState<MapTypeEnum>(MapTypeEnum.Precipitation)
  const [mapClickCount, setMapClickCount] = useState(0)
  const { theme, toggleTheme } = useTheme()
  // Refs used for custom location
  const latRef = useRef<number>(0)
  const lonRef = useRef<number>(0)

  // Takes in city name and returns lat and lon coordinates
  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", selectedLocation],
    queryFn: () => getGeocode({ location: selectedLocation }),
  })

  // If custom location, use lat and lon from refs, otherwise use lat, lon from geocode data
  const { lat, lon } =
    selectedLocation === "custom"
      ? { lat: latRef.current, lon: lonRef.current }
      : (geocodeData?.[0] ?? { lat: 0, lon: 0 })

  // When user clicks on map, set selected location to custom and update refs
  const onMapClick = (lat: number, lon: number) => {
    setSelectedLocation("custom")
    latRef.current = lat
    lonRef.current = lon
    setMapClickCount(mapClickCount + 1)
  }

  return (
    <div className="p-8 w-[calc(100vw-var(--sidebar-width))] h-[100vh] overflow-hidden">
      <div className="flex flex-col gap-8 pb-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="!text-4xl !font-bold">Weather Dashboard</h1>
          <div className="flex gap-8">
            <div className="flex gap-4">
              <h1 className="text-2xl font-semibold">Location:</h1>
              <LocationDropdown
                onChange={setSelectedLocation}
                selectedLocation={selectedLocation}
              />
            </div>
            <div className="flex gap-4">
              <h1 className="text-2xl font-semibold">Map Type:</h1>
              <MapTypeDropdown onChange={setMapType} />
            </div>
          </div>
          <ThemeToggle
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-4 gap-4 overflow-hidden h-[calc(100vh-72.53px-64px)]">
        <div className="col-span-1 md:col-span-4 row-span-2 md:row-span-2 overflow-hidden">
          <Map lat={lat} lon={lon} type={mapType} onMapClick={onMapClick} />
        </div>
        <div className="col-span-1 md:col-span-1 row-span-1 md:row-span-2">
          <Suspense fallback={<CurrentWeatherSkeleton />}>
            <CurrentWeather coords={{ lat, lon }} />
          </Suspense>
        </div>
        <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-1">
          <Suspense fallback={<HourlyForecastSkeleton />}>
            <HourlyForecast coords={{ lat, lon }} />
          </Suspense>
        </div>
        <div className="col-span-1 md:col-span-1 row-span-1 md:row-span-2">
          <Suspense fallback={<DailyForecastSkeleton />}>
            <DailyForecast coords={{ lat, lon }} />
          </Suspense>
        </div>
        <div className="col-span-2 md:col-span-2 row-span-1 md:row-span-1">
          <Suspense fallback={<AdditionalInfoSkeleton />}>
            <AdditionalWeatherInfo coords={{ lat, lon }} />
          </Suspense>
        </div>
      </div>
      <SidePanel lat={lat} lon={lon} />
    </div>
  )
}
