"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
  lowQualitySrc?: string
  aspectRatio?: number
  containerClassName?: string
  alt: string // Make alt required for accessibility
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg?height=400&width=600",
  lowQualitySrc,
  aspectRatio,
  containerClassName,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src)

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true)
    setError(false)
    setCurrentSrc(lowQualitySrc || src)
  }, [src, lowQualitySrc])

  const handleLoad = () => {
    setIsLoading(false)
    if (lowQualitySrc && currentSrc === lowQualitySrc) {
      setCurrentSrc(src)
    }
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
    setCurrentSrc(fallbackSrc)
  }

  // Calculate padding based on aspect ratio if provided
  const paddingStyle = aspectRatio ? { paddingBottom: `${(1 / aspectRatio) * 100}%` } : undefined

  return (
    <div className={cn("relative overflow-hidden", aspectRatio && "w-full", containerClassName)} style={paddingStyle}>
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
        onLoadingComplete={handleLoad}
        onError={handleError}
        {...props}
      />

      {isLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
    </div>
  )
}

