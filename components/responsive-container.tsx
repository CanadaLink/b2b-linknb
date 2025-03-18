import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  fluid?: boolean
  narrow?: boolean
  wide?: boolean
  noPadding?: boolean
}

export default function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fluid = false,
  narrow = false,
  wide = false,
  noPadding = false,
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        {
          container: !fluid,
          "max-w-3xl": narrow && !wide,
          "max-w-4xl": narrow && !wide && !fluid,
          "max-w-7xl": wide && !narrow,
          "px-4 sm:px-6 lg:px-8": !noPadding,
          "px-3 sm:px-4": noPadding,
        },
        className,
      )}
    >
      {children}
    </Component>
  )
}

