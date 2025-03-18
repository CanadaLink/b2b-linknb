"use client"
import { motion } from "framer-motion"
import { Key, Wrench, Server, Lock, Code, Database, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useDeviceType } from "@/hooks/use-device-type"

interface OwnershipModelProps {
  isOnMeetPage?: boolean
}

export function OwnershipModel({ isOnMeetPage = false }: OwnershipModelProps) {
  const { isMobile } = useDeviceType()

  // Reduce animation complexity on mobile for better performance
  const getAnimationProps = (delay = 0) => {
    if (isMobile) {
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        transition: { duration: 0.3, delay: delay * 0.05 },
        viewport: { once: true, margin: "-50px" },
      }
    }

    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: delay * 0.1 },
      viewport: { once: true },
    }
  }

  return (
    <section className="py-12 md:py-24 bg-white" id="ownership-model">
      <div className="container mx-auto px-4">
        <motion.div {...getAnimationProps()} className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Full Ownership Model</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Unlike other providers, we believe your business solutions should truly belong to you.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-8 shadow-md border-l-4 border-[#D32927] mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8">
              <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#D32927]/10 flex items-center justify-center mb-3 md:mb-4">
                  <Key className="h-8 w-8 md:h-10 md:w-10 text-[#D32927]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-center md:text-left">Your Business, Your Assets</h3>
              </div>

              <div className="flex-grow">
                <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center md:text-left">
                  We Build It. We Maintain It. You Own It.
                </h4>
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                  We design, develop, and maintain a custom suite of tools tailored to your business needs—without
                  lock-ins. You get full access and control, ensuring flexibility, scalability, and long-term
                  independence. Your tools, your data, your way.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 md:h-5 md:w-5 text-[#D32927]" />
                    <span className="font-medium text-sm md:text-base">Custom Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 md:h-5 md:w-5 text-[#1A3C86]" />
                    <span className="font-medium text-sm md:text-base">Ongoing Maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 md:h-5 md:w-5 text-[#F4C600]" />
                    <span className="font-medium text-sm md:text-base">Your Data, Your Way</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: <Code className="h-6 w-6 md:h-8 md:w-8 text-[#D32927]" />,
                title: "Full Source Code Access",
                description:
                  "You receive complete access to all source code, ensuring you're never locked into our services.",
                color: "#D32927",
                delay: 0,
              },
              {
                icon: <Database className="h-6 w-6 md:h-8 md:w-8 text-[#1A3C86]" />,
                title: "Data Ownership",
                description:
                  "Your data remains 100% yours. We never hold your information hostage or restrict your access.",
                color: "#1A3C86",
                delay: 1,
              },
              {
                icon: <Lock className="h-6 w-6 md:h-8 md:w-8 text-[#F4C600]" />,
                title: "No Vendor Lock-in",
                description: "Freedom to modify, extend, or migrate your solutions with or without our involvement.",
                color: "#F4C600",
                delay: 2,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                {...getAnimationProps(item.delay)}
                className="bg-white rounded-xl p-4 md:p-6 shadow-sm"
              >
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto"
                  style={{ backgroundColor: `${item.color}10` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center text-sm md:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Only show the button if not on the meet page */}
          {!isOnMeetPage && (
            <div className="mt-8 md:mt-12 text-center">
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
        </motion.div>
      </div>
    </section>
  )
}

