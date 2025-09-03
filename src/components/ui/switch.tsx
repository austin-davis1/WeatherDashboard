import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"
import Sun from "/src/assets/sun.svg?react"
import Moon from "/src/assets/moon.svg?react"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

// Theme toggle component with sun/moon icons
function ThemeToggle({
  checked,
  onCheckedChange,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Sun icon for light mode */}
      <Sun
        className={cn(
          "w-5 h-5 transition-colors",
          checked ? "text-gray-400" : "text-yellow-500"
        )}
      />

      <Switch checked={checked} onCheckedChange={onCheckedChange} />

      {/* Moon icon for dark mode */}
      <Moon
        className={cn(
          "w-5 h-5 transition-colors",
          checked ? "text-blue-400" : "text-gray-400"
        )}
      />
    </div>
  )
}

export { Switch, ThemeToggle }
