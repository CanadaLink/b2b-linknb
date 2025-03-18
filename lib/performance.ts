"use client"

// Performance utilities for optimizing component rendering and loading
import { useEffect, useState } from "react"

/**
 * Custom hook for lazy loading components or data when they enter the viewport
 * @param threshold Percentage of element that needs to be visible to trigger callback
 * @returns Object containing ref to attach to element and boolean indicating if element is in view
 */
export function useIntersectionObserver(threshold = 0.1) {
  const [ref, setRef] = useState<Element | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold])

  return { ref: setRef, isInView }
}

/**
 * Debounce function to limit how often a function is called
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

/**
 * Formats a number as a file size (KB, MB, etc.)
 * @param bytes Number of bytes
 * @returns Formatted string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

