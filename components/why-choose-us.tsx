"use client"
import { motion } from "framer-motion"
import { MapPin, UserCheck, Shield, Cpu, TrendingUp, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDeviceType } from "@/hooks/use-device-type"

const keyBenefits = [
  {
    title: "Locally in New Brunswick",
    description: "We're proudly based in New Brunswick, offering local expertise with a global perspective.",
    icon: <MapPin className="h-6 w-6 text-[#D32927]" />,
  },
  {
    title: "Dedicated Account Manager",
    description: "Every client gets a dedicated account manager for personalized service and support.",
    icon: <UserCheck className="h-6 w-6 text-[#1A3C86]" />,
  },
  {
    title: "Enhanced Security",
    description:
      "We prioritize security with advanced protection measures, keeping your data safe and your business resilient.",
    icon: <Shield className="h-6 w-6 text-[#1A3C86]" />,
  },
  {
    title: "Cutting-Edge Technology",
    description: "We leverage the latest technologies to ensure your business stays competitive and future-proof.",
    icon: <Cpu className="h-6 w-6 text-[#F4C600]" />,
  },
  {
    title: "Scalable Solutions",
    description: "Our solutions grow with your business, ensuring long-term success and adaptability.",
    icon: <TrendingUp className="h-6 w-6 text-[#D32927]" />,
  },
  {
    title: "Data-Driven Approach",
    description: "We use analytics and insights to make informed decisions that drive real business results.",
    icon: <BarChart3 className="h-6 w-6 text-[#F4C600]" />,
  },
]

interface WhyChooseUsProps {
  isOnMeetPage?: boolean
}

export function WhyChooseUs({ isOnMeetPage = false }: WhyChooseUsProps) {
  const { isMobile } = useDeviceType()

  // Reduce animation complexity on mobile for better performance
  const getAnimationProps = (index: number) => {
    if (isMobile) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.3, delay: index * 0.05 },
        viewport: { once: true, margin: "-50px" },
      }
    }

    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
      viewport: { once: true, margin: "-100px" },
    }
  }

  return (
    <section className="py-12 md:py-24 bg-gray-50" id="why-choose-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            We deliver comprehensive solutions that drive real business results for New Brunswick businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-10 md:mb-16">
          {keyBenefits.map((benefit, index) => (
            <motion.div key={index} {...getAnimationProps(index)} className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mb-10 md:mb-12">
          {[
            { value: "500+", label: "Enterprise Clients", color: "#D32927", delay: 0 },
            { value: "24/7", label: "Global Support", color: "#1A3C86", delay: 0.1 },
            { value: "10+", label: "Years Experience", color: "#F4C600", delay: 0.2 },
            { value: "100%", label: "NB Owned & Operated", color: "#000000", delay: 0.3 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              {...getAnimationProps(index)}
              className="bg-white rounded-xl p-4 md:p-6 text-center shadow-sm"
            >
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Only show the button if not on the meet page */}
        {!isOnMeetPage && (
          <div className="text-center">
            <Button
              asChild
              size={isMobile ? "default" : "lg"}
              className="bg-[#1a3c86] hover:bg-[#1a3c86]/90 text-white font-medium"
            >
              <Link href="/meet" className="flex items-center">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

