"use client"

import { motion } from "framer-motion"
import { Wrench, Server, Key } from "lucide-react"

export default function Ownership() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">We Build It. We Maintain It. You Own It.</h2>
          <p className="text-lg text-gray-600 mb-12">
            We design, develop, and maintain a custom suite of tools tailored to your business needs—without lock-ins.
            You get full access and control, ensuring flexibility, scalability, and long-term independence. Your tools,
            your data, your way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#D32927]/10 flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8 text-[#D32927]" />
              </div>
              <h3 className="text-xl font-bold mb-2">We Build It</h3>
              <p className="text-gray-600">
                Custom solutions designed specifically for your unique business needs and challenges.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1A3C86]/10 flex items-center justify-center mb-4">
                <Server className="h-8 w-8 text-[#1A3C86]" />
              </div>
              <h3 className="text-xl font-bold mb-2">We Maintain It</h3>
              <p className="text-gray-600">
                Ongoing support, updates, and optimization to ensure your systems run smoothly.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#F4C600]/10 flex items-center justify-center mb-4">
                <Key className="h-8 w-8 text-[#F4C600]" />
              </div>
              <h3 className="text-xl font-bold mb-2">You Own It</h3>
              <p className="text-gray-600">
                Full ownership and control of your solutions, with no vendor lock-in or hidden restrictions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

