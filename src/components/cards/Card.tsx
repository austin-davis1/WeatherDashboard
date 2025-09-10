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
        "bg-card p-4 rounded-xl size-full flex flex-col gap-4 shadow-md",
        className
      )}
    >
      <h2 className="text-2xl font-semibold sticky left-0">{title}</h2>
      <div className="animate-[fade-in_0.6s_ease-out_forwards]">{children}</div>
    </div>
  )
}
