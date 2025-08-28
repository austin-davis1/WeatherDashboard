import clsx from "clsx"

export default function Icon({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${src}.png`}
      alt="icon"
      className={clsx("size-8", className)}
    />
  )
}
