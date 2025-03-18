"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Stethoscope,
  Car,
  ShoppingBag,
  GraduationCap,
  ShoppingCart,
  Zap,
  Leaf,
  Landmark,
  Shield,
  Scale,
  Truck,
  Film,
  Home,
  Utensils,
  Lock,
  Phone,
  Plane,
  Dumbbell,
  Bus,
  Instagram,
  Rocket,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { IndustriesMeta } from "./seo/industries-meta"

// Define industry categories with icons and add more detailed information for popups
const industryCategories = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Stethoscope className="h-6 w-6" />,
    color: "#d32927",
    description: "Solutions for health clinics, dental practices, and wellness centers",
    longDescription:
      "Our healthcare solutions streamline patient care, optimize administrative processes, and ensure compliance with industry regulations. We help healthcare providers deliver better patient experiences while improving operational efficiency.",
    services: [
      "Customer Relationship Management",
      "Appointment/Meeting Schedulers",
      "Inventory Management",
      "Mobile App Development (Patient Portals, Telemedicine)",
      "Cybersecurity (HIPAA/GDPR Compliance)",
      "Tracking Technology (Health Monitoring)",
      "Data Warehouses (Medical Records)",
    ],
    clients: ["Health Clinics", "Dental Clinics", "Yoga Studios", "Pharmacies", "Wellness Centers", "Medical Labs"],
  },
  {
    id: "automobile",
    name: "Automobile",
    icon: <Car className="h-6 w-6" />,
    color: "#f8c300",
    description: "Services for dealerships, repair shops, and rental companies",
    longDescription:
      "Our automotive industry solutions help dealerships, repair shops, and rental companies streamline operations, improve customer engagement, and increase sales. From inventory management to digital marketing, we provide comprehensive tools for growth.",
    services: [
      "Customer Relationship Management",
      "Advertising & Digital Marketing",
      "Analytics & Dashboards",
      "Inventory Management (Vehicles & Parts)",
      "Payments (POS Machines/Online)",
      "Website Development (Vehicle Listings)",
      "Ad Management",
    ],
    clients: [
      "Car Dealerships",
      "Auto Repair Shops",
      "Car Rental Services",
      "Auto Parts Suppliers",
      "Electric Vehicle Providers",
    ],
  },
  {
    id: "retail",
    name: "Retail",
    icon: <ShoppingBag className="h-6 w-6" />,
    color: "#1a3c86",
    description: "Tools for clothing stores, supermarkets, and specialty shops",
    longDescription:
      "Our retail solutions enhance customer experience and streamline operations for businesses of all sizes. From inventory management to customer loyalty programs, we help retailers compete effectively in today's market.",
    services: [
      "Inventory Management (Stock Control, Smart Replenishment)",
      "Payments (POS Machines/Online)",
      "Mobile App Development (E-Commerce Apps, Loyalty)",
      "Ad Management & Digital Marketing",
      "Customer Relationship Management",
      "Landing Pages & E-Commerce Solutions",
      "Tracking Technology (Consumer Behavior Analysis)",
    ],
    clients: ["Clothing Stores", "Supermarkets", "Electronics Shops", "Home Décor", "Specialty Stores"],
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "#d32927",
    description: "Platforms for schools, universities, and online learning",
    longDescription:
      "Our education technology solutions empower institutions to deliver better learning experiences while streamlining administrative tasks. From e-learning platforms to student management systems, we help educational organizations thrive in the digital age.",
    services: [
      "E-Learning Portals (Course Platforms, LMS)",
      "Appointment & Meeting Schedulers",
      "Newsletters & Marketing Emails",
      "Mobile App Development (Interactive Learning)",
      "Data Warehouses (Student Performance Analytics)",
      "Cybersecurity (Student Data Privacy)",
    ],
    clients: ["Schools", "Universities", "Online Learning Platforms", "Corporate Training", "EdTech Startups"],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: <ShoppingCart className="h-6 w-6" />,
    color: "#f8c300",
    description: "Systems for online marketplaces and digital storefronts",
    longDescription:
      "Our e-commerce solutions help businesses establish and grow their online presence. From custom storefronts to payment processing and order fulfillment, we provide the tools needed to succeed in the competitive digital marketplace.",
    services: [
      "Inventory Management & Order Fulfillment",
      "Payments (E-Wallets, Cryptocurrency, BNPL)",
      "Website Development (Custom Storefronts)",
      "Ad Management & Performance Marketing",
      "Customer Relationship Management",
      "Analytics & Dashboards (Real-Time Sales)",
      "Tracking Technology (AI-Powered Personalization)",
    ],
    clients: ["Online Marketplaces", "Dropshipping Stores", "Subscription Boxes", "Digital Products"],
  },
  {
    id: "energy",
    name: "Energy",
    icon: <Zap className="h-6 w-6" />,
    color: "#1a3c86",
    description: "Analytics for utility providers and renewable energy companies",
    longDescription:
      "Our energy sector solutions help companies optimize operations, analyze data, and improve customer service. We provide specialized tools for utility providers, renewable energy companies, and related businesses.",
    services: [
      "Analytics & Dashboards",
      "Integrations",
      "IVR & Communications",
      "Cybersecurity",
      "Mapping",
      "Data Warehouses",
    ],
    clients: ["Utility Providers", "Renewable Energy Companies", "Oil & Gas Firms", "Energy Consultants"],
  },
  {
    id: "environment",
    name: "Environment",
    icon: <Leaf className="h-6 w-6" />,
    color: "#d32927",
    description: "Tracking for environmental NGOs and green tech startups",
    longDescription:
      "Our environmental solutions support organizations focused on sustainability and conservation. We provide data tracking, analysis tools, and reporting systems that help environmental organizations make a greater impact.",
    services: [
      "Analytics & Dashboards",
      "Integrations",
      "Tracking technology",
      "Data Warehouses",
      "Mapping",
      "Reporting & Compliance Systems",
    ],
    clients: ["Environmental NGOs", "Recycling Centers", "Green Tech Startups", "Conservation Organizations"],
  },
  {
    id: "government",
    name: "Government",
    icon: <Landmark className="h-6 w-6" />,
    color: "#f8c300",
    description: "Secure portals for public agencies and municipalities",
    longDescription:
      "Our government solutions help public sector organizations improve service delivery, enhance security, and streamline operations. We provide secure, compliant systems designed specifically for the unique needs of government entities.",
    services: [
      "Customer Relationship Management",
      "Portals (Customer portals)",
      "Cybersecurity",
      "Mobile App Development",
      "Surveys",
      "Data Warehouses",
    ],
    clients: ["Municipalities", "Provincial Departments", "Public Service Agencies", "Government Contractors"],
  },
  {
    id: "insurance",
    name: "Insurance",
    icon: <Shield className="h-6 w-6" />,
    color: "#1a3c86",
    description: "CRM and analytics for insurance providers and fintech",
    longDescription:
      "Our insurance industry solutions help companies manage customer relationships, analyze risk, and streamline claims processing. We provide specialized tools that address the unique challenges of insurance providers.",
    services: [
      "Customer Relationship Management",
      "IVR & Communications",
      "Analytics & Dashboards",
      "Mobile App Development",
      "Cybersecurity",
      "Data Warehouses",
    ],
    clients: ["Life Insurance", "Auto Insurance", "Health Insurance Companies", "Insurance Brokers"],
  },
  {
    id: "legal",
    name: "Legal",
    icon: <Scale className="h-6 w-6" />,
    color: "#d32927",
    description: "Case management for law firms and legal consultancies",
    longDescription:
      "Our legal industry solutions help law firms and legal departments manage cases, documents, and client relationships more effectively. We provide secure, efficient systems designed for the specific needs of legal professionals.",
    services: [
      "Customer Relationship Management",
      "Appointment/Meeting Schedulers",
      "Portals (Customer portals)",
      "Cybersecurity",
      "Data Warehouses",
    ],
    clients: ["Law Firms", "Legal Consultancies", "Notary Services", "Corporate Legal Departments"],
  },
  {
    id: "logistics",
    name: "Logistics",
    icon: <Truck className="h-6 w-6" />,
    color: "#f8c300",
    description: "Tracking for courier companies and supply chain management",
    longDescription:
      "Our logistics solutions optimize supply chain operations, improve tracking capabilities, and enhance delivery efficiency. We help logistics companies streamline their operations and provide better service to their customers.",
    services: [
      "Shipping & Logistics platforms",
      "Inventory Management",
      "Tracking technology",
      "Mobile App Development",
      "Data Warehouses",
      "Integrations",
    ],
    clients: ["Courier Companies", "Freight Forwarders", "Warehousing Services", "Supply Chain Consultants"],
  },
  {
    id: "media",
    name: "Media",
    icon: <Film className="h-6 w-6" />,
    color: "#1a3c86",
    description: "Content platforms for news agencies and content creators",
    longDescription:
      "Our media industry solutions help organizations create, distribute, and monetize content more effectively. From content management to audience engagement, we provide the tools needed to succeed in today's media landscape.",
    services: [
      "Advertising",
      "Video editing & Photography",
      "Ad Management",
      "Mobile App Development",
      "Newsletters/Marketing emails",
      "Website Development",
    ],
    clients: ["News Agencies", "Digital Magazines", "Content Creators", "Production Companies"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: <Home className="h-6 w-6" />,
    color: "#d32927",
    description: "Property management for agencies and developers",
    longDescription:
      "Our real estate solutions help agencies, developers, and property managers streamline operations and improve client experiences. From property listings to client management, we provide comprehensive tools for the real estate industry.",
    services: [
      "Customer Relationship Management",
      "Website Development",
      "Advertising, Analytics & Dashboards",
      "Appointment/Meeting Schedulers",
      "Mobile App Development",
    ],
    clients: ["Real Estate Agencies", "Property Developers", "Rental Platforms", "Property Management Companies"],
  },
  {
    id: "restaurants",
    name: "Restaurants",
    icon: <Utensils className="h-6 w-6" />,
    color: "#f8c300",
    description: "Booking and POS for dining establishments and cafes",
    longDescription:
      "Our restaurant solutions enhance dining experiences and streamline operations for food service businesses. From reservations to ordering systems, we help restaurants provide better service while improving efficiency.",
    services: [
      "Dine-In Booking",
      "QR Code Menus",
      "Payments (POS Machines/Online)",
      "Customer Relationship Management",
      "Ad Management",
      "Mobile App Development",
    ],
    clients: ["Fine Dining", "Fast Food Chains", "Cafes", "Food Delivery Services"],
  },
  {
    id: "security",
    name: "Security",
    icon: <Lock className="h-6 w-6" />,
    color: "#1a3c86",
    description: "Cybersecurity for data protection and surveillance",
    longDescription:
      "Our security solutions help organizations protect their assets, data, and systems from threats. We provide comprehensive security services designed to address the evolving challenges of cybersecurity and physical security.",
    services: [
      "Cybersecurity",
      "Tracking technology",
      "Integrations",
      "Data Warehouses",
      "Threat Detection & Response",
      "Security Audits & Compliance",
    ],
    clients: ["Cybersecurity Firms", "Surveillance Services", "Security Consultancies", "Enterprise Security Teams"],
  },
  {
    id: "telecom",
    name: "Telecom",
    icon: <Phone className="h-6 w-6" />,
    color: "#d32927",
    description: "Communication systems for network providers",
    longDescription:
      "Our telecommunications solutions help providers enhance connectivity and improve customer service. We provide specialized tools for managing communications infrastructure, customer relationships, and service delivery.",
    services: [
      "IVR & Communications",
      "Customer Relationship Management",
      "Analytics & Dashboards",
      "Mobile App Development",
      "Cybersecurity",
      "Data Warehouses",
    ],
    clients: [
      "Mobile Network Providers",
      "Internet Service Providers",
      "VoIP Services",
      "Telecommunications Consultants",
    ],
  },
  {
    id: "tourism",
    name: "Tourism",
    icon: <Plane className="h-6 w-6" />,
    color: "#f8c300",
    description: "Booking platforms for travel agencies and hospitality",
    longDescription:
      "Our tourism solutions help travel agencies, hotels, and tour operators enhance customer experiences and streamline operations. From booking systems to customer management, we provide the tools needed to succeed in the competitive tourism industry.",
    services: [
      "Website Development",
      "Advertising",
      "Appointment/Meeting Scheduler",
      "Customer Relationship Management",
      "Mobile App Development",
      "Tracking technology",
    ],
    clients: ["Travel Agencies", "Tour Operators", "Hospitality Services", "Tourism Boards"],
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Dumbbell className="h-6 w-6" />,
    color: "#1a3c86",
    description: "Management systems for gyms and sporting events",
    longDescription:
      "Our sports industry solutions help organizations enhance athletic performance, improve fan engagement, and streamline operations. We provide specialized tools for gyms, teams, and event organizers in the sports sector.",
    services: [
      "Advertising",
      "Mobile App Development",
      "Customer Relationship Management",
      "Analytics & Dashboards",
      "Video editing & Photography",
    ],
    clients: ["Gyms", "Sports Teams", "Sporting Events", "Athletic Clubs"],
  },
  {
    id: "transportation",
    name: "Transportation",
    icon: <Bus className="h-6 w-6" />,
    color: "#d32927",
    description: "Tracking for public transport and shipping companies",
    longDescription:
      "Our transportation solutions help companies streamline operations, improve tracking capabilities, and enhance customer experiences. We provide specialized tools for public transport, taxi services, and shipping companies.",
    services: [
      "Inventory Management",
      "Shipping & Logistics platforms",
      "Tracking technology",
      "Mobile App Development",
      "Customer Relationship Management",
      "Data Warehouses",
    ],
    clients: ["Public Transport", "Taxi Services", "Shipping Companies", "Fleet Management"],
  },
  {
    id: "influencers",
    name: "Influencers",
    icon: <Instagram className="h-6 w-6" />,
    color: "#f8c300",
    description: "Content management for social media creators",
    longDescription:
      "Our influencer solutions help content creators maximize their reach, engage with audiences, and monetize their platforms. We provide specialized tools for managing content, analyzing performance, and growing influence.",
    services: [
      "Advertising",
      "Video editing & Photography",
      "Ad Management",
      "Social Media Integrations",
      "Website Development",
      "Analytics & Dashboards",
    ],
    clients: ["Social Media Influencers", "Brand Ambassadors", "Content Creators", "Digital Marketers"],
  },
  {
    id: "startups",
    name: "Startups",
    icon: <Rocket className="h-6 w-6" />,
    color: "#1a3c86",
    description: "Growth solutions for new ventures and small enterprises",
    longDescription:
      "Our startup solutions help new ventures launch and scale efficiently. From establishing digital presence to streamlining operations, we provide the tools and expertise needed for startup success in competitive markets.",
    services: [
      "Customer Relationship Management",
      "Website Development",
      "Advertising",
      "Analytics & Dashboards",
      "Newsletters/Marketing emails",
      "Mobile App Development",
      "Inventory Management",
    ],
    clients: ["Tech Startups", "Small Enterprises", "New Ventures", "Incubators"],
  },
]

// Create a component for the industry popup content
const IndustryPopupContent = ({ industry }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${industry.color}10` }}
          >
            <div style={{ color: industry.color }}>{industry.icon}</div>
          </div>
          <div>
            <h3 className="text-xl font-bold">{industry.name} Solutions for New Brunswick</h3>
            <p className="text-gray-600">{industry.longDescription}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Key Services:</h4>
          <ul className="space-y-2">
            {industry.services.map((service, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#d32927] flex-shrink-0 mt-0.5" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">We serve:</h4>
          <div className="flex flex-wrap gap-2">
            {industry.clients.map((client, index) => (
              <Badge key={index} variant="outline" className="bg-white border-gray-200">
                {client}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100 mb-6">
          <img
            src="/logo.png"
            alt={`${industry.name} digital solutions for New Brunswick businesses`}
            className="w-full h-full object-contain p-4"
            width={400}
            height={200}
          />
        </div>

        <Button className="w-full bg-[#1a3c86] hover:bg-[#1a3c86]/90 text-white font-medium py-5 h-auto" asChild>
          <Link href="/meet" className="flex items-center justify-center">
            Book a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default function Industries() {
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null)

  return (
    <>
      <IndustriesMeta />
      <section id="industries" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our solutions are tailored to meet the unique needs of businesses across a wide range of industries in New
              Brunswick.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {industryCategories.map((industry) => (
              <Dialog key={industry.id}>
                <DialogTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHoveredIndustry(industry.id)}
                    onMouseLeave={() => setHoveredIndustry(null)}
                    whileHover={{ y: -5 }}
                    className={cn(
                      "bg-white border border-gray-100 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col",
                      hoveredIndustry === industry.id ? `border-[${industry.color}]` : "",
                    )}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${industry.color}10` }}
                    >
                      <div style={{ color: industry.color }}>{industry.icon}</div>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{industry.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{industry.description}</p>

                    <div className="text-[#1a3c86] hover:text-[#1a3c86]/80 text-sm font-medium flex items-center">
                      View Solutions
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="sr-only">{industry.name} Solutions</DialogTitle>
                    <DialogDescription className="sr-only">
                      Detailed information about our solutions for the {industry.name} industry in New Brunswick
                    </DialogDescription>
                  </DialogHeader>
                  <IndustryPopupContent industry={industry} />
                </DialogContent>
              </Dialog>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-2 border-[#1a3c86] text-[#1a3c86] hover:bg-[#1a3c86]/10 font-medium py-5 h-auto"
              asChild
            >
              <Link href="/meet">
                <span className="flex items-center justify-center text-base">Book Your Free Consultation</span>
              </Link>
            </Button>
          </div>

          {/* SEO-friendly content section */}
          <div className="mt-12 pt-8 border-t border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">
              Industry-Specific Digital Solutions for New Brunswick
            </h3>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                At LinkNB Business Solutions, we understand that each industry in New Brunswick has its own unique
                challenges and opportunities. That's why we offer tailored digital solutions designed specifically for
                the needs of various sectors across the province.
              </p>
              <p className="mt-4">
                From healthcare to retail, education to logistics, our team has the expertise to deliver customized
                technology solutions that address the specific requirements of your industry. We work closely with
                businesses in New Brunswick to understand their unique processes, compliance requirements, and growth
                objectives.
              </p>
              <p className="mt-4">
                Our industry-specific approach ensures that you receive solutions that not only solve your immediate
                challenges but also position your business for long-term success in an increasingly digital marketplace.
              </p>
              <p className="mt-4">
                <Link href="/meet" className="text-[#1a3c86] font-medium hover:underline">
                  Book a free consultation
                </Link>{" "}
                to discuss how our industry expertise can benefit your New Brunswick business.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

