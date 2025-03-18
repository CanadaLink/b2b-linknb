"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion"
import {
  BarChart3,
  Users,
  LineChart,
  ShieldCheck,
  Headphones,
  Rocket,
  Database,
  Layers,
  Code,
  Zap,
  PieChart,
  Megaphone,
  ArrowRight,
  CheckCircle,
  ChevronRight,
} from "lucide-react"

// Define our service categories and services
const categories = [
  { id: "all", name: "All Services", icon: <Layers className="h-4 w-4" /> },
  { id: "marketing", name: "Marketing", icon: <Megaphone className="h-4 w-4" /> },
  { id: "analytics", name: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "customer-success", name: "Customer Success", icon: <Users className="h-4 w-4" /> },
  { id: "development", name: "Development", icon: <Code className="h-4 w-4" /> },
  { id: "security", name: "Security", icon: <ShieldCheck className="h-4 w-4" /> },
]

const services = [
  {
    id: 1,
    title: "Market Research & Analysis",
    description: "Comprehensive market research to identify opportunities and threats in your industry.",
    icon: <BarChart3 className="h-10 w-10" />,
    categories: ["marketing", "analytics"],
    benefits: ["Identify market gaps", "Competitor analysis", "Consumer insights"],
  },
  {
    id: 2,
    title: "Customer Segmentation",
    description: "Identify and target your most valuable customer segments for maximum ROI.",
    icon: <Users className="h-10 w-10" />,
    categories: ["marketing", "analytics"],
    benefits: ["Targeted messaging", "Improved conversion rates", "Optimized ad spend"],
  },
  {
    id: 3,
    title: "Performance Analytics",
    description: "Track and analyze key performance indicators to optimize your business strategy.",
    icon: <LineChart className="h-10 w-10" />,
    categories: ["analytics"],
    benefits: ["Real-time dashboards", "Custom reporting", "Actionable insights"],
  },
  {
    id: 4,
    title: "Security Audits",
    description: "Comprehensive security assessments to identify and address vulnerabilities.",
    icon: <ShieldCheck className="h-10 w-10" />,
    categories: ["security"],
    benefits: ["Vulnerability detection", "Compliance verification", "Risk mitigation"],
  },
  {
    id: 5,
    title: "24/7 Customer Support",
    description: "Round-the-clock support for your customers, ensuring satisfaction and loyalty.",
    icon: <Headphones className="h-10 w-10" />,
    categories: ["customer-success"],
    benefits: ["Rapid response times", "Multi-channel support", "Customer satisfaction"],
  },
  {
    id: 6,
    title: "Product Launch Strategy",
    description: "Strategic planning and execution for successful product launches.",
    icon: <Rocket className="h-10 w-10" />,
    categories: ["marketing"],
    benefits: ["Go-to-market planning", "Launch execution", "Post-launch analysis"],
  },
  {
    id: 7,
    title: "Data Management",
    description: "Efficient data storage, processing, and retrieval solutions for your business.",
    icon: <Database className="h-10 w-10" />,
    categories: ["development", "security"],
    benefits: ["Scalable architecture", "Data security", "Performance optimization"],
  },
  {
    id: 8,
    title: "Enterprise Solutions",
    description: "Customized enterprise-level solutions to streamline your operations.",
    icon: <Layers className="h-10 w-10" />,
    categories: ["development"],
    benefits: ["Process automation", "System integration", "Workflow optimization"],
  },
]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function B2BSolutionsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [isGridView, setIsGridView] = useState(true)

  // Filter services based on active category
  const filteredServices =
    activeCategory === "all" ? services : services.filter((service) => service.categories.includes(activeCategory))

  // Refs for scroll animations
  const heroRef = useRef(null)
  const categoryRef = useRef(null)
  const servicesRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const categoryInView = useInView(categoryRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: false, amount: 0.1 })

  const heroControls = useAnimation()
  const categoryControls = useAnimation()
  const servicesControls = useAnimation()

  useEffect(() => {
    if (heroInView) heroControls.start("visible")
    if (categoryInView) categoryControls.start("visible")
    if (servicesInView) servicesControls.start("visible")
  }, [heroInView, categoryInView, servicesInView, heroControls, categoryControls, servicesControls])

  // Handle service selection
  const handleServiceClick = (id: number) => {
    if (selectedService === id) {
      setSelectedService(null)
    } else {
      setSelectedService(id)
    }
  }

  // Get category color
  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case "marketing":
        return "#D32927"
      case "analytics":
        return "#F4C600"
      case "development":
        return "#1A3C86"
      case "security":
        return "#000000"
      case "customer-success":
        return "#D32927"
      default:
        return "#6B7280"
    }
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-[#000000] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#000000] opacity-90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroControls}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-4 px-4 py-1 rounded-full bg-[#D32927]/20 text-[#D32927] font-medium text-sm"
            >
              Enterprise Solutions
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transformative B2B <span className="text-[#D32927]">Solutions</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl opacity-90 mb-10 leading-relaxed">
              Tailored services designed to drive growth, efficiency, and innovation for your organization.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <button className="group px-8 py-3 bg-[#D32927] text-white font-medium rounded-md hover:bg-[#D32927]/90 transition-all shadow-lg hover:shadow-xl flex items-center">
                Explore Solutions
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.span>
              </button>

              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-all">
                Schedule Consultation
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section
        ref={categoryRef}
        className="py-12 bg-white border-b border-gray-100 sticky top-16 z-20 backdrop-blur-lg bg-white/90"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={categoryControls}
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-between w-full max-w-4xl mb-8">
              <h2 className="text-2xl font-bold">Our Services</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 rounded-md ${isGridView ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  aria-label="Grid view"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1" fill={isGridView ? "#000000" : "#D1D5DB"} />
                    <rect x="14" y="3" width="7" height="7" rx="1" fill={isGridView ? "#000000" : "#D1D5DB"} />
                    <rect x="3" y="14" width="7" height="7" rx="1" fill={isGridView ? "#000000" : "#D1D5DB"} />
                    <rect x="14" y="14" width="7" height="7" rx="1" fill={isGridView ? "#000000" : "#D1D5DB"} />
                  </svg>
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 rounded-md ${!isGridView ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  aria-label="List view"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="2" rx="1" fill={!isGridView ? "#000000" : "#D1D5DB"} />
                    <rect x="3" y="11" width="18" height="2" rx="1" fill={!isGridView ? "#000000" : "#D1D5DB"} />
                    <rect x="3" y="18" width="18" height="2" rx="1" fill={!isGridView ? "#000000" : "#D1D5DB"} />
                  </svg>
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-4 w-full max-w-4xl">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    px-5 py-2.5 rounded-md font-medium transition-all duration-200
                    flex items-center gap-2
                    ${
                      activeCategory === category.id
                        ? "bg-[#000000] text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className={activeCategory === category.id ? "text-white" : "text-gray-500"}>
                    {category.icon}
                  </span>
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="text-sm text-gray-500 mt-2">
              Showing {filteredServices.length} of {services.length} services
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid/List */}
      <section ref={servicesRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
            className={
              isGridView
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-6 max-w-4xl mx-auto"
            }
          >
            <AnimatePresence mode="sync">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    layout: { duration: 0.3 },
                  }}
                  onClick={() => handleServiceClick(service.id)}
                  className={`
                    relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
                    ${
                      isGridView
                        ? "bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"
                        : "bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"
                    }
                    ${selectedService === service.id ? "ring-2 ring-[#D32927]/50" : ""}
                  `}
                >
                  {/* Service card content */}
                  <div className={`p-6 ${isGridView ? "" : "flex gap-6"}`}>
                    {/* Icon with category color */}
                    <div
                      className={`
                        ${isGridView ? "mb-6" : "flex-shrink-0"}
                        w-16 h-16 rounded-lg flex items-center justify-center
                        ${service.categories.includes("marketing") ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                        ${service.categories.includes("analytics") && !service.categories.includes("marketing") ? "bg-[#F4C600]/10 text-[#F4C600]" : ""}
                        ${service.categories.includes("development") && !service.categories.includes("marketing") && !service.categories.includes("analytics") ? "bg-[#1A3C86]/10 text-[#1A3C86]" : ""}
                        ${service.categories.includes("security") && !service.categories.includes("marketing") && !service.categories.includes("analytics") && !service.categories.includes("development") ? "bg-[#000000]/10 text-[#000000]" : ""}
                        ${service.categories.includes("customer-success") && !service.categories.some((c) => ["marketing", "analytics", "development", "security"].includes(c)) ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                      `}
                    >
                      {service.icon}
                    </div>

                    <div className={isGridView ? "" : "flex-grow"}>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>

                      {/* Category tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.categories.map((categoryId) => {
                          const category = categories.find((c) => c.id === categoryId)
                          if (!category) return null

                          return (
                            <span
                              key={categoryId}
                              className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1
                                ${categoryId === "marketing" ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                                ${categoryId === "analytics" ? "bg-[#F4C600]/10 text-[#F4C600]" : ""}
                                ${categoryId === "development" ? "bg-[#1A3C86]/10 text-[#1A3C86]" : ""}
                                ${categoryId === "security" ? "bg-[#000000]/10 text-[#000000]" : ""}
                                ${categoryId === "customer-success" ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                              `}
                            >
                              {category.icon}
                              <span>{category.name}</span>
                            </span>
                          )
                        })}
                      </div>

                      {/* Learn more button */}
                      <button className="inline-flex items-center text-sm font-medium text-[#D32927] hover:text-[#D32927]/80 transition-all">
                        Learn more
                        <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence mode="sync">
                    {selectedService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-semibold mb-3">Key Benefits</h4>
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="h-5 w-5 text-[#D32927] flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>

                          <div className="mt-6 flex justify-end">
                            <button className="px-4 py-2 bg-[#000000] text-white rounded-md hover:bg-[#000000]/90 transition-colors text-sm font-medium">
                              Request Service
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <h3 className="text-2xl font-medium text-gray-600 mb-4">No services found in this category</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory("all")}
                className="px-6 py-2 bg-[#D32927] text-white rounded-md hover:bg-[#D32927]/90 transition-colors"
              >
                View All Services
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#000000] to-[#1A3C86] relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your business?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Our team of experts is ready to help you implement the right solutions for your unique business
              challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#D32927] text-white font-medium rounded-md hover:bg-[#D32927]/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Schedule a Consultation
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-all"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 