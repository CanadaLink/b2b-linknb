interface GlobalSEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: "website" | "article"
  twitterCard?: "summary" | "summary_large_image"
}

export default function GlobalSEO({
  title = "LinkNB Business Solutions | Digital Solutions for New Brunswick Businesses",
  description = "LinkNB Business Solutions provides comprehensive digital solutions, technology implementation, and business applications for New Brunswick businesses.",
  canonicalUrl = "https://b2b.linknb.ca",
  ogImage = "https://b2b.linknb.ca/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
}: GlobalSEOProps) {
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

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LinkNB Business Solutions",
    url: baseUrl,
    description:
      "Empowering businesses and providing digitalization services and business solutions across New Brunswick.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "LinkNB",
      url: mainDomain,
    },
  }

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${baseUrl}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Technology",
        item: `${baseUrl}/#technology`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Industries",
        item: `${baseUrl}/#industries`,
      },
    ],
  }

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="LinkNB Business Solutions" />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Mobile theme color */}
      <meta name="theme-color" content="#1a3c86" />

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Additional SEO meta tags */}
      <meta name="author" content="LinkNB Business Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta name="format-detection" content="telephone=no" />
      <meta
        name="keywords"
        content="New Brunswick business solutions, digital transformation, business technology, NB tech services, Saint John business services, Fredericton business technology, Moncton digital solutions, New Brunswick IT services, business applications, technology implementation"
      />
    </>
  )
}

