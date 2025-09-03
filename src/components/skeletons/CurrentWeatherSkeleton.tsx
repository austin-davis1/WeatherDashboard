import Card from "../Card"

export default function CurrentWeatherSkeleton() {
  return (
    <Card title="Current Weather">
      <div className="flex flex-col gap-4 ">
        <div className="animate-pulse bg-background-secondary h-fit w-fit rounded-full">
          <h1 className="text-6xl font-semibold invisible">100.00°F</h1>
        </div>
        <div className="flex gap-4">
          <h1 className="invisible">Cloudy Sky</h1>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2 animate-pulse bg-background-secondary h-fit rounded-full">
          <span className="invisible">Feels Like</span>
          <p className="invisible">100.00°F</p>
        </div>
        <div className="flex flex-col gap-2 animate-pulse bg-background-secondary h-fit rounded-full">
          <span className="invisible">Humidity</span>
          <p className="invisible">100%</p>
        </div>
        <div className="flex flex-col gap-2 animate-pulse bg-background-secondary h-fit rounded-full">
          <span className="invisible">Wind</span>
          <p className="invisible">10.00 mph</p>
        </div>
      </div>
    </Card>
  )
}
