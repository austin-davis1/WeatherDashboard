export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background p-8 rounded-md w-full flex flex-col gap-8">
      {children}
    </div>
  )
}
