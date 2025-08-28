import { MapTypeEnum } from "../utils/MapTypeEnum"

export default function MapTypeDropdown({
  onChange,
}: {
  onChange: (type: MapTypeEnum) => void
}) {
  return (
    <select
      className="p-2 rounded-md border"
      defaultValue={MapTypeEnum.Precipitation}
      onChange={(e) => onChange(e.target.value as MapTypeEnum)}
    >
      {Object.keys(MapTypeEnum).map((type) => (
        <option
          value={MapTypeEnum[type as keyof typeof MapTypeEnum]}
          key={type}
        >
          {type}
        </option>
      ))}
    </select>
  )
}
