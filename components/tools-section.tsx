"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Search, X, ExternalLink, Info, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toolsData } from "@/data/tools-data"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ToolsMeta } from "./seo/tools-meta"

export default function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleTools, setVisibleTools] = useState<typeof toolsData.tools>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [selectedTool, setSelectedTool] = useState<(typeof toolsData.tools)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Filter tools based on active category and search query
  useEffect(() => {
    let filtered = toolsData.tools.filter((tool) => !!tool.logo) // Only show tools with logos

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((tool) => tool.categories.includes(activeCategory))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.categories.some((cat) => {
            const category = toolsData.categories.find((c) => c.id === cat)
            return category?.name.toLowerCase().includes(query)
          }),
      )
    }

    setVisibleTools(filtered)
    setIsLoading(false)
  }, [activeCategory, searchQuery])

  // Calculate max scroll width
  useEffect(() => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current
      setMaxScroll(scrollWidth - clientWidth)
    }
  }, [visibleTools])

  // Handle category scroll
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })

      // Update scroll position after scrolling
      setTimeout(() => {
        if (containerRef.current) {
          setScrollPosition(containerRef.current.scrollLeft)
        }
      }, 300)
    }
  }

  // Update scroll position when scrolling manually
  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = toolsData.categories.find((c) => c.id === categoryId)
    return category ? category.name : categoryId
  }

  // Get category count
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return toolsData.tools.filter((tool) => !!tool.logo).length
    return toolsData.tools.filter((tool) => !!tool.logo && tool.categories.includes(categoryId)).length
  }

  return (
    <>
      <ToolsMeta />
      <section id="tools" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in a wide range of tools and technologies to deliver optimal solutions for your New
              Brunswick business needs.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                aria-hidden="true"
              />
              <Input
                type="text"
                placeholder="Search tools and technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                aria-label="Search tools and technologies"
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
                      <span>About Our Tools</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      We maintain expertise in these tools to deliver the best solutions for your business. Click on any
                      tool to learn more.
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
          <div className="relative mb-8">
            <div
              className="overflow-x-auto scrollbar-hide"
              ref={containerRef}
              onScroll={handleScroll}
              aria-label="Tool categories"
            >
              <div className="flex space-x-2 pb-2 min-w-max">
                <Button
                  onClick={() => setActiveCategory("all")}
                  variant={activeCategory === "all" ? "default" : "outline"}
                  className={activeCategory === "all" ? "bg-[#1a3c86]" : ""}
                  aria-pressed={activeCategory === "all"}
                >
                  All Tools <span className="ml-2 text-xs opacity-80">({getCategoryCount("all")})</span>
                </Button>

                {toolsData.categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={activeCategory === category.id ? "bg-[#1a3c86]" : ""}
                    aria-pressed={activeCategory === category.id}
                  >
                    {category.name} <span className="ml-2 text-xs opacity-80">({getCategoryCount(category.id)})</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Scroll buttons */}
            {scrollPosition > 0 && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full h-8 w-8 -ml-4 z-10"
                onClick={() => scroll("left")}
                aria-label="Scroll categories left"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}

            {scrollPosition < maxScroll && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full h-8 w-8 -mr-4 z-10"
                onClick={() => scroll("right")}
                aria-label="Scroll categories right"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>

          {/* Tools Grid */}
          <div className="relative">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a3c86]"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                >
                  {visibleTools.map((tool) => (
                    <Dialog key={tool.id}>
                      <DialogTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "bg-white border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center",
                            "hover:shadow-md transition-all cursor-pointer h-32",
                          )}
                          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                          role="button"
                          aria-label={`View details for ${tool.name}`}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setSelectedTool(tool)
                            }
                          }}
                        >
                          <div className="w-12 h-12 mb-3 flex items-center justify-center">
                            <img
                              src={
                                tool.logo || `/placeholder.svg?height=48&width=48&text=${encodeURIComponent(tool.name)}`
                              }
                              alt={`${tool.name} logo - Technology used by LinkNB Business Solutions`}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                              width={48}
                              height={48}
                            />
                          </div>
                          <p className="text-sm font-medium text-center line-clamp-2">{tool.name}</p>
                          <div className="mt-2 flex flex-wrap justify-center gap-1">
                            {tool.categories.slice(0, 1).map((catId) => {
                              const category = toolsData.categories.find((c) => c.id === catId)
                              return category ? (
                                <Badge
                                  key={catId}
                                  variant="outline"
                                  className="text-xs px-1.5 py-0.5"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveCategory(catId)
                                  }}
                                >
                                  {category.name}
                                </Badge>
                              ) : null
                            })}
                            {tool.categories.length > 1 && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                +{tool.categories.length - 1}
                              </Badge>
                            )}
                          </div>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 flex-shrink-0">
                              <img
                                src={
                                  tool.logo ||
                                  `/placeholder.svg?height=32&width=32&text=${encodeURIComponent(tool.name)}`
                                }
                                alt={`${tool.name} logo`}
                                className="max-w-full max-h-full object-contain"
                                width={32}
                                height={32}
                              />
                            </div>
                            {tool.name}
                          </DialogTitle>
                          <DialogDescription>{tool.description}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Categories:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tool.categories.map((catId) => {
                              const category = toolsData.categories.find((c) => c.id === catId)
                              return category ? (
                                <Badge
                                  key={catId}
                                  variant="secondary"
                                  className="cursor-pointer"
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

                          <div className="mt-4 pt-4 border-t">
                            <h4 className="text-sm font-medium mb-2">How we use it for New Brunswick businesses:</h4>
                            <p className="text-sm text-gray-600 mb-4">
                              We leverage {tool.name} to create powerful, efficient solutions for our New Brunswick
                              clients. Our expertise with this technology ensures you get the best possible
                              implementation for your business needs.
                            </p>

                            {tool.website && (
                              <div className="flex justify-end">
                                <Button asChild variant="outline" size="sm">
                                  <a
                                    href={tool.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    Learn More
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* No results message */}
            {!isLoading && visibleTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No tools found matching your search criteria.</p>
                <Button
                  onClick={() => {
                    setActiveCategory("all")
                    setSearchQuery("")
                  }}
                  className="bg-[#1a3c86]"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

          {/* Tools count */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {visibleTools.length} of {toolsData.tools.filter((tool) => !!tool.logo).length} tools and
            technologies
          </div>

          {/* SEO-friendly content section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold mb-4">Technology Expertise for New Brunswick Businesses</h3>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                At LinkNB Business Solutions, we leverage a comprehensive stack of cutting-edge tools and technologies
                to deliver exceptional digital solutions for businesses across New Brunswick. Our expertise spans
                multiple domains including web development, digital marketing, e-commerce, cloud services, and more.
              </p>
              <p className="mt-4">
                Whether you need assistance with{" "}
                <Link href="#tools?category=marketing" className="text-[#1a3c86] hover:underline">
                  marketing automation
                </Link>
                ,{" "}
                <Link href="#tools?category=crm" className="text-[#1a3c86] hover:underline">
                  customer relationship management
                </Link>
                ,{" "}
                <Link href="#tools?category=ecommerce" className="text-[#1a3c86] hover:underline">
                  e-commerce platforms
                </Link>
                , or{" "}
                <Link href="#tools?category=cloud" className="text-[#1a3c86] hover:underline">
                  cloud infrastructure
                </Link>
                , our team has the technical knowledge and experience to implement the right solutions for your specific
                business needs.
              </p>
              <p className="mt-4">
                Our commitment to staying at the forefront of technology ensures that we can provide you with the most
                effective and efficient solutions available in the market today. As a New Brunswick-based company, we
                understand the unique challenges and opportunities facing local businesses, and we're dedicated to
                helping you succeed in the digital landscape.
              </p>
              <p className="mt-4">
                <Link href="/meet" className="text-[#1a3c86] font-medium hover:underline">
                  Book a free consultation
                </Link>{" "}
                to discuss how our technology expertise can benefit your New Brunswick business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Technology Stack and Tools - LinkNB Business Solutions",
            description:
              "Comprehensive list of tools and technologies used by LinkNB Business Solutions to deliver digital transformation for New Brunswick businesses",
            url: "https://b2b.linknb.ca/#tools",
            numberOfItems: toolsData.tools.filter((tool) => !!tool.logo).length,
            itemListElement: toolsData.tools
              .filter((tool) => !!tool.logo)
              .map((tool, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "SoftwareApplication",
                  name: tool.name,
                  description: tool.description,
                  image: tool.logo || `/placeholder.svg?height=48&width=48&text=${encodeURIComponent(tool.name)}`,
                  applicationCategory: tool.categories
                    .map((catId) => {
                      const category = toolsData.categories.find((c) => c.id === catId)
                      return category ? category.name : catId
                    })
                    .join(", "),
                  offers: tool.website
                    ? {
                        "@type": "Offer",
                        url: tool.website,
                      }
                    : undefined,
                },
              })),
          }),
        }}
      />
    </>
  )
}

