import { AirPollutionSchema, GeocodeSchema, WeatherDataSchema } from "./types"

const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  )
  const data = await res.json()
  return WeatherDataSchema.parse(data)
}

export async function getGeocode({
  location,
  limit = 1,
}: {
  location: string
  limit?: number
}) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${API_KEY}`
  )
  const data = await res.json()
  return GeocodeSchema.parse(data)
}

export async function getReverseGeocode({
  lat,
  lon,
  limit = 1,
}: {
  lat: number
  lon: number
  limit?: number
}) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`
  )
  const data = await res.json()
  return GeocodeSchema.parse(data)
}

export async function getAirPollution({
  lat,
  lon,
}: {
  lat: number
  lon: number
}) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  const data = await res.json()
  return AirPollutionSchema.parse(data)
}

// export async function getStats({ lat, lon }: { lat: number; lon: number }) {
//   const res = await fetch(
//     `history.openweathermap.org/data/2.5/aggregated/year?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//   )
//   console.log(res)
//   const data = await res.json()
//   return StatsSchema.parse(data)
// }
