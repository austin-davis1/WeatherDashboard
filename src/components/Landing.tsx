import clsx from "clsx"
import { useState } from "react"

export default function Landing() {
  const [isLanding, setIsLanding] = useState(true)
  return (
    <div
      className={clsx(
        "w-screen h-screen fixed transition-transform duration-700 ease-in-out z-10000 isolate",
        !isLanding && "-translate-x-full"
      )}
    >
      <video
        src="/rain.mp4"
        autoPlay
        muted
        loop
        className="w-screen h-screen object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col items-center justify-center h-screen relative z-10">
        <h1 className="!text-6xl font-bold !text-white">Find the weather,</h1>
        <h1 className="!text-6xl font-bold">Anywhere in the world</h1>
        <button
          onClick={() => setIsLanding(false)}
          className="mt-8 bg-gradient-to-br from-blue-500 to-green-500 text-white text-3xl font-bold px-4 py-2 rounded-md cursor-pointer hover:scale-110 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
