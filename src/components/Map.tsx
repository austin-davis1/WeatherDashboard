import { useEffect } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"
import "leaflet/dist/leaflet.css"
import { MapTypeEnum } from "../utils/MapTypeEnum"
import LoadingState from "./LoadingState"

const API_KEY = import.meta.env.VITE_API_KEY

export default function Map({
  lat,
  lon,
  type,
}: {
  lat: number
  lon: number
  type: MapTypeEnum
}) {
  return (
    <div className="h-144 w-full bg-gray-100 rounded-md overflow-hidden">
      {lat && lon ? (
        <MapContainer
          center={[lat, lon]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <MapTilerLayerComponent />
          <MapCenter lat={lat} lon={lon} />
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.7}
          />
        </MapContainer>
      ) : (
        <LoadingState />
      )}
    </div>
  )
}

// Component to handle map re-centering
function MapCenter({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap()

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], map.getZoom())
    }
  }, [lat, lon, map])

  return null
}

// Custom component to add MapTiler layer
function MapTilerLayerComponent() {
  const map = useMap()

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: "IhKaCSDZTkOXDUTqcSbm",
      style: "backdrop-dark",
    })

    mtLayer.addTo(map)

    return () => {
      map.removeLayer(mtLayer)
    }
  }, [map])

  return null
}
