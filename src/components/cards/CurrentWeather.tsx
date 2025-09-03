import { useSuspenseQuery } from "@tanstack/react-query"
import Icon from "../Icon"
import { getWeather } from "@/api"
import Card from "./Card"

type Props = {
  coords: { lat: number; lon: number }
}

export default function CurrentWeather({ coords }: Props) {
  const { lat, lon } = coords
  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () =>
      getWeather({
        lat,
        lon,
      }),
  })
  return (
    <Card title="Current Weather" className="gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-semibold">{data.current.temp}°F</h1>
        <div className="flex gap-4 items-center">
          <h1 className="capitalize text-2xl font-semibold">
            {data.current.weather[0].description}
          </h1>
          <Icon src={data.current.weather[0].icon} className="size-14" />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-2xl">Time:</p>{" "}
          <p className="font-semibold text-4xl">
            {new Date(data.current.dt * 1000).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-gray-500 text-xl">Feels Like</span>
          <p className="text-xl">{data.current.feels_like}°F</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500 text-xl">Humidity</span>
          <p className="text-xl">{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500 text-xl">Wind</span>
          <p className="text-xl">{data.current.wind_speed} mph</p>
        </div>
      </div>
    </Card>
  )
}
