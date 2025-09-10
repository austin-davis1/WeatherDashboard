import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LocationDropdown({
  onChange,
  selectedLocation,
}: {
  onChange: (location: string) => void
  selectedLocation: string
}) {
  return (
    <Select
      defaultValue="Bangkok"
      value={selectedLocation}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-10005">
        {selectedLocation === "custom" && (
          <SelectItem value="custom">Custom</SelectItem>
        )}
        {locations.map((location) => (
          <SelectItem key={location} value={location}>
            {location}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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
