import { Suspense, useRef, useState } from "react"
import Map from "../components/Map"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "../api"
import { MapTypeEnum } from "../utils/MapTypeEnum"
import LocationDropdown from "../components/LocationDropdown"
import MapTypeDropdown from "../components/MapTypeDropdown"
import HourlyDailyWeatherCard from "../components/DashboardWeatherCard"
import { ForecastTypeEnum } from "../utils/ForecastTypeEnum"
import LoadingState from "../components/LoadingState"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import SidePanel from "@/components/SidePanel"

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState("Bangkok")
  const [mapType, setMapType] = useState<MapTypeEnum>(MapTypeEnum.Precipitation)
  const [forecastType, setForecastType] = useState(ForecastTypeEnum.HOURLY)
  const [mapClickCount, setMapClickCount] = useState(0)

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
      <div className="flex flex-col gap-8 sm:mr-[var(--sidebar-width)]">
        <div className="flex flex-row gap-4">
          <h1>Dashboard</h1>
          <LocationDropdown
            onChange={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
          <MapTypeDropdown onChange={setMapType} />
        </div>
        <div>
          <Map lat={lat} lon={lon} type={mapType} onMapClick={onMapClick} />
        </div>
        <div className="flex flex-col gap-4">
          <ToggleGroup
            value={forecastType}
            variant="outline"
            type="single"
            className="mx-auto"
            onValueChange={(value) => {
              if (value && value !== forecastType)
                setForecastType(value as unknown as ForecastTypeEnum)
            }}
          >
            <ToggleGroupItem
              value={ForecastTypeEnum.HOURLY}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Hourly
            </ToggleGroupItem>
            <ToggleGroupItem
              value={ForecastTypeEnum.DAILY}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Daily
            </ToggleGroupItem>
          </ToggleGroup>
          <Suspense fallback={<LoadingState />}>
            <HourlyDailyWeatherCard coords={{ lat, lon }} type={forecastType} />
          </Suspense>
        </div>
      </div>
      <SidePanel lat={lat} lon={lon} />
    </>
  )
}
