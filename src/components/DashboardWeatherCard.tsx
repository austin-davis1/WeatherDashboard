import { useSuspenseQuery } from "@tanstack/react-query"
import { ForecastTypeEnum } from "../utils/ForecastTypeEnum"
import Icon from "./Icon"
import { getWeather } from "../api"
import Card from "./Card"

type Props = {
  coords: { lat: number; lon: number }
  type: ForecastTypeEnum
}

export default function HourlyDailyWeatherCard({ coords, type }: Props) {
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
      <table className="table-fixed ">
        <thead>
          <tr>
            <th />
            {data[type].map((unit) => (
              <th key={unit.dt} className="p-2 whitespace-nowrap">
                {type === ForecastTypeEnum.HOURLY
                  ? new Date(unit.dt * 1000).toLocaleTimeString(
                      "en-GB",
                      timeOptions
                    )
                  : new Date(unit.dt * 1000).toLocaleDateString()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pr-2 !text-left whitespace-nowrap text-primary">
              Weather
            </td>
            {data[type].map((unit) => (
              <td key={unit.dt} className="p-2">
                <Icon src={unit.weather[0].icon} className="mx-auto" />
              </td>
            ))}
          </tr>
          <tr>
            <td className="pr-2 !text-left whitespace-nowrap text-primary">
              Temp(°F)
            </td>
            {data[type].map((unit) => (
              <td key={unit.dt} className="p-2">
                {Math.round(
                  type === ForecastTypeEnum.HOURLY
                    ? unit.temp
                    : (unit.temp as any).day
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="pr-2 !text-left whitespace-nowrap text-primary">
              Relative Humidity (%)
            </td>
            {data[type].map((unit) => (
              <td key={unit.dt} className="p-2">
                {Math.round(unit.humidity)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Card>
  )
}

const timeOptions = {
  hour: "numeric",
  minute: "2-digit",
} as { hour: "numeric"; minute: "2-digit" }
