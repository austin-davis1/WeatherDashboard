export default function LocationDropdown({
  onChange,
}: {
  onChange: (location: string) => void
}) {
  return (
    <select
      className="p-2 rounded-md border"
      defaultValue="Bangkok"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="Bangkok">Bangkok</option>
      <option value="Tokyo">Tokyo</option>
      <option value="Seoul">Seoul</option>
      <option value="Dubai">Dubai</option>
      <option value="Manila">Manila</option>
      <option value="London">London</option>
      <option value="New York">New York</option>
      <option value="Paris">Paris</option>
      <option value="Berlin">Berlin</option>
      <option value="Madrid">Madrid</option>
      <option value="Rome">Rome</option>
      <option value="Lisbon">Lisbon</option>
    </select>
  )
}
