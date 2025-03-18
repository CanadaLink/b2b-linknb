import Head from "next/head"

interface MetaTagsProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article"
  keywords?: string[]
  noIndex?: boolean
  localBusiness?: boolean
}

export function MetaTags({
  title = "Digital Solutions for NB Businesses | Free Consultation | LinkNB",
  description = "Transform your New Brunswick business with our tailored digital solutions. AI, web development, marketing & more. Book your free consultation today!",
  canonical = "https://b2b.linknb.ca",
  ogImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-b8kxkKw09a0zDhybya5ONAJC62gknC.png",
  ogType = "website",
  keywords = [
    "digital transformation New Brunswick",
    "NB business technology",
    "business solutions NB",
    "digital solutions New Brunswick",
    "web development NB",
    "AI solutions New Brunswick",
    "business growth NB",
    "technology consulting New Brunswick",
    "LinkNB",
    "local digital services",
  ],
  noIndex = false,
  localBusiness = true,
}: MetaTagsProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="LinkNB Business Solutions" />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* Geo Tags for Local Business */}
      {localBusiness && (
        <>
          <meta name="geo.region" content="CA-NB" />
          <meta name="geo.placename" content="New Brunswick" />
          <meta name="geo.position" content="46.5653;-66.4619" />
          <meta name="ICBM" content="46.5653, -66.4619" />
        </>
      )}
    </Head>
  )
}

