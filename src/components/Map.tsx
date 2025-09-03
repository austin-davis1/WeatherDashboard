import { useEffect } from "react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"
import "leaflet/dist/leaflet.css"
import { MapTypeEnum } from "../utils/MapTypeEnum"
import LoadingState from "./LoadingState"
import { useTheme } from "./ThemeProvider"

const API_KEY = import.meta.env.VITE_API_KEY

export default function Map({
  lat,
  lon,
  type,
  onMapClick,
}: {
  lat: number
  lon: number
  type: MapTypeEnum
  onMapClick: (lat: number, lon: number) => void
}) {
  return (
    <>
      {lat && lon ? (
        <MapContainer
          center={[lat, lon]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <MapTilerLayerComponent />
          <MapCenter lat={lat} lon={lon} />
          <MapClick onMapClick={onMapClick} />
          <Marker position={[lat, lon]} />
          <TileLayer
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            url={`https://tile.openweathermap.org/map/${type}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.7}
          />
        </MapContainer>
      ) : (
        <LoadingState />
      )}
    </>
  )
}

// Component to handle map re-centering
function MapCenter({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap()

  useEffect(() => {
    if (lat && lon) {
      map.panTo([lat, lon], {
        animate: true,
        duration: 1,
        easeLinearity: 0.2,
      })
    }
  }, [lat, lon, map])

  return null
}

function MapClick({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void
}) {
  const map = useMap()
  map.on("click", (e) => {
    onMapClick(e.latlng.lat, e.latlng.lng)
  })
  return null
}

// Custom component to add MapTiler layer
function MapTilerLayerComponent() {
  const map = useMap()
  const { theme } = useTheme()

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: "IhKaCSDZTkOXDUTqcSbm",
      style: theme === "light" ? "basic" : "basic-dark",
    })

    mtLayer.addTo(map)

    return () => {
      map.removeLayer(mtLayer)
    }
  }, [map, theme])

  return null
}
