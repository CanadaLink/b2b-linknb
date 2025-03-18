"use client"

import { useEffect, type RefObject } from "react"

type RefType = RefObject<HTMLElement>

export function useOnClickOutside(refs: RefType | RefType[], handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Convert single ref to array for consistent handling
      const refArray = Array.isArray(refs) ? refs : [refs]

      // Check if click was inside any of the refs
      const isInside = refArray.some((ref) => {
        const el = ref?.current
        if (!el) return false

        return el.contains(event.target as Node)
      })

      // If click was outside all refs, call handler
      if (!isInside) {
        handler(event)
      }
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [refs, handler])
}

