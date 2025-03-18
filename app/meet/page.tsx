import type { Metadata } from "next"
import MeetingScheduler from "@/components/meeting-scheduler"
import ErrorBoundary from "@/components/error-boundary"
import ResponsiveContainer from "@/components/responsive-container"
import MeetMeta from "@/components/seo/meet-meta"
import MeetPageSEO from "@/components/seo/meet-page-seo"

export const metadata: Metadata = {
  title: "Book a Consultation | LinkNB Business Solutions",
  description:
    "Schedule a free consultation with our team to discuss how we can help your New Brunswick business succeed in the digital landscape.",
  openGraph: {
    title: "Book a Consultation | LinkNB Business Solutions",
    description:
      "Schedule a free consultation with our team to discuss how we can help your New Brunswick business succeed in the digital landscape.",
    url: "https://b2b.linknb.ca/meet",
    siteName: "LinkNB Business Solutions",
    locale: "en_CA",
    type: "website",
  },
}

export default function MeetPage() {
  return (
    <main className="flex-1">
      <MeetPageSEO />
      <MeetMeta />
      <ResponsiveContainer className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Consultation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Schedule a free consultation with our team to discuss how we can help your New Brunswick business succeed
              in the digital landscape.
            </p>
          </div>

          <ErrorBoundary>
            <MeetingScheduler />
          </ErrorBoundary>
        </div>
      </ResponsiveContainer>
    </main>
  )
}

