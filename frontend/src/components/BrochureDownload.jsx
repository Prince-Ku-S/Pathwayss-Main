"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Check, Loader } from "lucide-react"

const BrochureDownload = () => {
  const [downloadState, setDownloadState] = useState("idle") // idle, loading, success, error

  const handleDownload = () => {
    setDownloadState("loading")

    // Simulate a small delay for better user feedback
    setTimeout(() => {
      try {
        // Trigger the download
        const brochureUrl = "/brochures/pathwayss-career-services.pdf" // Update with your actual PDF path

        // Create a temporary link element to trigger the download
        const link = document.createElement("a")
        link.href = brochureUrl
        link.setAttribute("download", "Pathwayss-Career-Services-Brochure.pdf")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setDownloadState("success")

        // Reset state after successful download
        setTimeout(() => {
          setDownloadState("idle")
        }, 3000)
      } catch (error) {
        console.error("Download error:", error)
        setDownloadState("error")

        // Reset state after error
        setTimeout(() => {
          setDownloadState("idle")
        }, 3000)
      }
    }, 800)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-[#005577] to-[#003355] p-12 text-white">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Download Our Career Services Brochure
            </motion.h2>
            <motion.p
              className="text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get detailed information about our services, success stories, and how we can help you achieve your career
              goals.
            </motion.p>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                className="relative w-full md:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative w-full h-64 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold">Pathwayss Career Services</h3>
                    <p className="text-gray-300 text-sm">Complete Guide (PDF, 4.2 MB)</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-[#F5A623] mr-3 mt-1 flex-shrink-0" />
                    <p>Comprehensive overview of all our services</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-[#F5A623] mr-3 mt-1 flex-shrink-0" />
                    <p>Success stories from our students</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-[#F5A623] mr-3 mt-1 flex-shrink-0" />
                    <p>Pricing and package information</p>
                  </div>
                </div>

                <motion.button
                  className="bg-[#F5A623] text-[#005577] font-bold py-4 px-8 rounded-full hover:bg-white transition-colors duration-300 flex items-center shadow-lg w-full justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                >
                  {downloadState === "loading" ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Downloading...
                    </>
                  ) : downloadState === "success" ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Downloaded Successfully!
                    </>
                  ) : downloadState === "error" ? (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Try Again
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Brochure
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BrochureDownload

