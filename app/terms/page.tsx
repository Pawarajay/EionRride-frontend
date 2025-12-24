import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { FileText, Download, Shield, Book, File } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-3 px-0">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-xl lg:text-4xl font-bold text-gray-900 mb-6">
              Terms & <span className="text-blue-600">Conditions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed text-justify justify-items-center p-4">
              At Eion Rides, we are committed to providing transparent and fair terms of service.
              Below you will find our official terms and conditions documents that govern the use
              of our services. Please review these documents carefully before using our platform.
              By using Eion Rides services, you agree to be bound by these terms and conditions.
            </p>
            <div className="relative w-full max-w-4xl mx-auto h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/taxi.webp"
                alt="Eion Rides taxi service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Important <span className="text-blue-600">Documents</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Terms and Conditions Document */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms and Conditions for Riders</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  This document outlines the terms and conditions that apply to all riders using the Eion Rides platform.
                  It includes information about booking rides, payments, cancellations, and user responsibilities.
                </p>
                <Link href="/docs/Terms and Conditions Rider Final.docx" download className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Download Document
                </Link>
              </div>

              {/* Ride Assured Document */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ride Assured Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our Ride Assured document details our commitment to safety, quality service, and 
                  customer satisfaction. Learn about our safety measures and service guarantees.
                </p>
                <Link href="/docs/Ride Assured.docx" download className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Download Document
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Understanding Our <span className="text-blue-600">Terms</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Book className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Clear & Transparent</h3>
                <p className="text-gray-600">
                  Our terms are written in clear, straightforward language to ensure you understand what you're agreeing to.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Safety First</h3>
                <p className="text-gray-600">
                  Our terms reflect our commitment to passenger safety throughout your journey with Eion Rides.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <File className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Regularly Updated</h3>
                <p className="text-gray-600">
                  We regularly review and update our terms to ensure they comply with current laws and best practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Have Questions About Our Terms?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is ready to help clarify any aspects of our terms and conditions.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
