export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LinkNB Business Solutions",
    description: "Comprehensive digital and technology solutions for New Brunswick businesses",
    url: "https://b2b.linknb.ca",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-b8kxkKw09a0zDhybya5ONAJC62gknC.png",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NBFlag-nK7JOu83SneIG5BskpW4pAFrwAFvn2.png",
    address: {
      "@type": "PostalAddress",
      addressRegion: "New Brunswick",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "46.5653",
      longitude: "-66.4619",
    },
    sameAs: [
      "https://facebook.com/LinkNewBrunswick/",
      "https://instagram.com/linknewbrunswick/",
      "https://linkedin.com/company/linknb/",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "$$",
    telephone: "+1-506-555-1234",
    email: "info@linknb.ca",
    areaServed: {
      "@type": "State",
      name: "New Brunswick",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Business Solutions",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "AI Solutions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Chatbots",
                description: "Custom AI chatbots to enhance customer service and automate routine inquiries.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI-Powered Analytics",
                description:
                  "Advanced analytics solutions using AI to extract deeper insights from your business data.",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Web Development",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Website Development",
                description: "Custom website design and development tailored to your business needs.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "E-commerce Solutions",
                description: "Comprehensive e-commerce platforms for online stores and retail businesses.",
              },
            },
          ],
        },
      ],
    },
    keywords:
      "digital transformation, New Brunswick business, business technology, digital solutions, web development, AI solutions, business growth, technology consulting",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function ServiceStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Business Consultation Services",
    provider: {
      "@type": "LocalBusiness",
      name: "LinkNB Business Solutions",
      url: "https://b2b.linknb.ca",
    },
    serviceType: "Business Technology Consultation",
    description:
      "Schedule a free consultation with our experts to discuss how our tailored digital solutions can help your business grow.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      validFrom: "2023-01-01",
    },
    areaServed: {
      "@type": "State",
      name: "New Brunswick",
    },
    serviceOutput: "Customized digital transformation strategy and implementation plan",
    termsOfService: "Free initial consultation with no obligation",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "New Brunswick businesses",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://b2b.linknb.ca/meet",
        inLanguage: "en-CA",
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
      result: {
        "@type": "Reservation",
        name: "Free Digital Transformation Consultation",
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function ToolsStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Technology Stack and Tools",
    description:
      "Comprehensive list of tools and technologies used by LinkNB Business Solutions to deliver digital transformation for New Brunswick businesses",
    url: "https://b2b.linknb.ca/#tools",
    numberOfItems: 20,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: "OpenAI API",
          applicationCategory: "AI & Machine Learning",
          operatingSystem: "Cloud-based",
          description: "API for accessing new AI models developed by OpenAI, including GPT-4 and DALL-E.",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "SoftwareApplication",
          name: "Next.js",
          applicationCategory: "Web Development",
          operatingSystem: "Cross-platform",
          description: "React framework that enables server-side rendering and generating static websites.",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "SoftwareApplication",
          name: "Shopify",
          applicationCategory: "E-Commerce",
          operatingSystem: "Cloud-based",
          description: "E-commerce platform for online stores and retail point-of-sale systems.",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "SoftwareApplication",
          name: "Google Analytics",
          applicationCategory: "Analytics & Data",
          operatingSystem: "Cloud-based",
          description: "Web analytics service that tracks and reports website traffic and user behavior.",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "SoftwareApplication",
          name: "HubSpot",
          applicationCategory: "CRM & Sales",
          operatingSystem: "Cloud-based",
          description: "CRM platform with marketing, sales, service, and operations software.",
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function IndustriesStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Industries Served by LinkNB Business Solutions",
    description:
      "Comprehensive list of industries served by LinkNB Business Solutions with tailored digital transformation solutions",
    url: "https://b2b.linknb.ca/#industries",
    numberOfItems: 10,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Healthcare Solutions",
          description: "Digital solutions for health clinics, dental practices, and wellness centers in New Brunswick.",
          provider: {
            "@type": "LocalBusiness",
            name: "LinkNB Business Solutions",
          },
          serviceType: "Healthcare Technology",
          areaServed: {
            "@type": "State",
            name: "New Brunswick",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Retail Solutions",
          description: "Digital tools for clothing stores, supermarkets, and specialty shops in New Brunswick.",
          provider: {
            "@type": "LocalBusiness",
            name: "LinkNB Business Solutions",
          },
          serviceType: "Retail Technology",
          areaServed: {
            "@type": "State",
            name: "New Brunswick",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Education Solutions",
          description: "Digital platforms for schools, universities, and online learning in New Brunswick.",
          provider: {
            "@type": "LocalBusiness",
            name: "LinkNB Business Solutions",
          },
          serviceType: "Education Technology",
          areaServed: {
            "@type": "State",
            name: "New Brunswick",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "E-Commerce Solutions",
          description: "Digital systems for online marketplaces and digital storefronts in New Brunswick.",
          provider: {
            "@type": "LocalBusiness",
            name: "LinkNB Business Solutions",
          },
          serviceType: "E-Commerce Technology",
          areaServed: {
            "@type": "State",
            name: "New Brunswick",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "Legal Solutions",
          description: "Case management for law firms and legal consultancies in New Brunswick.",
          provider: {
            "@type": "LocalBusiness",
            name: "LinkNB Business Solutions",
          },
          serviceType: "Legal Technology",
          areaServed: {
            "@type": "State",
            name: "New Brunswick",
          },
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function FAQStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What digital services does LinkNB offer to New Brunswick businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LinkNB offers a comprehensive range of digital services including AI solutions, web development, digital marketing, e-commerce platforms, business analytics, and technology consulting tailored specifically for New Brunswick businesses.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book a free consultation with LinkNB?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book a free consultation by visiting our 'Book Free Consultation' page or clicking the consultation button on our homepage. The process is simple and takes just a few minutes to schedule a time that works for you.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does LinkNB serve in New Brunswick?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LinkNB serves a wide range of industries in New Brunswick including healthcare, retail, education, e-commerce, government, legal, logistics, real estate, restaurants, and many more. We tailor our digital solutions to meet the specific needs of each industry.",
        },
      },
      {
        "@type": "Question",
        name: "What is LinkNB's Full Ownership Model?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our Full Ownership Model means that we build and maintain your digital solutions, but you own them completely. Unlike other providers, we don't lock you into ongoing contracts - you get full access and control of your tools, ensuring flexibility, scalability, and long-term independence.",
        },
      },
      {
        "@type": "Question",
        name: "What technology tools does LinkNB use for digital solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "LinkNB utilizes a comprehensive stack of cutting-edge tools including AI platforms like OpenAI, development frameworks like React and Next.js, CRM systems like HubSpot, analytics tools like Google Analytics, and many more specialized technologies tailored to each client's specific needs.",
        },
      },
      {
        "@type": "Question",
        name: "Does LinkNB offer services to businesses outside of New Brunswick?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While we primarily focus on serving New Brunswick businesses with our local expertise, we can also work with clients from other regions. Our digital solutions can be implemented remotely, allowing us to serve businesses beyond our primary service area.",
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function TechnologyStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Technology Stack and Business Applications",
    description:
      "Comprehensive list of technologies and business applications used by LinkNB Business Solutions to deliver digital transformation for New Brunswick businesses",
    url: "https://b2b.linknb.ca/#technology",
    numberOfItems: 100, // Approximate number of technologies
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: "OpenAI API",
          applicationCategory: "AI & Machine Learning",
          operatingSystem: "Cloud-based",
          description: "API for accessing new AI models developed by OpenAI, including GPT-4 and DALL-E.",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "SoftwareApplication",
          name: "Next.js",
          applicationCategory: "Web Development",
          operatingSystem: "Cross-platform",
          description: "React framework that enables server-side rendering and generating static websites.",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "SoftwareApplication",
          name: "Shopify",
          applicationCategory: "E-Commerce",
          operatingSystem: "Cloud-based",
          description: "E-commerce platform for online stores and retail point-of-sale systems.",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "SoftwareApplication",
          name: "HubSpot",
          applicationCategory: "CRM & Sales",
          operatingSystem: "Cloud-based",
          description: "CRM platform with marketing, sales, service, and operations software.",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "SoftwareApplication",
          name: "Google Analytics",
          applicationCategory: "Analytics & Data",
          operatingSystem: "Cloud-based",
          description: "Web analytics service that tracks and reports website traffic and user behavior.",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "SoftwareApplication",
          name: "Microsoft 365",
          applicationCategory: "Productivity",
          operatingSystem: "Cross-platform",
          description: "Subscription service that includes Microsoft Office applications and cloud-based services.",
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "SoftwareApplication",
          name: "Stripe",
          applicationCategory: "Payment Solutions",
          operatingSystem: "Cloud-based",
          description: "Online payment processing for internet businesses, offering a suite of payment APIs.",
        },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

