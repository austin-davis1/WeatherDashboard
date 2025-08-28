import { Suspense, useState } from "react"
import Map from "../components/Map"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "../api"
import { MapTypeEnum } from "../utils/MapTypeEnum"
import LocationDropdown from "../components/LocationDropdown"
import MapTypeDropdown from "../components/MapTypeDropdown"
import DashboardWeatherCard from "../components/DashboardWeatherCard"
import { ForecastTypeEnum } from "../utils/ForecastTypeEnum"
import LoadingState from "../components/LoadingState"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState("Bangkok")
  const [mapType, setMapType] = useState(MapTypeEnum.Precipitation)
  const [forecastType, setForecastType] = useState(ForecastTypeEnum.HOURLY)

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", selectedLocation],
    queryFn: () => getGeocode({ location: selectedLocation }),
  })

  const { lat, lon } = geocodeData?.[0] ?? { lat: 0, lon: 0 }

  return (
    <>
      <div className="flex flex-col gap-8 mr-[var(--sidebar-width)]">
        <div className="flex flex-row gap-4">
          <h1>Dashboard</h1>
          <LocationDropdown onChange={setSelectedLocation} />
          <MapTypeDropdown onChange={setMapType} />
        </div>
        <div>
          <Map lat={lat} lon={lon} type={mapType} />
        </div>
        <div className="flex flex-col gap-4">
          <ToggleGroup
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
            <DashboardWeatherCard coords={{ lat, lon }} type={forecastType} />
          </Suspense>
        </div>
      </div>
      {/* <SidePanel lat={lat} lon={lon} /> */}
    </>
  )
}
