import { Check, HelpCircle } from "lucide-react"

function PricingSection() {
  const pricingPlans = [
    {
      name: "Group Session Package",
      price: "5999",
      originalPrice: "11999",
      discount: "50% OFF",
      features: [
        { name: "3 live interactive sessions with industry experts", included: true },
        { name: "Career recommendations for top-performing candidates", included: true },
        { name: "Q&A sessions in each webinar", included: true },
      ],
      isPopular: true,
    },
    {
      name: "One-on-One Expert Mentorship",
      price: "17999",
      features: [
        { name: "Includes the Group Session Package", included: true },
        { name: "Personalized career guidance from an Industry Professional", included: true },
        { name: "Exclusive I-on-I session tailored to your career aspirations", included: true },
      ],
      isPopular: false,
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50" id="prices">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#005577]">PRICING & REGISTRATION</h2>
          <div className="w-24 h-1 bg-[#F5A623] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your career goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.isPopular ? "border-4 border-[#F5A623]" : "border border-gray-200"
              }`}
            >
              {plan.discount && (
                <div className="absolute top-0 right-0 bg-[#F5A623] text-white py-1 px-4 rounded-bl-lg font-semibold text-sm">
                  {plan.discount}
                </div>
              )}
              {/* Card Content */}
              <div className={`p-8 ${plan.isPopular ? "bg-[#005577] text-white" : "bg-white"}`}>
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-center mb-6">{plan.name}</h3>

                {/* Price */}
                <div className="text-center mb-8">
                  {plan.originalPrice ? (
                    <div className="flex items-center justify-center">
                      <span className="text-xl line-through opacity-70 mr-2">INR {plan.originalPrice}/-</span>
                      <span className="text-4xl font-bold">INR {plan.price}/-</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold">INR {plan.price}/-</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-start ${plan.isPopular ? "text-gray-100" : "text-gray-600"}`}
                    >
                      <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-[#F5A623] hover:bg-[#d48c1f] text-white"
                      : "bg-[#005577] hover:bg-[#003355] text-white"
                  }`}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        {/*<div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-[#005577]">Frequently Asked Questions</h3>
          <p className="text-gray-600 mb-4">Have questions? We're here to help!</p>
          <button className="inline-flex items-center text-[#005577] hover:text-[#F5A623] transition-colors duration-300">
            <HelpCircle className="w-5 h-5 mr-2" />
            View FAQ
          </button>
        </div>*/}
      </div>
    </section>
  )
}

export default PricingSection

