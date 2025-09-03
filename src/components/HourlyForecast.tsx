import { useSuspenseQuery } from "@tanstack/react-query"
import Icon from "./Icon"
import { getWeather } from "@/api"
import Card from "./Card"
import { timeOptions } from "@/utils/timeOptions"

type Props = {
  coords: { lat: number; lon: number }
}

export default function HourlyForecast({ coords }: Props) {
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
    <Card title="Hourly Forecast (48 Hours)">
      {/* Hourly forecast */}
      <div className="flex gap-6 overflow-x-auto flex-1">
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
    </Card>
  )
}
