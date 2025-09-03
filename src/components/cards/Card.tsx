import clsx from "clsx"

export default function Card({
  children,
  title,
  className,
}: {
  children: React.ReactNode
  title: string
  className?: string
}) {
  return (
    <div
      className={clsx(
        "bg-light-background dark:bg-background p-4 rounded-md size-full flex flex-col gap-4 animate-[fade-in_1s_ease-in-out_forwards]",
        className
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  )
}
