import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Shield, Lock, Eye, Users, Database, AlertCircle, Mail, Phone, Building } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Effective Date: <span className="font-semibold">25/09/2025</span>
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                At <span className="font-semibold text-blue-600">Eion Rides</span>, we value your privacy and are
                committed to protecting your personal data. This Privacy Policy explains how we collect, use, and
                safeguard your information when you use our website, products, and services, including our WhatsApp AI
                Chatbox solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Section 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              <ul className="space-y-3 text-gray-700 ml-16">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>
                    <strong>Personal Information:</strong> Name, email address, phone number, company details, and other
                    information you provide when contacting us or using our services.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>
                    <strong>Usage Data:</strong> Information about how you use our website or chatbox services (e.g., IP
                    address, browser type, pages visited).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>
                    <strong>Chat Data:</strong> Messages and interactions with our AI Chatbox, which may include text
                    you enter, responses generated, and timestamps.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              <ul className="space-y-3 text-gray-700 ml-16">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>To provide and improve our WhatsApp AI Chatbox services.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>To personalize user experience and enhance customer support.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>To send service updates, technical notices, and promotional content (with your consent).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>To ensure security, detect fraud, and comply with legal obligations.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Data Sharing and Disclosure</h2>
              </div>
              <div className="ml-16 space-y-4">
                <p className="text-gray-700">
                  We do <strong>not sell or rent</strong> your personal information to third parties. However, we may
                  share your data with:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>
                      <strong>Trusted service providers</strong> (e.g., hosting providers, analytics tools) who help us
                      operate our services.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>
                      <strong>Legal authorities</strong> when required by law or to protect our rights.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Data Storage and Security</h2>
              </div>
              <ul className="space-y-3 text-gray-700 ml-16">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>Your data is stored securely using industry-standard practices.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>We implement encryption, firewalls, and access controls to safeguard your information.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span>
                    While we strive to protect your data, no system is 100% secure, so we cannot guarantee absolute
                    security.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Your Rights</h2>
              </div>
              <div className="ml-16 space-y-4">
                <p className="text-gray-700">Depending on your location, you may have rights such as:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Accessing, updating, or deleting your personal information.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Opting out of marketing communications.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Requesting a copy of the data we hold about you.</span>
                  </li>
                </ul>
                <p className="text-gray-700">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:support@eionrides.com" className="text-blue-600 font-semibold hover:underline">
                    support@eionrides.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. Cookies and Tracking Technologies</h2>
              </div>
              <div className="ml-16 space-y-4">
                <p className="text-gray-700">We may use cookies and similar tools to:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Improve website performance.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Analyze usage trends.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Customize your experience.</span>
                  </li>
                </ul>
                <p className="text-gray-700">
                  You can disable cookies in your browser settings, but some features may not work properly.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
              <p className="text-gray-700">
                Our website may contain links to third-party sites. We are not responsible for their privacy practices
                and encourage you to review their policies.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Updates to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with a new
                effective date.
              </p>
            </div>

            {/* Section 9 - Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6">9. Contact Us</h2>
              <p className="text-blue-100 mb-6">
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-200" />
                  <div>
                    <p className="text-sm text-blue-200">Email:</p>
                    <a href="mailto:support@eionrides.com" className="font-semibold hover:underline">
                      support@eionrides.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-blue-200" />
                  <div>
                    <p className="text-sm text-blue-200">Phone:</p>
                    <a href="tel:+916232107555" className="font-semibold hover:underline">
                      +91 6232107555
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="w-6 h-6 text-blue-200 mt-1" />
                  <div>
                    <p className="text-sm text-blue-200">Company:</p>
                    <p className="font-semibold">Eion Rides</p>
                    <p className="text-sm text-blue-100 mt-1">
                      2, Adhikari Bhavan, Sharma Compound, Old Nagardas Road,
                      <br />
                      Andheri East, Mumbai-400069
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-sm italic text-blue-100">
                  "I Authorize Eion Rides to send notifications via SMS/RCS/Call/Email/WhatsApp"
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
