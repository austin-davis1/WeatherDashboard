import { useSuspenseQuery } from "@tanstack/react-query"
import Icon from "./Icon"
import { getWeather } from "@/api"
import Card from "./Card"

type Props = {
  coords: { lat: number; lon: number }
}

export default function DailyForecast({ coords }: Props) {
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
    <Card title="Daily Forecast">
      {/* Daily forecast */}
      <div className="flex flex-col gap-5">
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
