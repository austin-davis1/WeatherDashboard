import { Suspense, useRef, useState } from "react"
import Map from "../components/Map"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "../api"
import { MapTypeEnum } from "../utils/MapTypeEnum"
import LocationDropdown from "../components/LocationDropdown"
import MapTypeDropdown from "../components/MapTypeDropdown"
import LoadingState from "../components/LoadingState"
import SidePanel from "@/components/SidePanel"
import WeatherCard from "@/components/WeatherCard"
import AdditionalWeatherInfo from "@/components/AdditionalWeatherInfo"
import { ThemeToggle } from "@/components/ui/switch"
import { useTheme } from "@/components/ThemeProvider"

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
    <>
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="!text-4xl !font-bold">Weather Dashboard</h1>
        <ThemeToggle checked={theme === "dark"} onCheckedChange={toggleTheme} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <LocationDropdown
            onChange={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
          <MapTypeDropdown onChange={setMapType} />
        </div>
        <div>
          <Map lat={lat} lon={lon} type={mapType} onMapClick={onMapClick} />
        </div>
        <Suspense fallback={<LoadingState />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <WeatherCard coords={{ lat, lon }} />
            </div>
            <div className="md:col-span-1">
              <AdditionalWeatherInfo coords={{ lat, lon }} />
            </div>
          </div>
        </Suspense>
      </div>
      <SidePanel lat={lat} lon={lon} />
    </>
  )
}
