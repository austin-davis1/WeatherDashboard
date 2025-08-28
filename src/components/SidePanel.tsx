import { Suspense } from "react"
import { getStats } from "../api"
import { useSuspenseQuery } from "@tanstack/react-query"
import LoadingState from "./LoadingState"

export default function SidePanel(props: { lat: number; lon: number }) {
  return (
    <div className="fixed z-20 top-0 right-0 h-screen w-[var(--sidebar-width)] bg-background flex flex-col gap-6">
      <Suspense fallback={<LoadingState />}>
        <Stats {...props} />
      </Suspense>
    </div>
  )
}

function Stats({ lat, lon }: { lat: number; lon: number }) {
  const { data: statsData } = useSuspenseQuery({
    queryKey: ["stats", lat, lon],
    queryFn: () => getStats({ lat, lon }),
  })
  console.log(statsData)
  return <div></div>
}
