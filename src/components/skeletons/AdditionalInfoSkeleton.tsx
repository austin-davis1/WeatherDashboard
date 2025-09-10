import Card from "../cards/Card"

export default function AdditionalInfoSkeleton() {
  return (
    <Card title="Additional Weather Info">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {Array.from({ length: 6 }).map(() => (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="size-8 animate-pulse bg-accent rounded-full" />
              <div className="animate-pulse bg-accent h-fit rounded-full">
                <p className="invisible">Pressure (hPa)</p>
              </div>
            </div>
            <div className="animate-pulse rounded-full size-8 bg-accent" />
          </div>
        ))}
      </div>
    </Card>
  )
}
