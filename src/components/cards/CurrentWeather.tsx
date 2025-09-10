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
    <Card title="Current Weather">
      <div className="flex flex-col justify-around gap-4 md:gap-0 items-center h-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-semibold text-center">
            {data.current.temp}°F
          </h1>
          <div className="flex gap-2 justify-center items-center">
            <h1 className="capitalize text-xl">
              {data.current.weather[0].description}
            </h1>
            <Icon src={data.current.weather[0].icon} className="size-14" />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <p className="text-xl text-center">Local Time:</p>{" "}
            <p className="font-semibold text-4xl">
              {new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: data.timezone,
              }).format(new Date(data.current.dt * 1000))}
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
      </div>
    </Card>
  )
}
