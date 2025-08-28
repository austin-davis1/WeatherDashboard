import { Outlet, createRootRoute } from "@tanstack/react-router"
import Landing from "../components/Landing"
import SideNav from "../components/Sidenav"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Landing />
      <SideNav />
      <div className="ml-[var(--sidebar-width)] px-12 py-2">
        <Outlet />
      </div>
    </>
  )
}
