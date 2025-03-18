"use client"

import { useEffect, useState, useRef } from "react"
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react"
import { useDeviceType } from "@/hooks/use-device-type"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/error-boundary"

export function MeetingEmbed() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const { deviceType } = useDeviceType()
  const maxRetries = 3

  const loadMeetingEmbed = () => {
    // Only proceed if the container exists
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ""

    // Set loading state
    setIsLoading(true)
    setLoadError(false)

    // Create the meetings-iframe-container div
    const meetingsContainer = document.createElement("div")
    meetingsContainer.className = "meetings-iframe-container"

    // Try HTTPS first, with fallback to HTTP if needed
    meetingsContainer.setAttribute("data-src", "https://content.linknb.ca/meetings/b2b/nblink?embed=true")

    // Set minimum height based on device
    meetingsContainer.style.minHeight = getMinHeight()

    // Append to our container
    containerRef.current.appendChild(meetingsContainer)

    // Remove any existing script
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current)
    }

    // Create and add the script tag
    const script = document.createElement("script")
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
    script.type = "text/javascript"
    script.async = true
    scriptRef.current = script

    // Handle script loading
    script.onload = () => {
      console.log("HubSpot Meetings script loaded successfully")
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    script.onerror = (e) => {
      console.error("Error loading HubSpot Meetings script:", e)

      if (retryCount < maxRetries) {
        console.log(`Retrying script load (${retryCount + 1}/${maxRetries})...`)
        setRetryCount((prev) => prev + 1)
        // Retry after a short delay
        setTimeout(loadMeetingEmbed, 2000)
      } else {
        setLoadError(true)
        setIsLoading(false)
      }
    }

    // Add script to document body to ensure it loads properly
    document.body.appendChild(script)

    // Set a timeout for slow loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn("Meeting embed loading timeout exceeded")

        if (retryCount < maxRetries) {
          console.log(`Retrying after timeout (${retryCount + 1}/${maxRetries})...`)
          setRetryCount((prev) => prev + 1)
          loadMeetingEmbed()
        } else {
          setLoadError(true)
          setIsLoading(false)
        }
      }
    }, 10000)

    return () => {
      clearTimeout(timeoutId)
    }
  }

  useEffect(() => {
    loadMeetingEmbed()

    // Cleanup function
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
      }
    }
  }, [deviceType]) // Re-run when device type changes

  // Handle manual retry
  const handleRetry = () => {
    setRetryCount(0)
    loadMeetingEmbed()
  }

  // Determine appropriate height based on device type
  const getMinHeight = () => {
    switch (deviceType) {
      case "mobile":
        return "750px"
      case "tablet":
        return "700px"
      case "desktop":
        return "650px"
      default:
        return "700px"
    }
  }

  return (
    <ErrorBoundary>
      <div className="w-full relative" aria-live="polite" style={{ isolation: "isolate" }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-10">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <Loader2 className="h-8 w-8 animate-spin text-[#1a3c86] mx-auto mb-4" />
              <p className="text-gray-700 font-medium">Loading meeting scheduler...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          </div>
        )}

        {loadError && (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="text-[#D32927] mb-4">
              <AlertTriangle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2">Unable to load scheduler</h3>
            <p className="text-gray-600 mb-4">We're having trouble loading the meeting scheduler.</p>
            <p className="text-gray-600 mb-6">
              Please try refreshing the page or contact us directly at{" "}
              <a href="mailto:info@linknb.ca" className="text-[#1a3c86] hover:underline">
                info@linknb.ca
              </a>
            </p>
            <Button
              onClick={handleRetry}
              className="px-4 py-2 bg-[#1a3c86] text-white rounded-md hover:bg-[#1a3c86]/90 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}

        <div
          ref={containerRef}
          className="w-full"
          style={{ minHeight: getMinHeight() }}
          aria-hidden={isLoading || loadError}
        ></div>

        <style jsx>{`
          .meetings-iframe-container {
            width: 100%;
            height: 100%;
            transition: all 0.3s ease;
          }
          @media (max-width: 640px) {
            .meetings-iframe-container {
              overflow-y: scroll;
              -webkit-overflow-scrolling: touch;
            }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  )
}

