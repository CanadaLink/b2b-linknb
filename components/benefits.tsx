"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  UserCheck,
  DollarSign,
  Compass,
  ArrowRightLeft,
  Cpu,
  TrendingUp,
  Shield,
  BarChart3,
  Lightbulb,
  Settings,
  Key,
  Wrench,
  Server,
  GraduationCap,
} from "lucide-react"

const benefits = [
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
    title: "Competitive Pricing",
    description: "We offer transparent, competitive pricing with exceptional value for your investment.",
    icon: <DollarSign className="h-6 w-6 text-[#F4C600]" />,
  },
  {
    title: "360° Business Solutions",
    description: "Comprehensive solutions that address every aspect of your business needs.",
    icon: <Compass className="h-6 w-6 text-[#D32927]" />,
  },
  {
    title: "End-to-End B2B Services",
    description:
      "From marketing and SEO to automation and inventory, we optimize every aspect of your business for seamless growth.",
    icon: <ArrowRightLeft className="h-6 w-6 text-[#1A3C86]" />,
  },
  {
    title: "Smarter Tech, Stronger Business",
    description:
      "We use the latest advanced technology to digitalize and streamline your operations, ensuring your business stays agile, competitive, and future-proof.",
    icon: <Cpu className="h-6 w-6 text-[#F4C600]" />,
  },
  {
    title: "Scalability",
    description: "Our solutions grow with your business, ensuring long-term success and adaptability.",
    icon: <TrendingUp className="h-6 w-6 text-[#D32927]" />,
  },
  {
    title: "Enhanced Security",
    description:
      "We prioritize security with advanced protection measures, keeping your data safe, your operations secure, and your business resilient against evolving threats.",
    icon: <Shield className="h-6 w-6 text-[#1A3C86]" />,
  },
  {
    title: "Data-Driven Decisions",
    description: "Leverage analytics to make informed business decisions based on real-time insights.",
    icon: <BarChart3 className="h-6 w-6 text-[#F4C600]" />,
  },
  {
    title: "Innovation",
    description:
      "We analyze your operations and provide tailored, forward-thinking solutions that drive efficiency, growth, and long-term success.",
    icon: <Lightbulb className="h-6 w-6 text-[#D32927]" />,
  },
  {
    title: "Automations",
    description:
      "We assess your business processes, identify inefficiencies, and implement intelligent automation to save time, reduce costs, and maximize productivity.",
    icon: <Settings className="h-6 w-6 text-[#1A3C86]" />,
  },
  {
    title: "Training",
    description:
      "We provide comprehensive training for your team to effectively use any implementations or tools we provide, ensuring you get maximum value from your investment.",
    icon: <GraduationCap className="h-6 w-6 text-[#F4C600]" />,
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We deliver comprehensive solutions that drive real business results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ownership Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-xl p-8 shadow-md border-l-4 border-[#D32927]"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0 flex flex-col items-center md:items-start">
              <div className="w-20 h-20 rounded-full bg-[#D32927]/10 flex items-center justify-center mb-4">
                <Key className="h-10 w-10 text-[#D32927]" />
              </div>
              <h3 className="text-2xl font-bold text-center md:text-left">Full Ownership Model</h3>
            </div>

            <div className="flex-grow">
              <h4 className="text-xl font-bold mb-4 text-center md:text-left">
                We Build It. We Maintain It. You Own It.
              </h4>
              <p className="text-gray-600 mb-6">
                We design, develop, and maintain a custom suite of tools tailored to your business needs—without
                lock-ins. You get full access and control, ensuring flexibility, scalability, and long-term
                independence.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-[#D32927]" />
                  <span className="font-medium">Custom Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-[#1A3C86]" />
                  <span className="font-medium">Ongoing Maintenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-[#F4C600]" />
                  <span className="font-medium">Your Data, Your Way</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 text-center shadow-sm"
          >
            <div className="text-3xl md:text-4xl font-bold text-[#1A3C86] mb-2">500+</div>
            <div className="text-sm text-gray-600">Enterprise Clients</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 text-center shadow-sm"
          >
            <div className="text-3xl md:text-4xl font-bold text-[#000000] mb-2">24/7</div>
            <div className="text-sm text-gray-600">Global Support</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

