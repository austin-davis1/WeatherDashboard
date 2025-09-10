import { MapTypeEnum } from "@/utils/MapTypeEnum"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MapTypeDropdown({
  onChange,
}: {
  onChange: (type: MapTypeEnum) => void
}) {
  return (
    <Select
      defaultValue={MapTypeEnum.Precipitation}
      onValueChange={(value) => onChange(value as MapTypeEnum)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-10005">
        {Object.keys(MapTypeEnum).map((type) => (
          <SelectItem
            value={MapTypeEnum[type as keyof typeof MapTypeEnum]}
            key={type}
          >
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
