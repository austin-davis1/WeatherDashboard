import { Link } from "@tanstack/react-router"
import Dashboard from "/src/assets/dashboard.svg?react"
import Search from "/src/assets/search.svg?react"

export default function SideNav() {
  return (
    <div className="fixed z-20 top-0 left-0 h-screen w-[var(--sidebar-width)] bg-background flex flex-col gap-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold mx-auto">Weather App</h1>
      <div className="h-px border w-full" />
      {/* Nav Items */}
      <Link to="/" className="flex gap-4 p-4 hover:bg-primary">
        <Dashboard className="size-8" />
        <h2>Home</h2>
      </Link>
      <Link to="/lookup" className="flex gap-4 p-4 hover:bg-primary">
        <Search className="size-8" />
        <h2>Search</h2>
      </Link>

      {/* Light/Dark mode switcher */}
    </div>
  )
}
