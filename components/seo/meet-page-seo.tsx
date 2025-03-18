export default function MeetPageSEO() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Business Technology Consultation",
            serviceType: "Business Consultation",
            provider: {
              "@type": "Organization",
              name: "LinkNB Business Solutions",
              url: "https://b2b.linknb.ca",
            },
            areaServed: {
              "@type": "State",
              name: "New Brunswick",
            },
            description:
              "Free consultation for New Brunswick businesses looking to implement digital solutions and business technologies.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "CAD",
              availability: "https://schema.org/InStock",
              url: "https://b2b.linknb.ca/meet",
              validFrom: "2023-01-01",
              priceValidUntil: "2024-12-31",
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
                name: "Business Technology Consultation Booking",
              },
            },
          }),
        }}
      />
    </>
  )
}

