import Card from "../cards/Card"

export default function DailyForecastSkeleton() {
  return (
    <Card title="Daily Forecast">
      {/* Daily forecast */}
      <div className="flex flex-col gap-8">
        {Array.from({ length: 8 }).map(() => (
          <div className="w-full animate-pulse bg-background-secondary h-8 rounded-full" />
        ))}
      </div>
    </Card>
  )
}
