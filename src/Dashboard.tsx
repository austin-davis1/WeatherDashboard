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
import MapLegend from "./components/MapLegend"

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
    <div className="p-8 lg:pt-8 pt-[calc(var(--header-height)+1rem)] w-full lg:w-[calc(100vw-var(--sidebar-width))] 2xl:h-screen overflow-y-scroll">
      <div className="flex flex-col gap-4 2xl:gap-0 2xl:flex-row 2xl:justify-between 2xl:items-center pb-8">
        <div className="flex justify-between items-center">
          <h1 className="!text-4xl !font-bold">Weather Dashboard</h1>
          <div className="hidden lg:block 2xl:hidden">
            <ThemeToggle
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between 2xl:gap-8">
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
        <div className="hidden 2xl:block">
          <ThemeToggle
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4 overflow-hidden 2xl:h-[calc(100vh-72.53px-64px)] p-2">
        {/* Map */}
        <div className="col-span-1 md:col-span-2 2xl:col-span-4 h-120 2xl:h-auto 2xl:row-span-2 overflow-hidden order-1 relative">
          <Map lat={lat} lon={lon} type={mapType} onMapClick={onMapClick} />
          <MapLegend type={mapType} />
        </div>
        {/* Current weather */}
        <div className="col-span-1 2xl:row-span-2 order-2">
          <Suspense fallback={<CurrentWeatherSkeleton />}>
            <CurrentWeather coords={{ lat, lon }} />
          </Suspense>
        </div>
        {/* Hourly forecast */}
        <div className="col-span-1 md:col-span-2 2xl:col-span-2 2xl:row-span-1 2xl:order-3 order-4">
          <Suspense fallback={<HourlyForecastSkeleton />}>
            <HourlyForecast coords={{ lat, lon }} />
          </Suspense>
        </div>
        {/* Daily forecast */}
        <div className="col-span-1 2xl:col-span-1 2xl:row-span-2 2xl:order-4 order-3">
          <Suspense fallback={<DailyForecastSkeleton />}>
            <DailyForecast coords={{ lat, lon }} />
          </Suspense>
        </div>
        {/* Additional info */}
        <div className="col-span-1 md:col-span-2 2xl:col-span-2 md:row-span-1 order-5">
          <Suspense fallback={<AdditionalInfoSkeleton />}>
            <AdditionalWeatherInfo coords={{ lat, lon }} />
          </Suspense>
        </div>
      </div>
      <SidePanel lat={lat} lon={lon} />
    </div>
  )
}
