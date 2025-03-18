"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Filter,
  Megaphone,
  BarChart3,
  Users,
  CreditCard,
  GraduationCap,
  Code,
  Shield,
  Cpu,
  Settings,
  Briefcase,
  Package,
  Image,
  Phone,
  Database,
  Link,
  Truck,
  X,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Define service categories
const categories = [
  { id: "all", name: "All Services", icon: <Filter className="h-4 w-4" /> },
  { id: "marketing", name: "Marketing", icon: <Megaphone className="h-4 w-4" /> },
  { id: "analytics", name: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "customer-success", name: "Customer Success", icon: <Users className="h-4 w-4" /> },
  { id: "payments", name: "Payments", icon: <CreditCard className="h-4 w-4" /> },
  { id: "training", name: "Training", icon: <GraduationCap className="h-4 w-4" /> },
  { id: "development", name: "Development", icon: <Code className="h-4 w-4" /> },
  { id: "cybersecurity", name: "Cybersecurity", icon: <Shield className="h-4 w-4" /> },
  { id: "technology", name: "Technology", icon: <Cpu className="h-4 w-4" /> },
  { id: "automations", name: "Automations", icon: <Settings className="h-4 w-4" /> },
  { id: "operations", name: "Operations", icon: <Briefcase className="h-4 w-4" /> },
  { id: "inventory", name: "Inventory", icon: <Package className="h-4 w-4" /> },
  { id: "media", name: "Media", icon: <Image className="h-4 w-4" /> },
  { id: "communications", name: "Communications", icon: <Phone className="h-4 w-4" /> },
  { id: "data", name: "Data", icon: <Database className="h-4 w-4" /> },
  { id: "integrations", name: "Integrations", icon: <Link className="h-4 w-4" /> },
  { id: "logistics", name: "Logistics", icon: <Truck className="h-4 w-4" /> },
]

// Define services with their categories
const services = [
  // Marketing
  {
    id: 1,
    title: "Social Media Management",
    description:
      "Strategic management of your social media presence to build brand awareness and engage with your audience.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Content creation", "Community management", "Performance analytics"],
  },
  {
    id: 2,
    title: "Ad Campaign Management",
    description: "Strategic planning, execution, and optimization of advertising campaigns across multiple platforms.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Campaign strategy", "Budget optimization", "Performance tracking"],
  },
  {
    id: 3,
    title: "Retargeting Strategies",
    description: "Targeted advertising to re-engage visitors who have shown interest in your products or services.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Audience segmentation", "Custom messaging", "Conversion optimization"],
  },
  {
    id: 4,
    title: "Email Marketing",
    description: "Design and implementation of effective email campaigns to nurture leads and drive conversions.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Newsletter creation", "Automated sequences", "Performance analytics"],
  },
  {
    id: 5,
    title: "Content Marketing",
    description: "Creation and distribution of valuable content to attract and engage your target audience.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Content strategy", "Blog management", "SEO optimization"],
  },
  {
    id: 6,
    title: "SEO Optimization",
    description: "Improve your website's visibility in search engine results to drive organic traffic.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Keyword research", "On-page optimization", "Technical SEO"],
  },
  {
    id: 7,
    title: "Landing Page Optimization",
    description: "Design and optimization of landing pages to maximize conversion rates.",
    categories: ["marketing", "development"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["A/B testing", "Conversion optimization", "User experience design"],
  },

  // Analytics
  {
    id: 8,
    title: "Data Analysis & Reporting",
    description: "Comprehensive analysis of your business data to extract actionable insights.",
    categories: ["analytics"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["Custom reporting", "Trend analysis", "Performance metrics"],
  },
  {
    id: 9,
    title: "Business Intelligence Dashboards",
    description: "Interactive dashboards that visualize your key business metrics in real-time.",
    categories: ["analytics", "data"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["Real-time monitoring", "Custom KPIs", "Interactive visualizations"],
  },
  {
    id: 10,
    title: "Performance Tracking",
    description: "Monitoring and analysis of key performance indicators to measure business success.",
    categories: ["analytics", "marketing"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["KPI definition", "Goal tracking", "Performance reporting"],
  },
  {
    id: 11,
    title: "Conversion Rate Optimization",
    description: "Analysis and optimization of user journeys to improve conversion rates.",
    categories: ["analytics", "marketing"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["User journey mapping", "A/B testing", "Funnel optimization"],
  },

  // Customer Success
  {
    id: 12,
    title: "CRM Implementation",
    description: "Setup and configuration of Customer Relationship Management systems to manage customer interactions.",
    categories: ["customer-success", "technology"],
    icon: <Users className="h-8 w-8" />,
    features: ["System setup", "Data migration", "User training"],
  },
  {
    id: 13,
    title: "Customer Portal Development",
    description: "Custom portals that provide your customers with self-service access to information and services.",
    categories: ["customer-success", "development"],
    icon: <Users className="h-8 w-8" />,
    features: ["User authentication", "Custom interfaces", "Integration with backend systems"],
  },
  {
    id: 14,
    title: "Customer Journey Mapping",
    description: "Visualization and optimization of the entire customer experience with your brand.",
    categories: ["customer-success", "operations"],
    icon: <Users className="h-8 w-8" />,
    features: ["Journey visualization", "Touchpoint optimization", "Experience design"],
  },
  {
    id: 15,
    title: "Customer Feedback Systems",
    description: "Implementation of systems to collect, analyze, and act on customer feedback.",
    categories: ["customer-success", "analytics"],
    icon: <Users className="h-8 w-8" />,
    features: ["Survey design", "Feedback collection", "Sentiment analysis"],
  },

  // Payments
  {
    id: 16,
    title: "Payment Gateway Integration",
    description: "Seamless integration of payment gateways into your website or application.",
    categories: ["payments", "development"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Multiple gateway support", "Secure processing", "Transaction management"],
  },
  {
    id: 17,
    title: "POS System Implementation",
    description: "Setup and configuration of Point of Sale systems for in-person transactions.",
    categories: ["payments", "technology"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Hardware setup", "Software configuration", "Staff training"],
  },
  {
    id: 18,
    title: "Subscription Billing Systems",
    description: "Implementation of recurring billing systems for subscription-based businesses.",
    categories: ["payments", "development"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Recurring billing", "Customer management", "Payment processing"],
  },
  {
    id: 19,
    title: "E-commerce Payment Solutions",
    description: "Comprehensive payment solutions for online stores and e-commerce platforms.",
    categories: ["payments", "development"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Multiple payment methods", "Secure checkout", "Order management"],
  },

  // Training
  {
    id: 20,
    title: "Staff Training Programs",
    description: "Customized training programs to equip your team with the skills they need.",
    categories: ["training"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["Needs assessment", "Custom curriculum", "Progress tracking"],
  },
  {
    id: 21,
    title: "System Onboarding",
    description: "Comprehensive onboarding for new software systems and technologies.",
    categories: ["training", "technology"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["User guides", "Hands-on training", "Support resources"],
  },
  {
    id: 22,
    title: "E-learning Platform Development",
    description: "Custom e-learning platforms for delivering training content to your team or customers.",
    categories: ["training", "development"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["Course management", "Progress tracking", "Assessment tools"],
  },
  {
    id: 23,
    title: "Knowledge Base Creation",
    description: "Development of comprehensive knowledge bases for self-service support.",
    categories: ["training", "customer-success"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["Content organization", "Search functionality", "Regular updates"],
  },

  // Development
  {
    id: 24,
    title: "Website Development",
    description: "Custom website design and development tailored to your business needs.",
    categories: ["development"],
    icon: <Code className="h-8 w-8" />,
    features: ["Responsive design", "Content management", "SEO optimization"],
  },
  {
    id: 25,
    title: "Mobile App Development",
    description: "Custom mobile application development for iOS and Android platforms.",
    categories: ["development"],
    icon: <Code className="h-8 w-8" />,
    features: ["Native development", "Cross-platform options", "App store submission"],
  },
  {
    id: 26,
    title: "Custom Software Solutions",
    description: "Bespoke software development to address specific business challenges.",
    categories: ["development", "technology"],
    icon: <Code className="h-8 w-8" />,
    features: ["Requirements analysis", "Custom development", "Ongoing support"],
  },
  {
    id: 27,
    title: "API Development & Integration",
    description: "Development of APIs to connect your systems and enable data exchange.",
    categories: ["development", "integrations"],
    icon: <Code className="h-8 w-8" />,
    features: ["API design", "Documentation", "Integration support"],
  },
  {
    id: 28,
    title: "Booking System Development",
    description: "Custom booking and appointment scheduling systems for your business.",
    categories: ["development", "operations"],
    icon: <Code className="h-8 w-8" />,
    features: ["Calendar integration", "Automated reminders", "Payment processing"],
  },
  {
    id: 29,
    title: "QR Code Menu Systems",
    description: "Digital menu systems accessible via QR codes for restaurants and hospitality businesses.",
    categories: ["development", "operations"],
    icon: <Code className="h-8 w-8" />,
    features: ["Menu management", "Real-time updates", "Mobile optimization"],
  },

  // Cybersecurity
  {
    id: 30,
    title: "Security Audits",
    description: "Comprehensive assessment of your systems to identify and address security vulnerabilities.",
    categories: ["cybersecurity"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Vulnerability scanning", "Risk assessment", "Remediation planning"],
  },
  {
    id: 31,
    title: "Data Protection Implementation",
    description: "Implementation of systems and processes to protect sensitive data.",
    categories: ["cybersecurity", "data"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Encryption", "Access controls", "Compliance management"],
  },
  {
    id: 32,
    title: "Threat Detection & Response",
    description: "Proactive monitoring and response to security threats and incidents.",
    categories: ["cybersecurity", "technology"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Real-time monitoring", "Incident response", "Threat intelligence"],
  },
  {
    id: 33,
    title: "Security Training",
    description: "Training programs to educate your team on security best practices.",
    categories: ["cybersecurity", "training"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Awareness training", "Phishing simulations", "Security policies"],
  },

  // Technology
  {
    id: 34,
    title: "IT Infrastructure Setup",
    description: "Design and implementation of robust IT infrastructure for your business.",
    categories: ["technology"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Network design", "Hardware selection", "System configuration"],
  },
  {
    id: 35,
    title: "Cloud Computing Solutions",
    description: "Migration and management of your systems in the cloud for improved scalability and reliability.",
    categories: ["technology", "data"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Cloud migration", "Infrastructure as code", "Cost optimization"],
  },
  {
    id: 36,
    title: "Technology Consulting",
    description: "Expert advice on technology selection and implementation to meet your business goals.",
    categories: ["technology", "operations"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Needs assessment", "Technology roadmap", "Implementation planning"],
  },
  {
    id: 37,
    title: "IT Support Services",
    description: "Ongoing support for your technology systems to ensure smooth operation.",
    categories: ["technology", "operations"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Help desk", "System maintenance", "Issue resolution"],
  },

  // Automations
  {
    id: 38,
    title: "Workflow Automation",
    description: "Automation of repetitive tasks and workflows to improve efficiency.",
    categories: ["automations", "operations"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Process mapping", "Automation implementation", "Efficiency monitoring"],
  },
  {
    id: 39,
    title: "Marketing Automation",
    description: "Automation of marketing tasks and campaigns to improve efficiency and effectiveness.",
    categories: ["automations", "marketing"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Email automation", "Lead nurturing", "Campaign scheduling"],
  },
  {
    id: 40,
    title: "Sales Process Automation",
    description: "Automation of sales processes to streamline lead management and conversion.",
    categories: ["automations", "customer-success"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Lead scoring", "Follow-up automation", "Deal tracking"],
  },
  {
    id: 41,
    title: "Customer Service Automation",
    description: "Automation of customer service processes to improve response times and satisfaction.",
    categories: ["automations", "customer-success"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Chatbots", "Ticket routing", "Self-service portals"],
  },

  // Operations
  {
    id: 42,
    title: "Business Process Management",
    description: "Optimization of business processes to improve efficiency and effectiveness.",
    categories: ["operations"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Process mapping", "Efficiency analysis", "Improvement implementation"],
  },
  {
    id: 43,
    title: "Operational Efficiency Consulting",
    description: "Expert advice on improving operational efficiency and reducing costs.",
    categories: ["operations", "technology"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Efficiency assessment", "Cost reduction", "Implementation planning"],
  },
  {
    id: 44,
    title: "Workflow Design",
    description: "Design and implementation of efficient workflows for your business processes.",
    categories: ["operations", "automations"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Process mapping", "Workflow optimization", "Implementation support"],
  },
  {
    id: 45,
    title: "Project Management",
    description: "Professional management of projects to ensure successful delivery on time and within budget.",
    categories: ["operations"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Planning", "Execution", "Monitoring and control"],
  },

  // Inventory
  {
    id: 46,
    title: "Inventory Management Systems",
    description: "Implementation of systems to track and manage your inventory efficiently.",
    categories: ["inventory", "operations"],
    icon: <Package className="h-8 w-8" />,
    features: ["Stock tracking", "Reorder automation", "Reporting"],
  },
  {
    id: 47,
    title: "Supply Chain Optimization",
    description: "Analysis and optimization of your supply chain for improved efficiency and reliability.",
    categories: ["inventory", "logistics"],
    icon: <Package className="h-8 w-8" />,
    features: ["Supply chain mapping", "Bottleneck identification", "Improvement implementation"],
  },
  {
    id: 48,
    title: "Warehouse Management",
    description: "Systems and processes to efficiently manage warehouse operations.",
    categories: ["inventory", "operations"],
    icon: <Package className="h-8 w-8" />,
    features: ["Layout optimization", "Picking and packing", "Inventory control"],
  },
  {
    id: 49,
    title: "Stock Control Systems",
    description: "Implementation of systems to maintain optimal stock levels and prevent stockouts.",
    categories: ["inventory", "technology"],
    icon: <Package className="h-8 w-8" />,
    features: ["Demand forecasting", "Reorder point calculation", "Inventory valuation"],
  },

  // Media
  {
    id: 50,
    title: "Graphic Design",
    description: "Professional graphic design services for your brand and marketing materials.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Logo design", "Brand identity", "Marketing collateral"],
  },
  {
    id: 51,
    title: "Video Production & Editing",
    description: "Professional video production and editing services for marketing and communication.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Concept development", "Production", "Post-production"],
  },
  {
    id: 52,
    title: "Photography",
    description: "Professional photography services for your products, team, and facilities.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Product photography", "Corporate portraits", "Location shoots"],
  },
  {
    id: 53,
    title: "Content Creation",
    description: "Creation of engaging content for your website, social media, and marketing campaigns.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Copywriting", "Graphic design", "Video production"],
  },

  // Communications
  {
    id: 54,
    title: "IVR System Implementation",
    description: "Setup and configuration of Interactive Voice Response systems for efficient call handling.",
    categories: ["communications", "technology"],
    icon: <Phone className="h-8 w-8" />,
    features: ["Call flow design", "Voice recording", "Integration with CRM"],
  },
  {
    id: 55,
    title: "Communication Platform Integration",
    description: "Integration of communication platforms with your business systems for streamlined communication.",
    categories: ["communications", "integrations"],
    icon: <Phone className="h-8 w-8" />,
    features: ["Platform selection", "System integration", "User training"],
  },
  {
    id: 56,
    title: "Unified Communications",
    description: "Implementation of unified communications systems to integrate voice, video, and messaging.",
    categories: ["communications", "technology"],
    icon: <Phone className="h-8 w-8" />,
    features: ["System design", "Implementation", "User adoption"],
  },
  {
    id: 57,
    title: "CRM Communication Integration",
    description: "Integration of your communication systems with your CRM for improved customer management.",
    categories: ["communications", "customer-success"],
    icon: <Phone className="h-8 w-8" />,
    features: ["System integration", "Call logging", "Customer data synchronization"],
  },

  // Data
  {
    id: 58,
    title: "Data Warehousing",
    description: "Design and implementation of data warehouses for efficient data storage and analysis.",
    categories: ["data", "technology"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data modeling", "ETL processes", "Query optimization"],
  },
  {
    id: 59,
    title: "Data Analytics",
    description: "Advanced analytics to extract insights from your business data.",
    categories: ["data", "analytics"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data exploration", "Statistical analysis", "Predictive modeling"],
  },
  {
    id: 60,
    title: "Data Tracking Solutions",
    description: "Implementation of systems to track and collect data from various sources.",
    categories: ["data", "analytics"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data collection", "Source integration", "Data validation"],
  },
  {
    id: 61,
    title: "Big Data Solutions",
    description: "Solutions for managing and analyzing large volumes of data.",
    categories: ["data", "technology"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data processing", "Distributed computing", "Advanced analytics"],
  },

  // Integrations
  {
    id: 62,
    title: "System Integration",
    description: "Integration of multiple systems to create a unified and efficient technology ecosystem.",
    categories: ["integrations", "technology"],
    icon: <Link className="h-8 w-8" />,
    features: ["System analysis", "Integration design", "Implementation"],
  },
  {
    id: 63,
    title: "API Integration",
    description: "Integration of third-party APIs to extend the functionality of your systems.",
    categories: ["integrations", "development"],
    icon: <Link className="h-8 w-8" />,
    features: ["API selection", "Integration development", "Testing and validation"],
  },
  {
    id: 64,
    title: "E-commerce Integration",
    description: "Integration of e-commerce platforms with your business systems.",
    categories: ["integrations", "development"],
    icon: <Link className="h-8 w-8" />,
    features: ["Platform selection", "Data synchronization", "Order management"],
  },
  {
    id: 65,
    title: "Social Media Integration",
    description: "Integration of social media platforms with your website and marketing systems.",
    categories: ["integrations", "marketing"],
    icon: <Link className="h-8 w-8" />,
    features: ["Platform connection", "Content sharing", "Analytics integration"],
  },

  // Logistics
  {
    id: 66,
    title: "Shipping & Logistics Platforms",
    description: "Implementation of platforms to manage shipping and logistics operations.",
    categories: ["logistics", "operations"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Carrier integration", "Rate shopping", "Shipment tracking"],
  },
  {
    id: 67,
    title: "Delivery Management",
    description: "Systems and processes to efficiently manage delivery operations.",
    categories: ["logistics", "operations"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Route optimization", "Delivery tracking", "Customer notifications"],
  },
  {
    id: 68,
    title: "Supply Chain Management",
    description: "Comprehensive management of your supply chain from procurement to delivery.",
    categories: ["logistics", "inventory"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Supply chain visibility", "Risk management", "Performance optimization"],
  },
  {
    id: 69,
    title: "Mapping & Routing Solutions",
    description: "Implementation of mapping and routing solutions for efficient transportation.",
    categories: ["logistics", "technology"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Route optimization", "Real-time tracking", "Geofencing"],
  },
]

// Number of items per page
const ITEMS_PER_PAGE = 9

export default function ComprehensiveServices() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter services based on active category and search query
  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === "all" || service.categories.includes(activeCategory)
    const matchesSearch =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Calculate total pages
  const calculateTotalPages = (itemCount, itemsPerPage) => {
    const standardPages = Math.floor(itemCount / itemsPerPage)
    const remainder = itemCount % itemsPerPage

    // If there would be just 1 item on the last page, include it in the previous page
    if (remainder === 1 && standardPages > 0) {
      return standardPages
    }

    return Math.ceil(itemCount / itemsPerPage)
  }

  // Update the totalPages calculation
  const totalPages = calculateTotalPages(filteredServices.length, ITEMS_PER_PAGE)

  // Update the items per page logic to handle  ITEMS_PER_PAGE);

  // Update the items per page logic to handle the case where we have a single item on the last page
  const getAdjustedItemsForPage = (items, page, itemsPerPage, totalPages) => {
    const standardSlice = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    // If this is the second-to-last page and the last page would have only one item,
    // include that item in this page
    if (page === totalPages - 1 && items.length % itemsPerPage === 1) {
      return items.slice((page - 1) * itemsPerPage, page * itemsPerPage + 1)
    }

    return standardSlice
  }

  // Update the current items calculation
  const currentItems = getAdjustedItemsForPage(filteredServices, currentPage, ITEMS_PER_PAGE, totalPages)

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
    setMobileFiltersOpen(false)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle pagination
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
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
      case "cybersecurity":
        return "#000000"
      case "customer-success":
        return "#D32927"
      case "payments":
        return "#F4C600"
      case "training":
        return "#1A3C86"
      case "technology":
        return "#D32927"
      case "automations":
        return "#F4C600"
      case "operations":
        return "#1A3C86"
      case "inventory":
        return "#D32927"
      case "media":
        return "#F4C600"
      case "communications":
        return "#1A3C86"
      case "data":
        return "#D32927"
      case "integrations":
        return "#F4C600"
      case "logistics":
        return "#1A3C86"
      default:
        return "#6B7280"
    }
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive B2B solutions tailored to meet your business needs and drive growth.
          </p>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                aria-label="Grid view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#000000" : "#D1D5DB"} />
                  <rect x="14" y="3" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#000000" : "#D1D5DB"} />
                  <rect x="3" y="14" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#000000" : "#D1D5DB"} />
                  <rect x="14" y="14" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#000000" : "#D1D5DB"} />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                aria-label="List view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="2" rx="1" fill={viewMode === "list" ? "#000000" : "#D1D5DB"} />
                  <rect x="3" y="11" width="18" height="2" rx="1" fill={viewMode === "list" ? "#000000" : "#D1D5DB"} />
                  <rect x="3" y="18" width="18" height="2" rx="1" fill={viewMode === "list" ? "#000000" : "#D1D5DB"} />
                </svg>
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Category Filter - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`
                      w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2
                      ${activeCategory === category.id ? "bg-[#D32927] text-white" : "text-gray-700 hover:bg-gray-100"}
                    `}
                  >
                    <span className={activeCategory === category.id ? "text-white" : "text-gray-500"}>
                      {category.icon}
                    </span>
                    {category.name}
                    {activeCategory === category.id && <CheckCircle className="h-4 w-4 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Filter - Mobile */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden w-full"
              >
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Categories</h3>
                    <Button variant="ghost" size="sm" onClick={() => setMobileFiltersOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`
                          text-left px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2
                          ${
                            activeCategory === category.id
                              ? "bg-[#D32927] text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }
                        `}
                      >
                        <span className={activeCategory === category.id ? "text-white" : "text-gray-500"}>
                          {category.icon}
                        </span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Services Content */}
          <div className="flex-grow">
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredServices.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} -{" "}
                {Math.min(
                  currentPage === totalPages - 1 && filteredServices.length % ITEMS_PER_PAGE === 1
                    ? currentPage * ITEMS_PER_PAGE + 1
                    : currentPage * ITEMS_PER_PAGE,
                  filteredServices.length,
                )}{" "}
                of {filteredServices.length} services
              </p>

              {activeCategory !== "all" && (
                <Button variant="outline" size="sm" onClick={() => handleCategoryChange("all")}>
                  Clear Filter
                </Button>
              )}
            </div>

            {/* Services Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {currentItems.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full"
                    >
                      <div
                        className={`
                        w-12 h-12 rounded-lg flex items-center justify-center mb-4
                        ${service.categories.includes("marketing") ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                        ${service.categories.includes("analytics") && !service.categories.includes("marketing") ? "bg-[#F4C600]/10 text-[#F4C600]" : ""}
                        ${service.categories.includes("development") && !service.categories.includes("marketing") && !service.categories.includes("analytics") ? "bg-[#1A3C86]/10 text-[#1A3C86]" : ""}
                        ${service.categories.includes("cybersecurity") && !service.categories.some((c) => ["marketing", "analytics", "development"].includes(c)) ? "bg-[#000000]/10 text-[#000000]" : ""}
                        ${service.categories.includes("customer-success") && !service.categories.some((c) => ["marketing", "analytics", "development", "cybersecurity"].includes(c)) ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                      `}
                      >
                        {service.icon}
                      </div>

                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.categories.map((categoryId) => {
                          const category = categories.find((c) => c.id === categoryId)
                          if (!category) return null

                          return (
                            <Badge
                              key={categoryId}
                              variant="outline"
                              className={`
                                text-xs px-2 py-0.5 rounded-full border
                                ${categoryId === "marketing" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                ${categoryId === "analytics" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                ${categoryId === "development" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                ${categoryId === "cybersecurity" ? "border-[#000000]/20 text-[#000000]" : ""}
                                ${categoryId === "customer-success" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                ${categoryId === "payments" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                ${categoryId === "training" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                ${categoryId === "technology" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                ${categoryId === "automations" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                ${categoryId === "operations" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                ${categoryId === "inventory" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                ${categoryId === "media" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                ${categoryId === "communications" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                ${categoryId === "data" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                ${categoryId === "integrations" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                ${categoryId === "logistics" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                              `}
                              onClick={() => handleCategoryChange(categoryId)}
                            >
                              {category.name}
                            </Badge>
                          )
                        })}
                      </div>

                      <Button
                        variant="link"
                        className="p-0 h-auto text-[#D32927] hover:text-[#D32927]/80 justify-start"
                      >
                        Learn more
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {currentItems.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-6"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div
                          className={`
                          w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                          ${service.categories.includes("marketing") ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                          ${service.categories.includes("analytics") && !service.categories.includes("marketing") ? "bg-[#F4C600]/10 text-[#F4C600]" : ""}
                          ${service.categories.includes("development") && !service.categories.includes("marketing") && !service.categories.includes("analytics") ? "bg-[#1A3C86]/10 text-[#1A3C86]" : ""}
                          ${service.categories.includes("cybersecurity") && !service.categories.some((c) => ["marketing", "analytics", "development"].includes(c)) ? "bg-[#000000]/10 text-[#000000]" : ""}
                          ${service.categories.includes("customer-success") && !service.categories.some((c) => ["marketing", "analytics", "development", "cybersecurity"].includes(c)) ? "bg-[#D32927]/10 text-[#D32927]" : ""}
                        `}
                        >
                          {service.icon}
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                          <p className="text-gray-600 mb-4">{service.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {service.categories.map((categoryId) => {
                              const category = categories.find((c) => c.id === categoryId)
                              if (!category) return null

                              return (
                                <Badge
                                  key={categoryId}
                                  variant="outline"
                                  className={`
                                    text-xs px-2 py-0.5 rounded-full border
                                    ${categoryId === "marketing" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                    ${categoryId === "analytics" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                    ${categoryId === "development" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                    ${categoryId === "cybersecurity" ? "border-[#000000]/20 text-[#000000]" : ""}
                                    ${categoryId === "customer-success" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                    ${categoryId === "payments" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                    ${categoryId === "training" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                    ${categoryId === "technology" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                    ${categoryId === "automations" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                    ${categoryId === "operations" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                    ${categoryId === "inventory" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                    ${categoryId === "media" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                    ${categoryId === "communications" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                    ${categoryId === "data" ? "border-[#D32927]/20 text-[#D32927]" : ""}
                                    ${categoryId === "integrations" ? "border-[#F4C600]/20 text-[#F4C600]" : ""}
                                    ${categoryId === "logistics" ? "border-[#1A3C86]/20 text-[#1A3C86]" : ""}
                                  `}
                                  onClick={() => handleCategoryChange(categoryId)}
                                >
                                  {category.name}
                                </Badge>
                              )
                            })}
                          </div>

                          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-[#D32927]" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Button
                            variant="link"
                            className="p-0 h-auto text-[#D32927] hover:text-[#D32927]/80 justify-start"
                          >
                            Learn more
                            <ChevronRight className="ml-1 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* No Results */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium text-gray-600 mb-2">No services found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setActiveCategory("all")
                    setSearchQuery("")
                  }}
                  className="bg-[#D32927] hover:bg-[#D32927]/90"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 ${currentPage === page ? "bg-[#D32927] hover:bg-[#D32927]/90" : ""}`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

