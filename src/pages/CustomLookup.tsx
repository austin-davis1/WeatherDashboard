import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { getWeather } from "../api"
import DailyForecast from "../components/DailyForecast"
import Map from "../components/Map"

function CustomLookup() {
  const latitudeRef = useRef<HTMLInputElement | null>(null)
  const longitudeRef = useRef<HTMLInputElement | null>(null)

  const { data, refetch } = useQuery({
    queryKey: ["weather"],
    queryFn: () =>
      getWeather({
        lat: Number(latitudeRef.current?.value),
        lon: Number(longitudeRef.current?.value),
      }),
    enabled: false,
  })

  return (
    <>
      <div className="p-12 max-w-[50rem]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 bg-background p-4 rounded-md">
            <h1 className="text-2xl font-semibold">Enter Coordinates:</h1>
            <input
              type="text"
              placeholder="Latitude"
              ref={latitudeRef}
              className="p-2 rounded-md border"
            />
            <input
              type="text"
              placeholder="Longitude"
              ref={longitudeRef}
              className="p-2 rounded-md border"
            />
            <button
              onClick={() => {
                if (!latitudeRef.current?.value || !longitudeRef.current?.value)
                  return
                refetch()
              }}
              className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
            >
              Get Weather!
            </button>
          </div>
          {data && <DailyForecast data={data} />}
          {data && <Map lat={data.lat} lon={data.lon} />}
        </div>
      </div>
    </>
  )
}

export default CustomLookup
