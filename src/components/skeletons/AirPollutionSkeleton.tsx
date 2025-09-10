export default function AirPollutionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <div className="flex flex-col gap-2">
        <div className="animate-pulse bg-accent h-fit w-fit rounded-full">
          <h1 className="text-5xl font-semibold invisible">5</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">AQI</h1>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {Array.from({ length: 7 }).map(() => {
          return (
            <div className="space-y-3 bg-card shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 animate-pulse bg-accent h-fit rounded-full">
                  <h2 className="text-lg font-bold invisible">Co</h2>
                </div>
                <div className="flex items-center gap-2 animate-pulse bg-accent h-fit rounded-full">
                  <span className="text-lg font-semibold invisible">
                    999.99
                  </span>
                  <span className="text-xs text-muted-foreground invisible">
                    μg/m³
                  </span>
                </div>
              </div>

              <div className="relative w-full h-6 animate-pulse bg-accent rounded-full" />
              <div className="flex gap-1 w-full h-6 animate-pulse bg-accent rounded-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
