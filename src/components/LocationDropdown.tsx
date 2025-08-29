export default function LocationDropdown({
  onChange,
  selectedLocation,
}: {
  onChange: (location: string) => void
  selectedLocation: string
}) {
  return (
    <select
      className="p-2 rounded-md border"
      defaultValue="Bangkok"
      value={selectedLocation}
      onChange={(e) => onChange(e.target.value)}
    >
      {selectedLocation === "custom" && <option value="custom">Custom</option>}
      {locations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>
  )
}

const locations = [
  "Bangkok",
  "Tokyo",
  "Seoul",
  "Dubai",
  "Manila",
  "London",
  "New York",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Lisbon",
]
