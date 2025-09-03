import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./Card"
import { getWeather } from "@/api"
import { timeOptions } from "@/utils/timeOptions"
import Sunrise from "/src/assets/sunrise.svg?react"
import Sunset from "/src/assets/sunset.svg?react"
import Wind from "/src/assets/wind.svg?react"
import Uv from "/src/assets/uv.svg?react"
import Pressure from "/src/assets/pressure.svg?react"
import Cloud from "/src/assets/cloud.svg?react"
import Arrow from "/src/assets/uparrow.svg?react"

type Props = {
  coords: { lat: number; lon: number }
}

export default function AdditionalWeatherInfo({ coords }: Props) {
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
    <Card title="Additional Weather Info">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {rows.map(({ label, value, Icon }) => (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Icon className="size-8" />
              <span className="text-gray-500">{label}</span>
            </div>
            <p>
              <FormatComponent value={value} number={data.current[value]} />
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset") {
    return new Date(number * 1000).toLocaleTimeString(undefined, timeOptions)
  }
  if (value === "wind_deg") {
    return (
      <Arrow className="size-8" style={{ transform: `rotate(${number}deg)` }} />
    )
  }
  return number
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const
