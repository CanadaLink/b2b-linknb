import { ServiceDisplay } from "./service-display"

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to meet your business needs and drive growth in New Brunswick.
          </p>
        </div>

        <ServiceDisplay />
      </div>
    </section>
  )
}

