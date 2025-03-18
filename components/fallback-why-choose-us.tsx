export default function FallbackWhyChooseUs() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We deliver comprehensive solutions that drive real business results for New Brunswick businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2">Key Benefit {i + 1}</h3>
              <p className="text-gray-600">
                We provide exceptional service and solutions tailored to your business needs.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

