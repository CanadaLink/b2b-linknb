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
  LinkIcon,
  Truck,
  X,
  CheckCircle,
  Calendar,
  CreditCardIcon,
  Brain,
  Bot,
  MessageSquare,
  FileText,
  Sparkles,
  LineChart,
  ArrowRight,
  Globe,
  Smartphone,
  Gauge,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define service categories
const categories = [
  { id: "all", name: "All Services", icon: <Filter className="h-4 w-4" /> },
  { id: "ai", name: "AI Solutions", icon: <Brain className="h-4 w-4" /> },
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
  { id: "integrations", name: "Integrations", icon: <LinkIcon className="h-4 w-4" /> },
  { id: "logistics", name: "Logistics", icon: <Truck className="h-4 w-4" /> },
]

// Define services with their categories
const services = [
  // AI Solutions
  {
    id: 101,
    title: "AI Chatbots",
    description: "Custom AI chatbots to enhance customer service and automate routine inquiries.",
    categories: ["ai", "customer-success", "automations"],
    icon: <Bot className="h-8 w-8" />,
    features: ["24/7 customer support", "Natural language processing", "Integration with existing systems"],
    benefits: ["Reduce support costs", "Improve response times", "Scale customer service operations"],
    useCases: ["Customer support", "Lead qualification", "Internal knowledge base"],
  },
  {
    id: 102,
    title: "AI Content Generation",
    description: "Leverage AI to create high-quality content for marketing, documentation, and more.",
    categories: ["ai", "marketing", "media"],
    icon: <FileText className="h-8 w-8" />,
    features: ["Blog post generation", "Product descriptions", "Email templates"],
    benefits: ["Save time on content creation", "Maintain consistent brand voice", "Scale content production"],
    useCases: ["Marketing campaigns", "Product catalogs", "Knowledge bases"],
  },
  {
    id: 103,
    title: "AI-Powered Analytics",
    description: "Advanced analytics solutions using AI to extract deeper insights from your business data.",
    categories: ["ai", "analytics", "data"],
    icon: <LineChart className="h-8 w-8" />,
    features: ["Predictive analytics", "Anomaly detection", "Pattern recognition"],
    benefits: ["Anticipate market trends", "Identify opportunities", "Make data-driven decisions"],
    useCases: ["Sales forecasting", "Customer behavior analysis", "Operational optimization"],
  },
  {
    id: 104,
    title: "Conversational AI Assistants",
    description: "Intelligent virtual assistants that can handle complex conversations and tasks.",
    categories: ["ai", "customer-success", "operations"],
    icon: <MessageSquare className="h-8 w-8" />,
    features: ["Multi-turn conversations", "Task automation", "Personalized responses"],
    benefits: ["Enhance user experience", "Automate complex workflows", "Provide personalized service"],
    useCases: ["Virtual concierge", "Sales assistant", "HR support"],
  },
  {
    id: 105,
    title: "AI Process Automation",
    description: "Use AI to automate complex business processes and workflows.",
    categories: ["ai", "automations", "operations"],
    icon: <Sparkles className="h-8 w-8" />,
    features: ["Intelligent document processing", "Decision automation", "Workflow optimization"],
    benefits: ["Reduce manual work", "Minimize errors", "Increase operational efficiency"],
    useCases: ["Invoice processing", "Compliance checks", "Data entry and validation"],
  },

  // New Mobile App Services
  {
    id: 106,
    title: "Mobile App Development",
    description: "Custom mobile applications for iOS and Android to extend your business reach.",
    categories: ["development", "technology"],
    icon: <Smartphone className="h-8 w-8" />,
    features: ["Native and cross-platform options", "Intuitive UX/UI design", "Offline functionality"],
    benefits: ["Reach mobile users", "Enhance customer engagement", "Create new revenue streams"],
    useCases: ["E-commerce apps", "Service booking", "Loyalty programs"],
  },

  // Online Booking Services
  {
    id: 107,
    title: "Online Booking Systems",
    description: "Streamlined booking and appointment scheduling solutions for your business.",
    categories: ["development", "operations", "customer-success"],
    icon: <Calendar className="h-8 w-8" />,
    features: ["24/7 availability", "Automated reminders", "Calendar integration"],
    benefits: ["Reduce no-shows", "Eliminate scheduling conflicts", "Improve customer experience"],
    useCases: ["Service appointments", "Consultation bookings", "Resource scheduling"],
  },

  // Credit Card Processing
  {
    id: 108,
    title: "Credit Card Processing",
    description: "Secure and efficient payment processing solutions for online and in-person transactions.",
    categories: ["payments", "technology"],
    icon: <CreditCardIcon className="h-8 w-8" />,
    features: ["Multiple payment methods", "Fraud protection", "Recurring billing"],
    benefits: ["Increase conversion rates", "Enhance security", "Simplify financial reconciliation"],
    useCases: ["E-commerce", "Retail POS", "Subscription services"],
  },

  // Survey Tools
  {
    id: 109,
    title: "Survey & Feedback Systems",
    description: "Comprehensive tools to collect, analyze, and act on customer and employee feedback.",
    categories: ["customer-success", "analytics", "operations"],
    icon: <FileText className="h-8 w-8" />,
    features: ["Custom survey design", "Real-time reporting", "Sentiment analysis"],
    benefits: ["Improve products and services", "Increase customer satisfaction", "Identify trends"],
    useCases: ["Customer satisfaction", "Market research", "Employee engagement"],
  },

  // SEO Optimization
  {
    id: 110,
    title: "SEO Optimization",
    description: "Improve your website's visibility in search engines to drive organic traffic and growth.",
    categories: ["marketing", "analytics"],
    icon: <Globe className="h-8 w-8" />,
    features: ["Keyword research", "On-page optimization", "Technical SEO", "Content strategy"],
    benefits: ["Increase organic traffic", "Improve search rankings", "Enhance user experience"],
    useCases: ["Local business visibility", "E-commerce growth", "Content marketing"],
  },

  // Mobile Optimization
  {
    id: 111,
    title: "Mobile Optimization",
    description: "Ensure your digital presence works flawlessly across all mobile devices and screen sizes.",
    categories: ["development", "technology"],
    icon: <Smartphone className="h-8 w-8" />,
    features: ["Responsive design", "Performance optimization", "Touch-friendly interfaces"],
    benefits: ["Reach mobile users", "Improve user experience", "Boost conversion rates"],
    useCases: ["E-commerce sites", "Service businesses", "Content platforms"],
  },

  // Performance Optimization
  {
    id: 112,
    title: "Performance Optimization",
    description: "Speed up your website and applications for better user experience and conversion rates.",
    categories: ["development", "technology"],
    icon: <Gauge className="h-8 w-8" />,
    features: ["Page speed optimization", "Code optimization", "Server configuration"],
    benefits: ["Faster load times", "Improved user experience", "Better search rankings"],
    useCases: ["E-commerce", "Content-heavy websites", "Web applications"],
  },

  // Marketing Tools
  {
    id: 113,
    title: "Digital Marketing Suite",
    description: "Comprehensive marketing tools to attract, engage, and convert your target audience.",
    categories: ["marketing", "analytics"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Email marketing", "Social media management", "SEO optimization"],
    benefits: ["Increase brand awareness", "Generate qualified leads", "Improve ROI"],
    useCases: ["Lead generation", "Brand building", "Customer retention"],
  },

  // Original services
  {
    id: 1,
    title: "Social Media Management",
    description:
      "Strategic management of your social media presence to build brand awareness and engage with your audience.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Content creation", "Community management", "Performance analytics"],
    benefits: ["Increase brand visibility", "Engage with customers", "Drive website traffic"],
    useCases: ["Brand awareness", "Customer engagement", "Content marketing"],
  },
  {
    id: 2,
    title: "Ad Campaign Management",
    description: "Strategic planning, execution, and optimization of advertising campaigns across multiple platforms.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Campaign strategy", "Budget optimization", "Performance tracking"],
    benefits: ["Maximize ad spend", "Reach target audiences", "Increase conversions"],
    useCases: ["Product launches", "Brand awareness", "Lead generation"],
  },
  {
    id: 3,
    title: "Retargeting Strategies",
    description: "Targeted advertising to re-engage visitors who have shown interest in your products or services.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Audience segmentation", "Custom messaging", "Conversion optimization"],
    benefits: ["Recover lost sales", "Increase conversion rates", "Maximize marketing ROI"],
    useCases: ["E-commerce", "Service businesses", "Lead generation"],
  },
  {
    id: 4,
    title: "Email Marketing",
    description: "Design and implementation of effective email campaigns to nurture leads and drive conversions.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Newsletter creation", "Automated sequences", "Performance analytics"],
    benefits: ["Nurture customer relationships", "Drive repeat business", "Cost-effective marketing"],
    useCases: ["Customer retention", "Lead nurturing", "Product announcements"],
  },
  {
    id: 5,
    title: "Content Marketing",
    description: "Creation and distribution of valuable content to attract and engage your target audience.",
    categories: ["marketing"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["Content strategy", "Blog management", "SEO optimization"],
    benefits: ["Establish thought leadership", "Drive organic traffic", "Build brand authority"],
    useCases: ["Industry education", "Lead generation", "Brand building"],
  },
  {
    id: 7,
    title: "Landing Page Optimization",
    description: "Design and optimization of landing pages to maximize conversion rates.",
    categories: ["marketing", "development"],
    icon: <Megaphone className="h-8 w-8" />,
    features: ["A/B testing", "Conversion optimization", "User experience design"],
    benefits: ["Increase conversion rates", "Improve campaign ROI", "Better user experience"],
    useCases: ["Product launches", "Lead generation", "Event registration"],
  },
  {
    id: 8,
    title: "Data Analysis & Reporting",
    description: "Comprehensive analysis of your business data to extract actionable insights.",
    categories: ["analytics"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["Custom reporting", "Trend analysis", "Performance metrics"],
    benefits: ["Data-driven decisions", "Performance tracking", "Strategic planning"],
    useCases: ["Business intelligence", "Performance optimization", "Strategic planning"],
  },
  {
    id: 9,
    title: "Business Intelligence Dashboards",
    description: "Interactive dashboards that visualize your key business metrics in real-time.",
    categories: ["analytics", "data"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["Real-time monitoring", "Custom KPIs", "Interactive visualizations"],
    benefits: ["At-a-glance insights", "Improved decision making", "Performance tracking"],
    useCases: ["Executive reporting", "Team performance", "Project management"],
  },
  {
    id: 10,
    title: "Performance Tracking",
    description: "Monitoring and analysis of key performance indicators to measure business success.",
    categories: ["analytics", "marketing"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["KPI definition", "Goal tracking", "Performance reporting"],
    benefits: ["Measure success", "Identify improvement areas", "Align team efforts"],
    useCases: ["Marketing campaigns", "Sales performance", "Operational efficiency"],
  },
  {
    id: 11,
    title: "Conversion Rate Optimization",
    description: "Analysis and optimization of user journeys to improve conversion rates.",
    categories: ["analytics", "marketing"],
    icon: <BarChart3 className="h-8 w-8" />,
    features: ["User journey mapping", "A/B testing", "Funnel optimization"],
    benefits: ["Increase conversions", "Improve user experience", "Maximize marketing ROI"],
    useCases: ["E-commerce", "Lead generation", "User acquisition"],
  },
  {
    id: 12,
    title: "CRM Implementation",
    description: "Setup and configuration of Customer Relationship Management systems to manage customer interactions.",
    categories: ["customer-success", "technology"],
    icon: <Users className="h-8 w-8" />,
    features: ["System setup", "Data migration", "User training"],
    benefits: ["Improved customer management", "Sales pipeline visibility", "Enhanced team collaboration"],
    useCases: ["Sales teams", "Customer service", "Marketing automation"],
  },
  {
    id: 13,
    title: "Customer Portal Development",
    description: "Custom portals that provide your customers with self-service access to information and services.",
    categories: ["customer-success", "development"],
    icon: <Users className="h-8 w-8" />,
    features: ["User authentication", "Custom interfaces", "Integration with backend systems"],
    benefits: ["Improve customer experience", "Reduce support costs", "Increase customer satisfaction"],
    useCases: ["Service businesses", "B2B companies", "Membership organizations"],
  },
  {
    id: 14,
    title: "Customer Journey Mapping",
    description: "Visualization and optimization of the entire customer experience with your brand.",
    categories: ["customer-success", "operations"],
    icon: <Users className="h-8 w-8" />,
    features: ["Journey visualization", "Touchpoint optimization", "Experience design"],
    benefits: ["Improve customer experience", "Identify pain points", "Increase customer retention"],
    useCases: ["Service design", "Customer experience", "Marketing strategy"],
  },
  {
    id: 15,
    title: "Customer Feedback Systems",
    description: "Implementation of systems to collect, analyze, and act on customer feedback.",
    categories: ["customer-success", "analytics"],
    icon: <Users className="h-8 w-8" />,
    features: ["Survey design", "Feedback collection", "Sentiment analysis"],
    benefits: ["Improve products/services", "Increase customer satisfaction", "Identify improvement areas"],
    useCases: ["Product development", "Service improvement", "Customer retention"],
  },
  {
    id: 16,
    title: "Payment Gateway Integration",
    description: "Seamless integration of payment gateways into your website or application.",
    categories: ["payments", "development"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Multiple gateway support", "Secure processing", "Transaction management"],
    benefits: ["Accept online payments", "Improve checkout experience", "Increase sales"],
    useCases: ["E-commerce", "Service businesses", "Membership sites"],
  },
  {
    id: 17,
    title: "POS System Implementation",
    description: "Setup and configuration of Point of Sale systems for in-person transactions.",
    categories: ["payments", "technology"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Hardware setup", "Software configuration", "Staff training"],
    benefits: ["Streamline checkout", "Inventory management", "Sales reporting"],
    useCases: ["Retail", "Restaurants", "Service businesses"],
  },
  {
    id: 18,
    title: "Subscription Billing Systems",
    description: "Implementation of recurring billing systems for subscription-based businesses.",
    categories: ["payments", "development"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Recurring billing", "Customer management", "Payment processing"],
    benefits: ["Automate billing", "Reduce payment failures", "Improve cash flow"],
    useCases: ["SaaS", "Membership sites", "Service subscriptions"],
  },
  {
    id: 19,
    title: "E-commerce Payment Solutions",
    description: "Comprehensive payment solutions for online stores and e-commerce platforms.",
    categories: ["payments", "development"],
    icon: <CreditCard className="h-8 w-8" />,
    features: ["Multiple payment methods", "Secure checkout", "Order management"],
    benefits: ["Increase conversion rates", "Expand payment options", "Improve customer experience"],
    useCases: ["Online stores", "Digital products", "Service bookings"],
  },
  {
    id: 20,
    title: "Staff Training Programs",
    description: "Customized training programs to equip your team with the skills they need.",
    categories: ["training"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["Needs assessment", "Custom curriculum", "Progress tracking"],
    benefits: ["Skill development", "Improved performance", "Employee retention"],
    useCases: ["New technology adoption", "Process implementation", "Team development"],
  },
  {
    id: 21,
    title: "System Onboarding",
    description: "Comprehensive onboarding for new software systems and technologies.",
    categories: ["training", "technology"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["User guides", "Hands-on training", "Support resources"],
    benefits: ["Faster adoption", "Reduced learning curve", "Maximize system value"],
    useCases: ["CRM implementation", "ERP systems", "Productivity tools"],
  },
  {
    id: 22,
    title: "E-learning Platform Development",
    description: "Custom e-learning platforms for delivering training content to your team or customers.",
    categories: ["training", "development"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["Course management", "Progress tracking", "Assessment tools"],
    benefits: ["Scalable training", "Consistent learning experience", "Reduced training costs"],
    useCases: ["Employee training", "Customer education", "Partner certification"],
  },
  {
    id: 23,
    title: "Knowledge Base Creation",
    description: "Development of comprehensive knowledge bases for self-service support.",
    categories: ["training", "customer-success"],
    icon: <GraduationCap className="h-8 w-8" />,
    features: ["Content organization", "Search functionality", "Regular updates"],
    benefits: ["Reduce support inquiries", "Empower users", "Consistent information"],
    useCases: ["Customer support", "Internal documentation", "Product information"],
  },
  {
    id: 24,
    title: "Website Development",
    description: "Custom website design and development tailored to your business needs.",
    categories: ["development"],
    icon: <Code className="h-8 w-8" />,
    features: ["Responsive design", "Content management", "SEO optimization"],
    benefits: ["Professional online presence", "Improved user experience", "Better search visibility"],
    useCases: ["Business websites", "E-commerce", "Service portals"],
  },
  {
    id: 25,
    title: "Mobile App Development",
    description: "Custom mobile application development for iOS and Android platforms.",
    categories: ["development"],
    icon: <Code className="h-8 w-8" />,
    features: ["Native development", "Cross-platform options", "App store submission"],
    benefits: ["Reach mobile users", "Enhanced user experience", "Brand strengthening"],
    useCases: ["Customer engagement", "Service delivery", "Internal operations"],
  },
  {
    id: 26,
    title: "Custom Software Solutions",
    description: "Bespoke software development to address specific business challenges.",
    categories: ["development", "technology"],
    icon: <Code className="h-8 w-8" />,
    features: ["Requirements analysis", "Custom development", "Ongoing support"],
    benefits: ["Tailored to your needs", "Competitive advantage", "Process optimization"],
    useCases: ["Business automation", "Specialized tools", "Industry-specific solutions"],
  },
  {
    id: 27,
    title: "API Development & Integration",
    description: "Development of APIs to connect your systems and enable data exchange.",
    categories: ["development", "integrations"],
    icon: <Code className="h-8 w-8" />,
    features: ["API design", "Documentation", "Integration support"],
    benefits: ["System connectivity", "Data sharing", "Extended functionality"],
    useCases: ["Third-party integrations", "Mobile apps", "Partner ecosystems"],
  },
  {
    id: 28,
    title: "Booking System Development",
    description: "Custom booking and appointment scheduling systems for your business.",
    categories: ["development", "operations"],
    icon: <Code className="h-8 w-8" />,
    features: ["Calendar integration", "Automated reminders", "Payment processing"],
    benefits: ["Streamlined scheduling", "Reduced no-shows", "Improved customer experience"],
    useCases: ["Service businesses", "Healthcare", "Consultations"],
  },
  {
    id: 29,
    title: "QR Code Menu Systems",
    description: "Digital menu systems accessible via QR codes for restaurants and hospitality businesses.",
    categories: ["development", "operations"],
    icon: <Code className="h-8 w-8" />,
    features: ["Menu management", "Real-time updates", "Mobile optimization"],
    benefits: ["Contactless experience", "Easy menu updates", "Enhanced customer experience"],
    useCases: ["Restaurants", "Cafes", "Bars"],
  },
  {
    id: 30,
    title: "Security Audits",
    description: "Comprehensive assessment of your systems to identify and address security vulnerabilities.",
    categories: ["cybersecurity"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Vulnerability scanning", "Risk assessment", "Remediation planning"],
    benefits: ["Identify security gaps", "Prevent data breaches", "Ensure compliance"],
    useCases: ["IT infrastructure", "Web applications", "Network security"],
  },
  {
    id: 31,
    title: "Data Protection Implementation",
    description: "Implementation of systems and processes to protect sensitive data.",
    categories: ["cybersecurity", "data"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Encryption", "Access controls", "Compliance management"],
    benefits: ["Protect sensitive information", "Regulatory compliance", "Customer trust"],
    useCases: ["Healthcare", "Financial services", "E-commerce"],
  },
  {
    id: 32,
    title: "Threat Detection & Response",
    description: "Proactive monitoring and response to security threats and incidents.",
    categories: ["cybersecurity", "technology"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Real-time monitoring", "Incident response", "Threat intelligence"],
    benefits: ["Early threat detection", "Minimized breach impact", "Continuous protection"],
    useCases: ["IT infrastructure", "Cloud environments", "Critical systems"],
  },
  {
    id: 33,
    title: "Security Training",
    description: "Training programs to educate your team on security best practices.",
    categories: ["cybersecurity", "training"],
    icon: <Shield className="h-8 w-8" />,
    features: ["Awareness training", "Phishing simulations", "Security policies"],
    benefits: ["Reduce human error", "Security culture", "Compliance adherence"],
    useCases: ["Employee onboarding", "Ongoing education", "Compliance requirements"],
  },
  {
    id: 34,
    title: "IT Infrastructure Setup",
    description: "Design and implementation of robust IT infrastructure for your business.",
    categories: ["technology"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Network design", "Hardware selection", "System configuration"],
    benefits: ["Reliable foundation", "Scalable architecture", "Performance optimization"],
    useCases: ["New businesses", "Office relocations", "Technology upgrades"],
  },
  {
    id: 35,
    title: "Cloud Computing Solutions",
    description: "Migration and management of your systems in the cloud for improved scalability and reliability.",
    categories: ["technology", "data"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Cloud migration", "Infrastructure as code", "Cost optimization"],
    benefits: ["Scalability", "Cost efficiency", "Business continuity"],
    useCases: ["Infrastructure modernization", "Remote work enablement", "Business growth"],
  },
  {
    id: 36,
    title: "Technology Consulting",
    description: "Expert advice on technology selection and implementation to meet your business goals.",
    categories: ["technology", "operations"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Needs assessment", "Technology roadmap", "Implementation planning"],
    benefits: ["Strategic guidance", "Avoid costly mistakes", "Future-proof decisions"],
    useCases: ["Digital transformation", "Technology selection", "IT strategy"],
  },
  {
    id: 37,
    title: "IT Support Services",
    description: "Ongoing support for your technology systems to ensure smooth operation.",
    categories: ["technology", "operations"],
    icon: <Cpu className="h-8 w-8" />,
    features: ["Help desk", "System maintenance", "Issue resolution"],
    benefits: ["Minimize downtime", "Expert assistance", "Focus on your business"],
    useCases: ["Daily operations", "Technical issues", "System maintenance"],
  },
  {
    id: 38,
    title: "Workflow Automation",
    description: "Automation of repetitive tasks and workflows to improve efficiency.",
    categories: ["automations", "operations"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Process mapping", "Automation implementation", "Efficiency monitoring"],
    benefits: ["Time savings", "Error reduction", "Consistent processes"],
    useCases: ["Administrative tasks", "Approval processes", "Data entry"],
  },
  {
    id: 39,
    title: "Marketing Automation",
    description: "Automation of marketing tasks and campaigns to improve efficiency and effectiveness.",
    categories: ["automations", "marketing"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Email automation", "Lead nurturing", "Campaign scheduling"],
    benefits: ["Consistent messaging", "Time savings", "Improved targeting"],
    useCases: ["Lead nurturing", "Customer onboarding", "Retention campaigns"],
  },
  {
    id: 40,
    title: "Sales Process Automation",
    description: "Automation of sales processes to streamline lead management and conversion.",
    categories: ["automations", "customer-success"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Lead scoring", "Follow-up automation", "Deal tracking"],
    benefits: ["Increased efficiency", "Consistent follow-up", "Improved conversion rates"],
    useCases: ["Lead management", "Sales pipeline", "Customer acquisition"],
  },
  {
    id: 41,
    title: "Customer Service Automation",
    description: "Automation of customer service processes to improve response times and satisfaction.",
    categories: ["automations", "customer-success"],
    icon: <Settings className="h-8 w-8" />,
    features: ["Chatbots", "Ticket routing", "Self-service portals"],
    benefits: ["Faster response times", "24/7 availability", "Reduced support costs"],
    useCases: ["Customer inquiries", "Support tickets", "Information requests"],
  },
  {
    id: 42,
    title: "Business Process Management",
    description: "Optimization of business processes to improve efficiency and effectiveness.",
    categories: ["operations"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Process mapping", "Efficiency analysis", "Improvement implementation"],
    benefits: ["Streamlined operations", "Cost reduction", "Quality improvement"],
    useCases: ["Operational efficiency", "Quality management", "Compliance"],
  },
  {
    id: 43,
    title: "Operational Efficiency Consulting",
    description: "Expert advice on improving operational efficiency and reducing costs.",
    categories: ["operations", "technology"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Efficiency assessment", "Cost reduction", "Implementation planning"],
    benefits: ["Improved productivity", "Cost savings", "Competitive advantage"],
    useCases: ["Process improvement", "Cost reduction", "Organizational restructuring"],
  },
  {
    id: 44,
    title: "Workflow Design",
    description: "Design and implementation of efficient workflows for your business processes.",
    categories: ["operations", "automations"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Process mapping", "Workflow optimization", "Implementation support"],
    benefits: ["Streamlined operations", "Reduced bottlenecks", "Improved collaboration"],
    useCases: ["Project management", "Approval processes", "Customer onboarding"],
  },
  {
    id: 45,
    title: "Project Management",
    description: "Professional management of projects to ensure successful delivery on time and within budget.",
    categories: ["operations"],
    icon: <Briefcase className="h-8 w-8" />,
    features: ["Planning", "Execution", "Monitoring and control"],
    benefits: ["On-time delivery", "Budget adherence", "Quality assurance"],
    useCases: ["Technology implementation", "Business transformation", "Product launches"],
  },
  {
    id: 46,
    title: "Inventory Management Systems",
    description: "Implementation of systems to track and manage your inventory efficiently.",
    categories: ["inventory", "operations"],
    icon: <Package className="h-8 w-8" />,
    features: ["Stock tracking", "Reorder automation", "Reporting"],
    benefits: ["Prevent stockouts", "Reduce excess inventory", "Improve cash flow"],
    useCases: ["Retail", "Manufacturing", "Distribution"],
  },
  {
    id: 47,
    title: "Supply Chain Optimization",
    description: "Analysis and optimization of your supply chain for improved efficiency and reliability.",
    categories: ["inventory", "logistics"],
    icon: <Package className="h-8 w-8" />,
    features: ["Supply chain mapping", "Bottleneck identification", "Improvement implementation"],
    benefits: ["Reduced lead times", "Cost savings", "Improved reliability"],
    useCases: ["Manufacturing", "Retail", "Distribution"],
  },
  {
    id: 48,
    title: "Warehouse Management",
    description: "Systems and processes to efficiently manage warehouse operations.",
    categories: ["inventory", "operations"],
    icon: <Package className="h-8 w-8" />,
    features: ["Layout optimization", "Picking and packing", "Inventory control"],
    benefits: ["Improved efficiency", "Reduced errors", "Space optimization"],
    useCases: ["Distribution centers", "E-commerce fulfillment", "Manufacturing"],
  },
  {
    id: 49,
    title: "Stock Control Systems",
    description: "Implementation of systems to maintain optimal stock levels and prevent stockouts.",
    categories: ["inventory", "technology"],
    icon: <Package className="h-8 w-8" />,
    features: ["Demand forecasting", "Reorder point calculation", "Inventory valuation"],
    benefits: ["Optimal inventory levels", "Reduced carrying costs", "Improved service levels"],
    useCases: ["Retail", "Wholesale", "Manufacturing"],
  },
  {
    id: 50,
    title: "Graphic Design",
    description: "Professional graphic design services for your brand and marketing materials.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Logo design", "Brand identity", "Marketing collateral"],
    benefits: ["Professional image", "Brand consistency", "Visual communication"],
    useCases: ["Brand development", "Marketing materials", "Digital assets"],
  },
  {
    id: 51,
    title: "Video Production & Editing",
    description: "Professional video production and editing services for marketing and communication.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Concept development", "Production", "Post-production"],
    benefits: ["Engaging content", "Professional presentation", "Brand storytelling"],
    useCases: ["Product demonstrations", "Company profiles", "Training videos"],
  },
  {
    id: 52,
    title: "Photography",
    description: "Professional photography services for your products, team, and facilities.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Product photography", "Corporate portraits", "Location shoots"],
    benefits: ["Professional imagery", "Visual storytelling", "Brand enhancement"],
    useCases: ["Product catalogs", "Website content", "Marketing materials"],
  },
  {
    id: 53,
    title: "Content Creation",
    description: "Creation of engaging content for your website, social media, and marketing campaigns.",
    categories: ["media", "marketing"],
    icon: <Image className="h-8 w-8" />,
    features: ["Copywriting", "Graphic design", "Video production"],
    benefits: ["Audience engagement", "Brand awareness", "Lead generation"],
    useCases: ["Social media", "Websites", "Email marketing"],
  },
  {
    id: 54,
    title: "IVR System Implementation",
    description: "Setup and configuration of Interactive Voice Response systems for efficient call handling.",
    categories: ["communications", "technology"],
    icon: <Phone className="h-8 w-8" />,
    features: ["Call flow design", "Voice recording", "Integration with CRM"],
    benefits: ["Improved call handling", "24/7 availability", "Reduced wait times"],
    useCases: ["Customer service", "Appointment booking", "Information delivery"],
  },
  {
    id: 55,
    title: "Communication Platform Integration",
    description: "Integration of communication platforms with your business systems for streamlined communication.",
    categories: ["communications", "integrations"],
    icon: <Phone className="h-8 w-8" />,
    features: ["Platform selection", "System integration", "User training"],
    benefits: ["Unified communications", "Improved collaboration", "Streamlined workflows"],
    useCases: ["Remote teams", "Customer service", "Sales operations"],
  },
  {
    id: 56,
    title: "Unified Communications",
    description: "Implementation of unified communications systems to integrate voice, video, and messaging.",
    categories: ["communications", "technology"],
    icon: <Phone className="h-8 w-8" />,
    features: ["System design", "Implementation", "User adoption"],
    benefits: ["Streamlined communication", "Improved collaboration", "Cost savings"],
    useCases: ["Distributed teams", "Customer engagement", "Internal communication"],
  },
  {
    id: 57,
    title: "CRM Communication Integration",
    description: "Integration of your communication systems with your CRM for improved customer management.",
    categories: ["communications", "customer-success"],
    icon: <Phone className="h-8 w-8" />,
    features: ["System integration", "Call logging", "Customer data synchronization"],
    benefits: ["Complete customer view", "Improved follow-up", "Enhanced customer experience"],
    useCases: ["Sales teams", "Customer service", "Account management"],
  },
  {
    id: 58,
    title: "Data Warehousing",
    description: "Design and implementation of data warehouses for efficient data storage and analysis.",
    categories: ["data", "technology"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data modeling", "ETL processes", "Query optimization"],
    benefits: ["Centralized data", "Improved analysis", "Historical tracking"],
    useCases: ["Business intelligence", "Reporting", "Data analysis"],
  },
  {
    id: 59,
    title: "Data Analytics",
    description: "Advanced analytics to extract insights from your business data.",
    categories: ["data", "analytics"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data exploration", "Statistical analysis", "Predictive modeling"],
    benefits: ["Data-driven decisions", "Trend identification", "Performance optimization"],
    useCases: ["Marketing analysis", "Operational efficiency", "Customer insights"],
  },
  {
    id: 60,
    title: "Data Tracking Solutions",
    description: "Implementation of systems to track and collect data from various sources.",
    categories: ["data", "analytics"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data collection", "Source integration", "Data validation"],
    benefits: ["Comprehensive data", "Real-time insights", "Improved decision making"],
    useCases: ["Customer behavior", "Operational metrics", "Marketing performance"],
  },
  {
    id: 61,
    title: "Big Data Solutions",
    description: "Solutions for managing and analyzing large volumes of data.",
    categories: ["data", "technology"],
    icon: <Database className="h-8 w-8" />,
    features: ["Data processing", "Distributed computing", "Advanced analytics"],
    benefits: ["Handle large datasets", "Complex analysis", "Scalable infrastructure"],
    useCases: ["Large enterprises", "Data-intensive industries", "Advanced analytics"],
  },
  {
    id: 62,
    title: "System Integration",
    description: "Integration of multiple systems to create a unified and efficient technology ecosystem.",
    categories: ["integrations", "technology"],
    icon: <LinkIcon className="h-8 w-8" />,
    features: ["System analysis", "Integration design", "Implementation"],
    benefits: ["Streamlined operations", "Data consistency", "Improved efficiency"],
    useCases: ["Business applications", "Legacy systems", "Cloud services"],
  },
  {
    id: 63,
    title: "API Integration",
    description: "Integration of third-party APIs to extend the functionality of your systems.",
    categories: ["integrations", "development"],
    icon: <LinkIcon className="h-8 w-8" />,
    features: ["API selection", "Integration development", "Testing and validation"],
    benefits: ["Extended functionality", "Cost-effective solutions", "Rapid implementation"],
    useCases: ["Payment processing", "Shipping", "Social media"],
  },
  {
    id: 64,
    title: "E-commerce Integration",
    description: "Integration of e-commerce platforms with your business systems.",
    categories: ["integrations", "development"],
    icon: <LinkIcon className="h-8 w-8" />,
    features: ["Platform selection", "Data synchronization", "Order management"],
    benefits: ["Streamlined operations", "Accurate inventory", "Improved customer experience"],
    useCases: ["Online stores", "Marketplaces", "Omnichannel retail"],
  },
  {
    id: 65,
    title: "Social Media Integration",
    description: "Integration of social media platforms with your website and marketing systems.",
    categories: ["integrations", "marketing"],
    icon: <LinkIcon className="h-8 w-8" />,
    features: ["Platform connection", "Content sharing", "Analytics integration"],
    benefits: ["Consistent messaging", "Wider reach", "Improved engagement"],
    useCases: ["Content marketing", "Customer engagement", "Brand awareness"],
  },
  {
    id: 66,
    title: "Shipping & Logistics Platforms",
    description: "Implementation of platforms to manage shipping and logistics operations.",
    categories: ["logistics", "operations"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Carrier integration", "Rate shopping", "Shipment tracking"],
    benefits: ["Optimized shipping costs", "Improved delivery times", "Enhanced customer experience"],
    useCases: ["E-commerce", "Distribution", "Manufacturing"],
  },
  {
    id: 67,
    title: "Delivery Management",
    description: "Systems and processes to efficiently manage delivery operations.",
    categories: ["logistics", "operations"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Route optimization", "Delivery tracking", "Customer notifications"],
    benefits: ["Efficient deliveries", "Reduced costs", "Improved customer satisfaction"],
    useCases: ["Last-mile delivery", "Field service", "Food delivery"],
  },
  {
    id: 68,
    title: "Supply Chain Management",
    description: "Comprehensive management of your supply chain from procurement to delivery.",
    categories: ["logistics", "inventory"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Supply chain visibility", "Risk management", "Performance optimization"],
    benefits: ["Improved reliability", "Cost reduction", "Enhanced agility"],
    useCases: ["Manufacturing", "Retail", "Distribution"],
  },
  {
    id: 69,
    title: "Mapping & Routing Solutions",
    description: "Implementation of mapping and routing solutions for efficient transportation.",
    categories: ["logistics", "technology"],
    icon: <Truck className="h-8 w-8" />,
    features: ["Route optimization", "Real-time tracking", "Geofencing"],
    benefits: ["Reduced travel time", "Fuel savings", "Improved service levels"],
    useCases: ["Delivery services", "Field service", "Fleet management"],
  },
]

// Service detail component
const ServiceDetail = ({ service, onClose }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#F8C300]/10 text-[#F8C300]`}
          >
            {service.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Key Features:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#d32927] flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Benefits:</h4>
          <ul className="space-y-2">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#1a3c86] flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Use Cases:</h4>
          <div className="flex flex-wrap gap-2">
            {service.useCases.map((useCase, index) => (
              <Badge key={index} variant="outline" className="bg-white border-gray-200">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-100 mb-6">
          <img
            src={`/placeholder.svg?height=200&width=400&text=${service.title}`}
            alt={`${service.title} visualization`}
            className="w-full h-full object-cover"
          />
        </div>

        <Button variant="default" className="w-full bg-[#D32927] hover:bg-[#D32927]/90 text-white font-medium" asChild>
          <Link href="/meet" className="flex items-center justify-center">
            Book a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

// Number of items per page
const ITEMS_PER_PAGE = 9

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedService, setSelectedService] = useState(null)

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
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE)

  // Get current items
  const currentItems = filteredServices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
      case "ai":
        return "#f8c300"
      case "marketing":
        return "#d32927"
      case "analytics":
        return "#f8c300"
      case "development":
        return "#1a3c86"
      case "cybersecurity":
        return "#000000"
      case "customer-success":
        return "#d32927"
      case "payments":
        return "#f8c300"
      case "training":
        return "#1a3c86"
      case "technology":
        return "#d32927"
      case "automations":
        return "#f8c300"
      case "operations":
        return "#1a3c86"
      case "inventory":
        return "#d32927"
      case "media":
        return "#f8c300"
      case "communications":
        return "#1a3c86"
      case "data":
        return "#d32927"
      case "integrations":
        return "#f8c300"
      case "logistics":
        return "#1a3c86"
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
            Comprehensive digital solutions tailored to meet your business needs and drive growth in New Brunswick.
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
                  <rect x="3" y="3" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#1a3c86" : "#D1D5DB"} />
                  <rect x="14" y="3" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#1a3c86" : "#D1D5DB"} />
                  <rect x="3" y="14" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#1a3c86" : "#D1D5DB"} />
                  <rect x="14" y="14" width="7" height="7" rx="1" fill={viewMode === "grid" ? "#1a3c86" : "#D1D5DB"} />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                aria-label="List view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="2" rx="1" fill={viewMode === "list" ? "#1a3c86" : "#D1D5DB"} />
                  <rect x="3" y="11" width="18" height="2" rx="1" fill={viewMode === "list" ? "#1a3c86" : "#D1D5DB"} />
                  <rect x="3" y="18" width="18" height="2" rx="1" fill={viewMode === "list" ? "#1a3c86" : "#D1D5DB"} />
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
                      ${activeCategory === category.id ? "bg-[#1a3c86] text-white" : "text-gray-700 hover:bg-gray-100"}
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
                              ? "bg-[#1a3c86] text-white"
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
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredServices.length)} of {filteredServices.length} services
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
                    <Dialog key={service.id}>
                      <DialogTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full cursor-pointer"
                        >
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-[#F8C300]/10 text-[#F8C300]`}
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
                                    border-[#D32927]/20 text-[#D32927]
                                  `}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCategoryChange(categoryId)
                                  }}
                                >
                                  {category.name}
                                </Badge>
                              )
                            })}
                          </div>

                          <Button
                            variant="default"
                            className="w-full bg-[#D32927] hover:bg-[#D32927]/90 text-white font-medium"
                            asChild
                          >
                            <Link href="/meet" className="flex items-center justify-center">
                              Book a Free Consultation
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="sr-only">{service.title}</DialogTitle>
                          <DialogDescription className="sr-only">
                            Detailed information about {service.title}
                          </DialogDescription>
                        </DialogHeader>
                        <ServiceDetail service={service} onClose={() => setSelectedService(null)} />
                      </DialogContent>
                    </Dialog>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {currentItems.map((service) => (
                    <Dialog key={service.id}>
                      <DialogTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#F8C300]/10 text-[#F8C300]`}
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
                                        border-[#D32927]/20 text-[#D32927]
                                      `}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleCategoryChange(categoryId)
                                      }}
                                    >
                                      {category.name}
                                    </Badge>
                                  )
                                })}
                              </div>

                              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                                {service.features.slice(0, 3).map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-[#1a3c86]" />
                                    <span className="text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>

                              <Button
                                variant="default"
                                className="w-full bg-[#D32927] hover:bg-[#D32927]/90 text-white font-medium"
                                asChild
                              >
                                <Link href="/meet" className="flex items-center justify-center">
                                  Book a Free Consultation
                                  <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="sr-only">{service.title}</DialogTitle>
                          <DialogDescription className="sr-only">
                            Detailed information about {service.title}
                          </DialogDescription>
                        </DialogHeader>
                        <ServiceDetail service={service} onClose={() => setSelectedService(null)} />
                      </DialogContent>
                    </Dialog>
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
                  className="bg-[#1a3c86] hover:bg-[#1a3c86]/90"
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
                      className={`h-8 w-8 ${currentPage === page ? "bg-[#1a3c86] hover:bg-[#1a3c86]/90" : ""}`}
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

