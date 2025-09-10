import { useContext } from "react"
import { useTheme } from "./ThemeProvider"
import Hamburger from "/src/assets/hamburger.svg?react"
import { ThemeToggle } from "@/components/ui/switch"
import { SidePanelContext } from "@/app"

export default function MobileHeader() {
  const { theme, toggleTheme } = useTheme()
  const { setIsSidePanelOpen } = useContext(SidePanelContext)
  return (
    <div className="w-full h-16 bg-background fixed top-0 left-0 z-10001 lg:hidden flex items-center justify-between px-4">
      <div className="ml-auto flex items-center gap-12">
        <ThemeToggle checked={theme === "dark"} onCheckedChange={toggleTheme} />
        <button onClick={() => setIsSidePanelOpen((prev) => !prev)}>
          <Hamburger className="size-8" />
        </button>
      </div>
    </div>
  )
}
