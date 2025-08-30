import { useSuspenseQuery } from "@tanstack/react-query"
import Icon from "./Icon"
import { getWeather } from "@/api"
import Card from "./Card"
import { timeOptions } from "@/utils/timeOptions"

type Props = {
  coords: { lat: number; lon: number }
}

export default function WeatherCard({ coords }: Props) {
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
    <Card>
      {/* Current weather */}
      <div className="flex justify-between">
        <h1 className="!text-6xl font-semibold">{data.current.temp}°F</h1>
        <div className="flex gap-4">
          <h1>{data.current.weather[0].description}</h1>
          <Icon src={data.current.weather[0].icon} />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Feels Like</span>
          <p>{data.current.feels_like}°F</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Humidity</span>
          <p>{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-gray-500">Wind</span>
          <p>{data.current.wind_speed} mph</p>
        </div>
      </div>
      {/* Hourly forecast */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Hourly Forecast</h2>
        <div className="flex gap-6 overflow-x-auto">
          {data.hourly.map((hour) => (
            <div className="flex flex-col items-center gap-2 p-2">
              <p className="whitespace-nowrap">
                {new Date(hour.dt * 1000).toLocaleTimeString(
                  undefined,
                  timeOptions
                )}
              </p>
              <Icon src={hour.weather[0].icon} />
              <p>{Math.round(hour.temp)}°F</p>
            </div>
          ))}
        </div>
      </div>
      {/* Daily forecast */}
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">Daily Forecast</h2>
        {data.daily.map((day) => (
          <div className="flex justify-between">
            <p className="w-9">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            <Icon src={day.weather[0].icon} />
            <p>{Math.round(day.temp.day)}°F</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)}°F</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)}°F</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
