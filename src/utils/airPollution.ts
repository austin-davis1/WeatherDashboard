export type AirQualityLevel =
  | "Good"
  | "Fair"
  | "Moderate"
  | "Poor"
  | "Very Poor"

export interface Range {
  min: number
  max: number | null
}

export type Pollutant =
  | "SO2"
  | "NO2"
  | "PM10"
  | "PM2_5"
  | "O3"
  | "CO"
  | "NO"
  | "NH3"

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>

export const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: null },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: null },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: null },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: null },
  },
  NO: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 40 },
    Moderate: { min: 40, max: 60 },
    Poor: { min: 60, max: 80 },
    "Very Poor": { min: 80, max: null },
  },
  NH3: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
}

export const getAirQualityLevel = (
  pollutant: string,
  value: number
): AirQualityLevel => {
  const ranges = airQualityRanges[pollutant as Pollutant]
  if (!ranges) return "Good"

  for (const [level, range] of Object.entries(ranges)) {
    if (value >= range.min && (range.max === null || value <= range.max)) {
      return level as AirQualityLevel
    }
  }
  return "Very Poor"
}

export const getSliderColor = (level: AirQualityLevel): string => {
  switch (level) {
    case "Good":
      return "bg-green-500"
    case "Fair":
      return "bg-yellow-500"
    case "Moderate":
      return "bg-orange-500"
    case "Poor":
      return "bg-red-500"
    case "Very Poor":
      return "bg-purple-600"
    default:
      return "bg-gray-500"
  }
}

export const getSliderTrackColor = (level: AirQualityLevel): string => {
  switch (level) {
    case "Good":
      return "bg-green-100 dark:bg-green-900/30"
    case "Fair":
      return "bg-yellow-100 dark:bg-yellow-900/30"
    case "Moderate":
      return "bg-orange-100 dark:bg-orange-900/30"
    case "Poor":
      return "bg-red-100 dark:bg-red-900/30"
    case "Very Poor":
      return "bg-purple-100 dark:bg-purple-900/30"
    default:
      return "bg-gray-100 dark:bg-gray-900/30"
  }
}

// Create a mapping from API keys to our pollutant keys
export const pollutantKeyMapping: Record<string, Pollutant> = {
  so2: "SO2",
  no2: "NO2",
  pm10: "PM10",
  pm2_5: "PM2_5",
  o3: "O3",
  co: "CO",
  no: "NO",
  nh3: "NH3",
}

export const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
}
