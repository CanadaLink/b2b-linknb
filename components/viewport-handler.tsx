"use client"

import { useEffect } from "react"

export default function ViewportHandler() {
  useEffect(() => {
    // Fix for iOS Safari viewport height issues
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Initial set
    setVh()

    // Update on resize and orientation change
    window.addEventListener("resize", setVh)
    window.addEventListener("orientationchange", setVh)

    // Fix for iOS Safari 100vh issue
    const metaViewport = document.querySelector("meta[name=viewport]")
    if (metaViewport) {
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      )
    }

    // Prevent unwanted zooming on input focus in iOS
    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
        document.documentElement.style.setProperty("--webkit-text-size-adjust", "none")
      }
    }

    const handleBlur = () => {
      document.documentElement.style.setProperty("--webkit-text-size-adjust", "100%")
    }

    document.addEventListener("focusin", handleFocus)
    document.addEventListener("focusout", handleBlur)

    return () => {
      window.removeEventListener("resize", setVh)
      window.removeEventListener("orientationchange", setVh)
      document.removeEventListener("focusin", handleFocus)
      document.removeEventListener("focusout", handleBlur)
    }
  }, [])

  return null
}

