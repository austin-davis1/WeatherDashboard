import Card from "../cards/Card"

export default function CurrentWeatherSkeleton() {
  return (
    <Card title="Current Weather">
      <div className="flex flex-col justify-around gap-4 md:gap-0 items-center h-full">
        <div className="flex flex-col gap-2">
          <span className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full">
            <h1 className="text-6xl font-semibold text-center invisible">
              199.99°F
            </h1>
          </span>
          <div className="flex gap-2 justify-center items-center">
            <span className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full">
              <h1 className="capitalize text-xl invisible">Cloudy</h1>
            </span>
            <div className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full size-14" />
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <span className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full">
              <p className="text-xl text-center invisible">Local Time:</p>{" "}
            </span>
            <span className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full">
              <p className="font-semibold text-4xl invisible">23:33 PM</p>
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-xl">Feels Like</span>
            <span className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full">
              <p className="text-xl invisible">199.99°F</p>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-xl">Humidity</span>
            <span className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full">
              <p className="text-xl invisible">100%</p>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-500 text-xl">Wind</span>
            <span className="animate-pulse bg-foreground/25 dark:bg-accent rounded-full">
              <p className="text-xl invisible">25.55 mph</p>
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
