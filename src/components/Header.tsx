import { Switch } from "@/components/ui/switch"

export default function Header() {
  return (
    <div className="fixed w-[calc(100vw-var(--sidebar-width))] top-0 left-0 z-50 p-4 px-12 h-[var(--header-height)] flex justify-between items-center">
      <h1 className="!text-4xl !font-bold">Weather Dashboard</h1>
      <Switch />
    </div>
  )
}
