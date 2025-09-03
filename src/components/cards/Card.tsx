export default function Card({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className="bg-light-background dark:bg-background p-4 rounded-md size-full flex flex-col gap-4 animate-[fade-in_1s_ease-in-out_forwards]">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  )
}
