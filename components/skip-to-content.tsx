"use client"

import { useState, useEffect } from "react"

export function SkipToContent() {
  const [isFocused, setIsFocused] = useState(false)

  // Reset focus state when route changes
  useEffect(() => {
    setIsFocused(false)
  }, [])

  return (
    <a
      href="#main-content"
      className={`
        fixed top-4 left-4 z-50 bg-[#1a3c86] text-white px-4 py-2 rounded-md
        transform transition-transform duration-200
        ${isFocused ? "translate-y-0" : "-translate-y-20"}
        focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#f8c300] focus:ring-offset-2
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to content
    </a>
  )
}

