"use client"

import { useState } from "react"
import { serviceCategories } from "./service-categories"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Megaphone,
  Globe,
  Users,
  CreditCard,
  Database,
  Shield,
  Settings,
  GraduationCap,
  Zap,
  Phone,
} from "lucide-react"
import { motion } from "framer-motion"

// Map category IDs to icons
const categoryIcons = {
  "ai-ml": <Brain className="h-5 w-5" />,
  "digital-marketing": <Megaphone className="h-5 w-5" />,
  "web-development": <Globe className="h-5 w-5" />,
  "customer-success": <Users className="h-5 w-5" />,
  "payment-commerce": <CreditCard className="h-5 w-5" />,
  "data-analytics": <Database className="h-5 w-5" />,
  "it-security": <Shield className="h-5 w-5" />,
  "automation-logistics": <Settings className="h-5 w-5" />,
  communication: <Phone className="h-5 w-5" />,
  "training-knowledge": <GraduationCap className="h-5 w-5" />,
  "emerging-tech": <Zap className="h-5 w-5" />,
}

export function ServiceDisplay() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id)

  const getActiveCategory = () => {
    return serviceCategories.find((category) => category.id === activeCategory) || serviceCategories[0]
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {serviceCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`flex items-center gap-2 ${activeCategory === category.id ? "bg-[#1a3c86]" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {categoryIcons[category.id as keyof typeof categoryIcons]}
            <span className="hidden sm:inline">{category.name}</span>
          </Button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h3 className="text-xl font-bold mb-4 text-[#1a3c86]">{getActiveCategory().name}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getActiveCategory().services.map((service, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <p>{service}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

