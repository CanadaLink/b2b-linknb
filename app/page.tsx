import { Hero, CallToAction } from "@/components/page-sections"
import Services from "@/components/services"
import Benefits from "@/components/benefits"
import Industries from "@/components/industries"
import TechnologySection from "@/components/technology-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import {
  LocalBusinessStructuredData,
  FAQStructuredData,
  ToolsStructuredData,
  IndustriesStructuredData,
  BreadcrumbStructuredData,
  TechnologyStructuredData,
} from "@/components/structured-data"
import HomeMeta from "@/components/seo/home-meta"

export default function Home() {
  return (
    <>
      <HomeMeta />
      <LocalBusinessStructuredData />
      <FAQStructuredData />
      <ToolsStructuredData />
      <IndustriesStructuredData />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "https://b2b.linknb.ca" }]} />
      <TechnologyStructuredData />
      <Header />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <Services />
        <TechnologySection />
        <Industries />
        <Benefits />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

