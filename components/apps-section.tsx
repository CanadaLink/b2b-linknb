"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, ChevronLeft, ChevronRight, ExternalLink, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toolsData } from "@/data/tools-data"

export default function AppsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleApps, setVisibleApps] = useState<typeof toolsData.tools>([])
  const [isLoading, setIsLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter apps based on search query
  useEffect(() => {
    // Include ALL applications, not just specific categories
    let filtered = [...toolsData.tools]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          (app.description && app.description.toLowerCase().includes(query)) ||
          app.categories.some((cat) => {
            const category = toolsData.categories.find((c) => c.id === cat)
            return category?.name.toLowerCase().includes(query)
          }) ||
          (app.website && app.website.toLowerCase().includes(query)),
      )
    }

    // Sort applications alphabetically for better organization
    filtered.sort((a, b) => a.name.localeCompare(b.name))

    setVisibleApps(filtered)
    setIsLoading(false)

    // Reset scroll position when search changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0
      checkScrollPosition()
    }
  }, [searchQuery])

  // Focus search input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Check if we can scroll left or right
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
  }

  // Handle scroll events
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => checkScrollPosition()
    scrollContainer.addEventListener("scroll", handleScroll)

    // Initial check
    checkScrollPosition()

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [visibleApps])

  // Scroll left/right functions with optimized scrolling distance
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = 96 // 24px width + 3px gap
    const visibleWidth = container.clientWidth
    const scrollAmount = Math.floor(visibleWidth / cardWidth) * cardWidth

    container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
  }

  const scrollRight = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = 96 // 24px width + 3px gap
    const visibleWidth = container.clientWidth
    const scrollAmount = Math.floor(visibleWidth / cardWidth) * cardWidth

    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = toolsData.categories.find((c) => c.id === categoryId)
    return category ? category.name : categoryId
  }

  // Add keyboard navigation for the scrollable container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      scrollLeft()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      scrollRight()
    }
  }

  return (
    <section id="apps" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Business Applications</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Discover the complete catalog of applications we implement and support for New Brunswick businesses.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            aria-hidden="true"
          />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-2 w-full shadow-sm border-gray-200"
            aria-label="Search applications"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Apps Horizontal Scroll */}
        <div
          className="relative"
          role="region"
          aria-label="Scrollable applications list"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Left scroll button */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right scroll button */}
          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable container with optimized rendering */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide py-2 px-2 -mx-2"
            onScroll={checkScrollPosition}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            aria-live="polite"
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-8 min-h-[100px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1a3c86]"></div>
              </div>
            ) : (
              <div className="flex space-x-3 min-w-max">
                {visibleApps.length > 0 ? (
                  visibleApps.map((app) => (
                    <Dialog key={app.id}>
                      <DialogTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center",
                            "hover:shadow-sm transition-all cursor-pointer h-20 w-24 flex-shrink-0",
                          )}
                          whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}
                          role="button"
                          aria-label={`View details for ${app.name}`}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault()
                              // Simulate click on Enter or Space
                              e.currentTarget.click()
                            }
                          }}
                        >
                          <div className="w-8 h-8 mb-2 flex items-center justify-center">
                            <img
                              src={
                                app.logo ||
                                `/placeholder.svg?height=32&width=32&text=${encodeURIComponent(app.name.charAt(0))}`
                              }
                              alt={`${app.name} logo`}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                              width={32}
                              height={32}
                            />
                          </div>
                          <p className="text-xs font-medium text-center line-clamp-2">{app.name}</p>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <div className="w-6 h-6 flex-shrink-0">
                              <img
                                src={
                                  app.logo ||
                                  `/placeholder.svg?height=24&width=24&text=${encodeURIComponent(app.name.charAt(0))}`
                                }
                                alt={`${app.name} logo`}
                                className="max-w-full max-h-full object-contain"
                                width={24}
                                height={24}
                              />
                            </div>
                            {app.name}
                          </DialogTitle>
                          <DialogDescription>
                            {app.description ||
                              `${app.name} is a business application that we implement and support for New Brunswick businesses.`}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-3">
                          <h4 className="text-xs font-medium mb-1">Categories:</h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {app.categories.map((catId) => {
                              const category = toolsData.categories.find((c) => c.id === catId)
                              return category ? (
                                <Badge key={catId} variant="secondary" className="text-xs">
                                  {category.name}
                                </Badge>
                              ) : null
                            })}
                          </div>

                          <div className="mt-3 pt-3 border-t">
                            <h4 className="text-xs font-medium mb-1">Implementation for NB businesses:</h4>
                            <p className="text-xs text-gray-600 mb-3">
                              We provide setup, integration, training, and ongoing support for {app.name}. Our expertise
                              ensures you get the most value from this application.
                            </p>

                            {app.website && (
                              <div className="flex justify-end">
                                <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                                  <a
                                    href={app.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1"
                                  >
                                    Learn More
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  <div className="flex justify-center items-center py-8 w-full min-h-[100px]">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm mb-2">No applications found matching your search.</p>
                      <Button onClick={() => setSearchQuery("")} variant="outline" size="sm" className="text-xs">
                        Clear Search
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Apps count and category filter hint */}
        <div className="mt-4 text-center text-xs text-gray-500">
          {visibleApps.length > 0 && (
            <>
              <span>
                Showing {visibleApps.length} of {toolsData.tools.length} applications
              </span>
              {searchQuery && <span className="ml-1">(filtered by "{searchQuery}")</span>}
            </>
          )}
        </div>

        {/* Search tip */}
        <div className="mt-2 text-center text-xs text-gray-400">
          <p>Tip: Search by name, category, or description to find specific applications</p>
        </div>

        {/* Quick info section */}
        <div className="mt-4 max-w-lg mx-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 mx-auto text-xs">
                  <Info className="h-3 w-3" />
                  <span>About Our Application Services</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                <p>
                  We help New Brunswick businesses implement, integrate, and optimize these applications for their
                  specific needs.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </section>
  )
}

