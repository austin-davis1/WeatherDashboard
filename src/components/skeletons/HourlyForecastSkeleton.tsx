import Card from "../cards/Card"

export default function HourlyForecastSkeleton() {
  return (
    <Card title="Hourly Forecast">
      <div className="flex gap-6 overflow-x-auto flex-1">
        {Array.from({ length: 12 }).map(() => (
          <div className="flex flex-col items-center gap-2 p-2">
            <div className="animate-pulse bg-background dark:bg-accent h-fit rounded-full">
              <p className="invisible whitespace-nowrap">10:00 AM</p>
            </div>
            <div className="animate-pulse rounded-full size-8 bg-background dark:bg-accent" />
            <div className="animate-pulse bg-background dark:bg-accent h-fit rounded-full">
              <p className="invisible whitespace-nowrap">100°F</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
