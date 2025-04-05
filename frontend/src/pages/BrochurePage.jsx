import BrochureDownload from "../components/BrochureDownload"

const BrochurePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="py-16 bg-gradient-to-r from-[#004466] to-[#006699] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Download our brochures and resources to learn more about our services and how we can help you achieve your
            career goals.
          </p>
        </div>
      </div>

      <BrochureDownload />
    </div>
  )
}

export default BrochurePage

