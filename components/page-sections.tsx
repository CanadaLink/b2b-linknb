"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1a3c86]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-b8kxkKw09a0zDhybya5ONAJC62gknC.png"
              alt="LinkNB Business Solutions"
              width={400}
              height={150}
              priority
              className="w-auto h-auto max-w-full"
            />
          </div>

          <p className="text-lg md:text-xl text-gray-600 mb-8 mx-auto">
            Innovative digital solutions designed to drive growth, efficiency, and success for businesses across New
            Brunswick.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#1a3c86] hover:bg-[#1a3c86]/90 text-white font-medium">
              <Link href="/meet" className="flex items-center">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#f8c300] text-[#1a3c86] hover:bg-[#f8c300]/10"
            >
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function CallToAction() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c86]/80 to-[#1a3c86]/90 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-white/90 mb-10">
            Schedule a free consultation and discover how our solutions can help your business thrive in the digital
            age.
          </p>

          <Button asChild size="lg" className="bg-[#f8c300] hover:bg-[#f8c300]/90 text-[#1a3c86] font-medium">
            <Link href="/meet" className="flex items-center">
              Book Your Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

