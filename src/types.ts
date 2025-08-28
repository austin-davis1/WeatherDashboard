import { z } from "zod"

const WeatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
})

const CurrentSchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherSchema),
})

const HourlySchema = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherSchema),
  pop: z.number(),
})

const TempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
})

const FeelsLikeSchema = z.object({
  day: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
})

const DailySchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),
  summary: z.string(),
  temp: TempSchema,
  feels_like: FeelsLikeSchema,
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherSchema),
  clouds: z.number(),
  pop: z.number(),
  uvi: z.number(),
})

export const WeatherDataSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: CurrentSchema,
  hourly: z.array(HourlySchema),
  daily: z.array(DailySchema),
})

export const GeocodeSchema = z.array(
  z.object({
    name: z.string(),
    local_names: z.record(z.string(), z.string()),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    state: z.string().optional(),
  })
)

const StatsResultSchema = z.object({
  month: z.number(),
  day: z.number(),
  temp: z.object({
    record_min: z.number(),
    record_max: z.number(),
    average_min: z.number(),
    average_max: z.number(),
    median: z.number(),
    mean: z.number(),
    p25: z.number(),
    p75: z.number(),
    st_dev: z.number(),
    num: z.number(),
  }),
  pressure: z.object({
    min: z.number(),
    max: z.number(),
    median: z.number(),
    mean: z.number(),
    p25: z.number(),
    p75: z.number(),
    st_dev: z.number(),
    num: z.number(),
  }),
  humidity: z.object({
    min: z.number(),
    max: z.number(),
    median: z.number(),
    mean: z.number(),
    p25: z.number(),
    p75: z.number(),
    st_dev: z.number(),
    num: z.number(),
  }),
  wind: z.object({
    min: z.number(),
    max: z.number(),
    median: z.number(),
    mean: z.number(),
    p25: z.number(),
    p75: z.number(),
    st_dev: z.number(),
    num: z.number(),
  }),
  precipitation: z.object({
    min: z.number(),
    max: z.number(),
    median: z.number(),
    mean: z.number(),
    p25: z.number(),
    p75: z.number(),
    st_dev: z.number(),
    num: z.number(),
  }),
  clouds: z.object({
    min: z.number(),
    max: z.number(),
    median: z.number(),
    mean: z.number(),
    p25: z.number(),
    p75: z.number(),
    st_dev: z.number(),
    num: z.number(),
  }),
})

export const StatsSchema = z.object({
  cod: z.number(),
  city_id: z.number(),
  calctime: z.number(),
  result: z.array(StatsResultSchema),
})

export type WeatherData = z.infer<typeof WeatherDataSchema>
export type Geocode = z.infer<typeof GeocodeSchema>
