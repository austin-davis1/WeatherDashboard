import { Outlet, createRootRoute } from "@tanstack/react-router"
import Landing from "../components/Landing"
import Header from "@/components/Header"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Landing />
      <Header />
      <div className="px-12 py-2 sm:mr-[var(--sidebar-width)] mt-[var(--header-height)]">
        <Outlet />
      </div>
    </>
  )
}
