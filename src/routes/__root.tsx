import { Outlet, createRootRoute } from "@tanstack/react-router"
import Landing from "../components/Landing"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Landing />
      <div className="px-12 py-2 sm:mr-[var(--sidebar-width)]">
        <Outlet />
      </div>
    </>
  )
}
