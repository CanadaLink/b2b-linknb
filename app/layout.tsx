import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import ViewportHandler from "@/components/viewport-handler"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "LinkNB Business Solutions | Digital Solutions for New Brunswick Businesses",
    template: "%s | LinkNB Business Solutions",
  },
  description:
    "Empowering businesses and providing digitalization services and business solutions across New Brunswick.",
  keywords: [
    "New Brunswick",
    "business solutions",
    "digital transformation",
    "web development",
    "digital marketing",
    "technology consulting",
    "business applications",
    "digitalization services",
  ],
  authors: [{ name: "LinkNB Business Solutions" }],
  creator: "LinkNB Business Solutions",
  publisher: "LinkNB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://b2b.linknb.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LinkNB Business Solutions | Digital Solutions for New Brunswick Businesses",
    description:
      "Empowering businesses and providing digitalization services and business solutions across New Brunswick.",
    url: "https://b2b.linknb.ca",
    siteName: "LinkNB Business Solutions",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkNB Business Solutions | Digital Solutions for New Brunswick Businesses",
    description:
      "Empowering businesses and providing digitalization services and business solutions across New Brunswick.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Base URL for the website
  const baseUrl = "https://b2b.linknb.ca"
  const mainDomain = "https://linknb.ca"

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LinkNB",
    url: mainDomain,
    logo: `${mainDomain}/logo.png`,
    slogan: "Connecting New Brunswick",
    description: "LinkNB connects New Brunswick residents and empowers businesses through digital solutions.",
    sameAs: [
      "https://facebook.com/LinkNewBrunswick/",
      "https://instagram.com/linknewbrunswick/",
      "https://linkedin.com/company/linknb/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-506-999-0765",
      contactType: "customer service",
      areaServed: "New Brunswick",
      availableLanguage: ["English", "French"],
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "New Brunswick",
      addressCountry: "CA",
    },
    subOrganization: {
      "@type": "Organization",
      name: "LinkNB Business Solutions",
      url: baseUrl,
      description:
        "Empowering businesses and providing digitalization services and business solutions across New Brunswick.",
      parentOrganization: {
        "@type": "Organization",
        name: "LinkNB",
        url: mainDomain,
      },
    },
  }

  // Structured data for local business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LinkNB Business Solutions",
    image: `${baseUrl}/logo.png`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: "+1-506-999-0765",
    priceRange: "$$",
    description:
      "Empowering businesses and providing digitalization services and business solutions across New Brunswick.",
    slogan: "Digital Solutions for New Brunswick Businesses",
    address: {
      "@type": "PostalAddress",
      addressRegion: "New Brunswick",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.9636,
      longitude: -66.6431,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://facebook.com/LinkNewBrunswick/",
      "https://instagram.com/linknewbrunswick/",
      "https://linkedin.com/company/linknb/",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "LinkNB",
      url: mainDomain,
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ViewportHandler />
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 pt-16">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'