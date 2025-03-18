"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/hooks/use-responsive"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isMobile } = useResponsive()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const scrollToSection = (id: string) => {
    closeMenu()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="h-10 flex items-center">
            <span className="font-bold text-xl text-[#1a3c86]">LinkNB</span>
            <span className="ml-1 text-sm text-[#D32927]">Business Solutions</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/#services"
            className="text-gray-700 hover:text-[#1a3c86] font-medium"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("services")
            }}
          >
            Services
          </Link>
          <Link
            href="/#technology"
            className="text-gray-700 hover:text-[#1a3c86] font-medium"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("technology")
            }}
          >
            Technology
          </Link>
          <Link
            href="/#industries"
            className="text-gray-700 hover:text-[#1a3c86] font-medium"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("industries")
            }}
          >
            Industries
          </Link>
          <Link
            href="/meet"
            className="bg-[#1a3c86] hover:bg-[#15306d] text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Book a Consultation
          </Link>
        </nav>

        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="container mx-auto px-4 py-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <div className="h-10 flex items-center">
                <span className="font-bold text-xl text-[#1a3c86]">LinkNB</span>
                <span className="ml-1 text-sm text-[#D32927]">Business Solutions</span>
              </div>
            </Link>
            <button className="text-gray-700 focus:outline-none" onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 text-lg">
            <Link
              href="/#services"
              className="text-gray-700 hover:text-[#1a3c86] font-medium"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("services")
              }}
            >
              Services
            </Link>
            <Link
              href="/#technology"
              className="text-gray-700 hover:text-[#1a3c86] font-medium"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("technology")
              }}
            >
              Technology
            </Link>
            <Link
              href="/#industries"
              className="text-gray-700 hover:text-[#1a3c86] font-medium"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("industries")
              }}
            >
              Industries
            </Link>
          </nav>

          <div className="mt-auto">
            <Link
              href="/meet"
              className="block w-full bg-[#1a3c86] hover:bg-[#15306d] text-white font-medium py-3 px-4 rounded-md text-center transition-colors"
              onClick={closeMenu}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

