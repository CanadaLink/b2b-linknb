"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { OptimizedImage } from "./optimized-image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#D32927]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Digital Transformation for <span className="text-[#D32927]">New Brunswick</span> Businesses
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-lg mx-auto md:mx-0">
                Tailored B2B digital solutions designed to drive efficiency, innovation, and sustainable growth for your
                organization in New Brunswick.
              </p>

              <ul className="mb-8 space-y-2 text-left max-w-lg mx-auto md:mx-0">
                {[
                  "Locally owned and operated in New Brunswick",
                  "Full ownership of all solutions we build",
                  "Expertise in AI, web development, and digital marketing",
                  "Free consultation with no obligation",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#D32927] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-[#D32927] hover:bg-[#D32927]/90 text-white font-medium">
                  <Link href="/meet" className="flex items-center">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Link href="#services">Explore Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden aspect-video">
                <OptimizedImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NBFlag-nK7JOu83SneIG5BskpW4pAFrwAFvn2.png"
                  alt="New Brunswick Business Digital Transformation Solutions"
                  className="w-full h-full object-contain"
                  width={600}
                  height={400}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D32927]/20 to-transparent"></div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-[#D32927]">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

