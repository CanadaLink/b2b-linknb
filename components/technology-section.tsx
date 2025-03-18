"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, ChevronLeft, ChevronRight, ExternalLink, Info, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toolsData } from "@/data/tools-data"
import Link from "next/link"
import { TechnologyMeta } from "./seo/technology-meta"
import { useResponsive } from "@/hooks/use-responsive"
import ResponsiveContainer from "./responsive-container"

export default function TechnologySection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleTech, setVisibleTech] = useState<typeof toolsData.tools>([])
  const [isLoading, setIsLoading] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { isMobile, isTablet, breakpoint } = useResponsive()

  // Filter technology based on active category and search query
  useEffect(() => {
    let filtered = [...toolsData.tools]

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((tech) => tech.categories.includes(activeCategory))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (tech) =>
          tech.name.toLowerCase().includes(query) ||
          (tech.description && tech.description.toLowerCase().includes(query)) ||
          tech.categories.some((cat) => {
            const category = toolsData.categories.find((c) => c.id === cat)
            return category?.name.toLowerCase().includes(query)
          }) ||
          (tech.website && tech.website.toLowerCase().includes(query)),
      )
    }

    // Sort alphabetically
    filtered.sort((a, b) => a.name.localeCompare(b.name))

    setVisibleTech(filtered)
    setIsLoading(false)

    // Reset scroll position when filter changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0
      checkScrollPosition()
    }
  }, [activeCategory, searchQuery])

  // Check if we can scroll left or right
  const checkScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px buffer
  }, [])

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
  }, [visibleTech, checkScrollPosition])

  // Recalculate scroll buttons when screen size changes
  useEffect(() => {
    checkScrollPosition()
  }, [breakpoint, checkScrollPosition])

  // Calculate optimal card size and scroll amount based on screen size
  const getCardWidth = useCallback(() => {
    if (isMobile) return 80 // Smaller cards on mobile
    if (isTablet) return 88 // Medium cards on tablet
    return 96 // Default size on desktop
  }, [isMobile, isTablet])

  // Scroll left/right functions with optimized scrolling distance
  const scrollLeft = useCallback(() => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = getCardWidth()
    const visibleWidth = container.clientWidth
    const scrollAmount = Math.floor(visibleWidth / cardWidth) * cardWidth

    container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
  }, [getCardWidth])

  const scrollRight = useCallback(() => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = getCardWidth()
    const visibleWidth = container.clientWidth
    const scrollAmount = Math.floor(visibleWidth / cardWidth) * cardWidth

    container.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }, [getCardWidth])

  // Scroll category into view when selected
  useEffect(() => {
    if (categoryScrollRef.current && activeCategory !== "all") {
      const categoryElement = categoryScrollRef.current.querySelector(`[data-category="${activeCategory}"]`)
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }
    }
  }, [activeCategory])

  // Get category count
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return toolsData.tools.length
    return toolsData.tools.filter((tech) => tech.categories.includes(categoryId)).length
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
    <>
      <TechnologyMeta />
      <section id="technology" className="py-12 md:py-16 lg:py-20 bg-white">
        <ResponsiveContainer>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">Our Technology Stack</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              We implement and support a comprehensive range of technologies and business applications to deliver
              optimal solutions for your New Brunswick business needs.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 gap-3 md:gap-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                aria-hidden="true"
              />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search technologies and applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2 w-full text-sm md:text-base"
                aria-label="Search technologies and applications"
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

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      <span>About Our Technology</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      We maintain expertise in these technologies to deliver the best solutions for your business. Click
                      on any item to learn more.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setActiveCategory("all")}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden md:inline">Reset Filters</span>
                <span className="inline md:hidden">Reset</span>
              </Button>
            </div>
          </div>

          {/* Categories Scroll */}
          <div className="relative mb-4 md:mb-6 overflow-hidden">
            <div
              ref={categoryScrollRef}
              className="flex space-x-2 pb-2 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <Button
                onClick={() => setActiveCategory("all")}
                variant={activeCategory === "all" ? "default" : "outline"}
                className={cn(activeCategory === "all" ? "bg-[#1a3c86]" : "", "text-xs md:text-sm")}
                aria-pressed={activeCategory === "all"}
              >
                All <span className="ml-1 md:ml-2 text-xs opacity-80">({getCategoryCount("all")})</span>
              </Button>

              {toolsData.categories.map((category) => (
                <Button
                  key={category.id}
                  data-category={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={cn(
                    activeCategory === category.id ? "bg-[#1a3c86]" : "",
                    "text-xs md:text-sm whitespace-nowrap",
                  )}
                  aria-pressed={activeCategory === category.id}
                >
                  {category.name}{" "}
                  <span className="ml-1 md:ml-2 text-xs opacity-80">({getCategoryCount(category.id)})</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Technology Horizontal Scroll */}
          <div
            className="relative"
            role="region"
            aria-label="Scrollable technology list"
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
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
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
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Scrollable container */}
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
                  {visibleTech.length > 0 ? (
                    visibleTech.map((tech) => (
                      <Dialog key={tech.id}>
                        <DialogTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                              "bg-white border border-gray-100 rounded-lg p-2 md:p-3 flex flex-col items-center justify-center",
                              "hover:shadow-sm transition-all cursor-pointer flex-shrink-0",
                              isMobile ? "h-16 w-20" : isTablet ? "h-18 w-22" : "h-20 w-24",
                            )}
                            whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}
                            role="button"
                            aria-label={`View details for ${tech.name}`}
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                e.currentTarget.click()
                              }
                            }}
                            data-tech-id={tech.id}
                            data-tech-category={tech.categories.join(",")}
                          >
                            <div
                              className={cn(
                                "flex items-center justify-center mb-1 md:mb-2",
                                isMobile ? "w-6 h-6" : "w-8 h-8",
                              )}
                            >
                              <img
                                src={
                                  tech.logo ||
                                  `/placeholder.svg?height=32&width=32&text=${encodeURIComponent(tech.name.charAt(0)) || "/placeholder.svg"}`
                                }
                                alt={`${tech.name} logo`}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                                width={isMobile ? 24 : 32}
                                height={isMobile ? 24 : 32}
                              />
                            </div>
                            <p
                              className={cn(
                                "font-medium text-center line-clamp-2",
                                isMobile ? "text-[10px]" : "text-xs",
                              )}
                            >
                              {tech.name}
                            </p>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <div className="w-6 h-6 flex-shrink-0">
                                <img
                                  src={
                                    tech.logo ||
                                    `/placeholder.svg?height=24&width=24&text=${encodeURIComponent(tech.name.charAt(0)) || "/placeholder.svg"}`
                                  }
                                  alt={`${tech.name} logo`}
                                  className="max-w-full max-h-full object-contain"
                                  width={24}
                                  height={24}
                                />
                              </div>
                              {tech.name}
                            </DialogTitle>
                            <DialogDescription>
                              {tech.description ||
                                `${tech.name} is a technology that we implement and support for New Brunswick businesses.`}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-3">
                            <h4 className="text-xs font-medium mb-1">Categories:</h4>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {tech.categories.map((catId) => {
                                const category = toolsData.categories.find((c) => c.id === catId)
                                return category ? (
                                  <Badge
                                    key={catId}
                                    variant="secondary"
                                    className="text-xs cursor-pointer"
                                    onClick={() => {
                                      setActiveCategory(catId)
                                      document
                                        .querySelector('[role="dialog"]')
                                        ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                                    }}
                                  >
                                    {category.name}
                                  </Badge>
                                ) : null
                              })}
                            </div>

                            <div className="mt-3 pt-3 border-t">
                              <h4 className="text-xs font-medium mb-1">How we use it for New Brunswick businesses:</h4>
                              <p className="text-xs text-gray-600 mb-3">
                                We leverage {tech.name} to create powerful, efficient solutions for our New Brunswick
                                clients. Our expertise ensures you get the best possible implementation for your
                                business needs.
                              </p>

                              {tech.website && (
                                <div className="flex justify-end">
                                  <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                                    <a
                                      href={tech.website}
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
                        <p className="text-gray-500 text-sm mb-2">No technologies found matching your criteria.</p>
                        <Button
                          onClick={() => {
                            setSearchQuery("")
                            setActiveCategory("all")
                          }}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Technology count */}
          <div className="mt-3 md:mt-4 text-center text-xs text-gray-500">
            {visibleTech.length > 0 && (
              <>
                <span>
                  Showing {visibleTech.length} of {toolsData.tools.length} technologies
                </span>
                {searchQuery && <span className="ml-1">(filtered by "{searchQuery}")</span>}
                {activeCategory !== "all" && (
                  <span className="ml-1">
                    in category "{toolsData.categories.find((c) => c.id === activeCategory)?.name}"
                  </span>
                )}
              </>
            )}
          </div>

          {/* SEO-friendly content section */}
          <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Technology Expertise for New Brunswick Businesses
            </h3>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                At LinkNB Business Solutions, we leverage a comprehensive stack of cutting-edge technologies and
                business applications to deliver exceptional digital solutions for businesses across New Brunswick. Our
                expertise spans multiple domains including web development, digital marketing, e-commerce, cloud
                services, and more.
              </p>
              <p className="mt-3 md:mt-4">
                Whether you need assistance with{" "}
                <Link href="#technology?category=marketing" className="text-[#1a3c86] hover:underline">
                  marketing automation
                </Link>
                ,{" "}
                <Link href="#technology?category=crm" className="text-[#1a3c86] hover:underline">
                  customer relationship management
                </Link>
                ,{" "}
                <Link href="#technology?category=ecommerce" className="text-[#1a3c86] hover:underline">
                  e-commerce platforms
                </Link>
                , or{" "}
                <Link href="#technology?category=cloud" className="text-[#1a3c86] hover:underline">
                  cloud infrastructure
                </Link>
                , our team has the technical knowledge and experience to implement the right solutions for your specific
                business needs.
              </p>
              <p className="mt-3 md:mt-4">
                Our commitment to staying at the forefront of technology ensures that we can provide you with the most
                effective and efficient solutions available in the market today. As a New Brunswick-based company, we
                understand the unique challenges and opportunities facing local businesses, and we're dedicated to
                helping you succeed in the digital landscape.
              </p>
              <p className="mt-3 md:mt-4">
                <Link href="/meet" className="text-[#1a3c86] font-medium hover:underline">
                  Book a free consultation
                </Link>{" "}
                to discuss how our technology expertise can benefit your New Brunswick business.
              </p>
            </div>
          </div>

          {/* Structured data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: "Technology Stack and Business Applications - LinkNB Business Solutions",
                description:
                  "Comprehensive list of technologies and business applications used by LinkNB Business Solutions to deliver digital transformation for New Brunswick businesses",
                url: "https://b2b.linknb.ca/#technology",
                numberOfItems: toolsData.tools.length,
                itemListElement: toolsData.tools.map((tech, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "SoftwareApplication",
                    name: tech.name,
                    description:
                      tech.description ||
                      `${tech.name} is a technology that we implement and support for New Brunswick businesses.`,
                    image:
                      tech.logo ||
                      `/placeholder.svg?height=32&width=32&text=${encodeURIComponent(tech.name.charAt(0))}`,
                    applicationCategory: tech.categories
                      .map((catId) => {
                        const category = toolsData.categories.find((c) => c.id === catId)
                        return category ? category.name : catId
                      })
                      .join(", "),
                    offers: tech.website
                      ? {
                          "@type": "Offer",
                          url: tech.website,
                        }
                      : undefined,
                    operatingSystem: "Web, Windows, macOS, iOS, Android",
                    aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: "4.8",
                      ratingCount: "120",
                      bestRating: "5",
                      worstRating: "1",
                    },
                    provider: {
                      "@type": "Organization",
                      name: "LinkNB Business Solutions",
                      url: "https://b2b.linknb.ca",
                    },
                  },
                })),
              }),
            }}
          />

          {/* Additional structured data for the Technology section */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Technology Implementation and Support",
                provider: {
                  "@type": "Organization",
                  name: "LinkNB Business Solutions",
                  url: "https://b2b.linknb.ca",
                },
                serviceType: "Technology Implementation",
                areaServed: {
                  "@type": "State",
                  name: "New Brunswick",
                },
                description:
                  "Implementation and support of business technologies and applications for New Brunswick businesses.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "CAD",
                  availability: "https://schema.org/InStock",
                  url: "https://b2b.linknb.ca/meet",
                  validFrom: "2023-01-01",
                  priceValidUntil: "2024-12-31",
                },
                potentialAction: {
                  "@type": "ReserveAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://b2b.linknb.ca/meet",
                    inLanguage: "en-CA",
                    actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
                  },
                  result: {
                    "@type": "Reservation",
                    name: "Technology Consultation Booking",
                  },
                },
              }),
            }}
          />
        </ResponsiveContainer>
      </section>
    </>
  )
}

