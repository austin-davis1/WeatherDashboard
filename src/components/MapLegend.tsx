import { MapTypeEnum } from "@/utils/MapTypeEnum"

interface MapLegendProps {
  type: MapTypeEnum
}

export default function MapLegend({ type }: MapLegendProps) {
  const data = mapTypeData[type]

  // Create gradient stops for CSS
  const gradientStops = data.stops
    .map(
      (stop) =>
        `${stop.color} ${(stop.value / Math.max(...data.stops.map((s) => s.value))) * 100}%`
    )
    .join(", ")

  // Format value for display
  const formatValue = (value: number): string => {
    if (type === MapTypeEnum.Pressure) {
      return (value / 1000).toFixed(0) + "k"
    }
    return value.toString()
  }

  return (
    <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-accent/70 absolute top-4 right-4 z-1000 w-48 sm:w-96">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        {data.title}
      </h3>

      {/* Gradient bar */}
      <div className="mb-3">
        <div
          className="w-full h-6 rounded-xl border border-accent/70"
          style={{
            background: `linear-gradient(to right, ${gradientStops})`,
          }}
        />
      </div>

      {/* Value labels */}
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>
          {formatValue(data.stops[0].value)} {data.unit}
        </span>
        <span>
          {formatValue(data.stops[data.stops.length - 1].value)} {data.unit}
        </span>
      </div>
    </div>
  )
}

const mapTypeData: Record<
  MapTypeEnum,
  { title: string; unit: string; stops: ColorStop[] }
> = {
  [MapTypeEnum.Precipitation]: {
    title: "Rain (mm)",
    unit: "mm",
    stops: [
      { value: 0, color: "rgba(225, 200, 100, 0)" },
      { value: 0.1, color: "rgba(200, 150, 150, 0)" },
      { value: 0.2, color: "rgba(150, 150, 170, 0)" },
      { value: 0.5, color: "rgba(120, 120, 190, 0)" },
      { value: 1, color: "rgba(110, 110, 205, 0.3)" },
      { value: 10, color: "rgba(80, 80, 225, 0.7)" },
      { value: 140, color: "rgba(20, 20, 255, 0.9)" },
    ],
  },
  [MapTypeEnum.Temperature]: {
    title: "Temperature (°C)",
    unit: "°C",
    stops: [
      { value: -65, color: "rgba(130, 22, 146, 1)" },
      { value: -55, color: "rgba(130, 22, 146, 1)" },
      { value: -45, color: "rgba(130, 22, 146, 1)" },
      { value: -40, color: "rgba(130, 22, 146, 1)" },
      { value: -30, color: "rgba(130, 87, 219, 1)" },
      { value: -20, color: "rgba(32, 140, 236, 1)" },
      { value: -10, color: "rgba(32, 196, 232, 1)" },
      { value: 0, color: "rgba(35, 221, 221, 1)" },
      { value: 10, color: "rgba(194, 255, 40, 1)" },
      { value: 20, color: "rgba(255, 240, 40, 1)" },
      { value: 25, color: "rgba(255, 194, 40, 1)" },
      { value: 30, color: "rgba(252, 128, 20, 1)" },
    ],
  },
  [MapTypeEnum.Cloud]: {
    title: "Clouds (%)",
    unit: "%",
    stops: [
      { value: 0, color: "rgba(255, 255, 255, 0.0)" },
      { value: 10, color: "rgba(253, 253, 255, 0.1)" },
      { value: 20, color: "rgba(252, 251, 255, 0.2)" },
      { value: 30, color: "rgba(250, 250, 255, 0.3)" },
      { value: 40, color: "rgba(249, 248, 255, 0.4)" },
      { value: 50, color: "rgba(247, 247, 255, 0.5)" },
      { value: 60, color: "rgba(246, 245, 255, 0.75)" },
      { value: 70, color: "rgba(244, 244, 255, 1)" },
      { value: 80, color: "rgba(243, 242, 255, 1)" },
      { value: 90, color: "rgba(242, 241, 255, 1)" },
      { value: 100, color: "rgba(240, 240, 255, 1)" },
    ],
  },
  [MapTypeEnum.Pressure]: {
    title: "Pressure (Pa)",
    unit: "Pa",
    stops: [
      { value: 94000, color: "rgba(0, 115, 255, 1)" },
      { value: 96000, color: "rgba(0, 170, 255, 1)" },
      { value: 98000, color: "rgba(75, 208, 214, 1)" },
      { value: 100000, color: "rgba(141, 231, 199, 1)" },
      { value: 101000, color: "rgba(176, 247, 32, 1)" },
      { value: 102000, color: "rgba(240, 184, 0, 1)" },
      { value: 104000, color: "rgba(251, 85, 21, 1)" },
      { value: 106000, color: "rgba(243, 54, 59, 1)" },
      { value: 108000, color: "rgba(198, 0, 0, 1)" },
    ],
  },
  [MapTypeEnum.Wind]: {
    title: "Wind (m/s)",
    unit: "m/s",
    stops: [
      { value: 1, color: "rgba(255, 255, 255, 0)" },
      { value: 5, color: "rgba(238, 206, 206, 0.4)" },
      { value: 15, color: "rgba(179, 100, 188, 0.7)" },
      { value: 25, color: "rgba(63, 33, 59, 0.8)" },
      { value: 50, color: "rgba(116, 76, 172, 0.9)" },
      { value: 100, color: "rgba(70, 0, 175, 1)" },
      { value: 200, color: "rgba(13, 17, 38, 1)" },
    ],
  },
}

interface ColorStop {
  value: number
  color: string
  opacity?: number
}
