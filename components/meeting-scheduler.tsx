"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Loader2 } from "lucide-react"
import { useResponsive } from "@/hooks/use-responsive"

export default function MeetingScheduler() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet } = useResponsive()
  const [iframeHeight, setIframeHeight] = useState(700)
  const [hasInteracted, setHasInteracted] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return

      try {
        if (!isMounted.current) return

        if (event.data.event === "calendly:event_scheduled") {
          console.log("Meeting scheduled successfully")
        }

        if (event.data.event === "calendly:interaction") {
          setHasInteracted(true)
        }

        if (event.data.event === "calendly:height" && event.data.data?.height) {
          const newHeight = event.data.data.height + 20
          setIframeHeight(newHeight)
        }
      } catch (error) {
        console.error("Error processing calendar message:", error)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const handleIframeLoad = () => {
    if (isMounted.current) {
      setIsLoading(false)
    }
  }

  const handleIframeError = () => {
    if (isMounted.current) {
      if (retryCount < 3) {
        setRetryCount((prev) => prev + 1)

        setTimeout(() => {
          if (iframeRef.current) {
            const src = iframeRef.current.src
            iframeRef.current.src = ""
            setTimeout(() => {
              if (iframeRef.current && isMounted.current) {
                iframeRef.current.src = src
              }
            }, 100)
          }
        }, 1000)
      } else {
        setHasError(true)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (hasInteracted) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        const message = "You have unsaved changes. Are you sure you want to leave?"
        e.preventDefault()
        e.returnValue = message
        return message
      }

      window.addEventListener("beforeunload", handleBeforeUnload)

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }
  }, [hasInteracted])

  const calendlyDirectUrl = "https://calendly.com/linknb/consultation"

  // Determine optimal iframe height based on device
  const getOptimalHeight = useCallback(() => {
    if (isMobile) return Math.min(iframeHeight * 0.8, 600)
    if (isTablet) return Math.min(iframeHeight * 0.85, 700)
    return Math.min(iframeHeight * 0.9, 800)
  }, [isMobile, isTablet, iframeHeight])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setIsLoading(false)
      setHasError(false)

      // Set optimal height after loading
      iframe.style.height = `${getOptimalHeight()}px`

      // Prevent page refresh when user is interacting with the form
      const preventUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }

      window.addEventListener("beforeunload", preventUnload)

      // Remove event after 30 seconds (assuming user has started filling the form)
      const timeout = setTimeout(() => {
        window.removeEventListener("beforeunload", preventUnload)
      }, 30000)

      return () => {
        window.removeEventListener("beforeunload", preventUnload)
        clearTimeout(timeout)
      }
    }

    const handleError = () => {
      setHasError(true)
      setIsLoading(false)

      // Retry loading after a delay, up to 3 times
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1)
          setIsLoading(true)
          setHasError(false)

          // Reload the iframe
          if (iframe.src) {
            const currentSrc = iframe.src
            iframe.src = ""
            setTimeout(() => {
              iframe.src = currentSrc
            }, 100)
          }
        }, 2000)
      }
    }

    iframe.addEventListener("load", handleLoad)
    iframe.addEventListener("error", handleError)

    // Set initial height
    iframe.style.height = `${getOptimalHeight()}px`

    return () => {
      iframe.removeEventListener("load", handleLoad)
      iframe.removeEventListener("error", handleError)
    }
  }, [retryCount, getOptimalHeight])

  return (
    <div ref={containerRef} className="relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <Loader2 className="h-8 w-8 text-[#1a3c86] animate-spin" />
          <span className="sr-only">Loading meeting scheduler...</span>
        </div>
      )}

      {hasError ? (
        <div className="p-8 text-center">
          <h3 className="text-lg font-medium mb-2">Unable to load the scheduling tool</h3>
          <p className="text-gray-600 mb-4">Please try again or schedule directly through our calendar page.</p>
          <a
            href={calendlyDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#1a3c86] text-white rounded-md hover:bg-[#15306d] transition-colors"
          >
            Schedule a Meeting
          </a>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src="https://calendly.com/linknb/consultation?embed_domain=b2b.linknb.ca&embed_type=inline&hide_gdpr_banner=1"
          className="w-full border-0 transition-all duration-300"
          style={{
            height: getOptimalHeight(),
            minHeight: isMobile ? "500px" : "600px",
            maxHeight: "90vh",
            opacity: isLoading ? 0 : 1,
          }}
          frameBorder="0"
          title="Schedule a consultation with LinkNB Business Solutions"
          data-testid="meeting-scheduler-iframe"
          loading="lazy"
          allow="camera; microphone; autoplay; encrypted-media; fullscreen;"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
    </div>
  )
}

