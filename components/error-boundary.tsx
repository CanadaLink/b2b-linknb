"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Create the component function
function ErrorBoundaryComponent({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Error caught by error boundary:", event.error)
      setHasError(true)

      // Prevent the error from propagating
      event.preventDefault()
    }

    // Add error event listener
    window.addEventListener("error", errorHandler)

    // Clean up
    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    if (fallback) return <>{fallback}</>

    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-[300px]">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4 max-w-md">
          We're sorry, but there was an error loading this content. Please try refreshing the page.
        </p>
        <Button
          onClick={() => {
            setHasError(false)
            window.location.reload()
          }}
        >
          Refresh Page
        </Button>
      </div>
    )
  }

  return <>{children}</>
}

// Export as both default and named export
export default ErrorBoundaryComponent
export { ErrorBoundaryComponent as ErrorBoundary }

