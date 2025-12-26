// "use client";

// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import { CheckCircle, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Script from "next/script";
// import { Mail, Phone } from "lucide-react";

// export default function ThankYouPage() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       <Script id="conversion-event" strategy="afterInteractive">
//         {`
//           gtag('event', 'conversion', {
//             'send_to': 'AW-17631308778/Ilu-CP3Pw6obEOrXoddB',
//             'value': 1.0,
//             'currency': 'INR'
//           });
//         `}
//       </Script>

//       <Navbar />

//       <main className="pt-20 px-4">
//         {/* Core confirmation block */}
//         <section className="py-16">
//           <div
//             className={`max-w-xl mx-auto transition-all duration-700 ${
//               isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
//             }`}
//           >
//             <div className="mb-6 flex justify-start">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-30" />
//                 <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
//                   <CheckCircle className="w-10 h-10 text-white" />
//                 </div>
//               </div>
//             </div>

//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-left">
//             Thank you, your booking has been confirmed
//             </h1>
//             {/* <p className="text-gray-600 text-sm md:text-base mb-6 text-left max-w-lg">
//               A confirmation has been registered with our team. You will receive your ride details and updates shortly on your registered contact.
//             </p> */}

//             <div className="flex flex-col sm:flex-row gap-3">
//               <Link href="/">
//                 <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
//                   Back to home
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </button>
//               </Link>
//               <Link href="/#booking">
//                 <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors">
//                   Make another booking
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Support strip */}
//         <section className="py-10">
//           <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-3 text-left">
//               Need help with this booking?
//             </h2>
//             <p className="text-sm text-gray-600 mb-4 text-left">
//               Our support team is available 24/7 if you have any questions or need to make changes.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <a href="tel:+916232107555" className="w-full sm:w-auto">
//                 <button className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
//                   <Phone className="w-4 h-4 mr-2" />
//                   Call support: +91 62321 07555
//                 </button>
//               </a>
//               <a href="mailto:support@eionrides.com" className="w-full sm:w-auto">
//                 <button className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
//                   <Mail className="w-4 h-4 mr-2" />
//                   Email support
//                 </button>
//               </a>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }


//testing 26-12-2025




"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CheckCircle, ArrowRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function ThankYouPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <Script id="conversion-event" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17631308778/Ilu-CP3Pw6obEOrXoddB',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>

      <Navbar />

      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        {/* Core confirmation block */}
        <section className="py-12 sm:py-16">
          <div
            className={`max-w-xl mx-auto transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="mb-6 flex justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-30" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-left leading-tight">
              Thank you, your booking has been confirmed
            </h1>

            <p className="text-gray-600 text-sm md:text-base mb-6 text-left">
              A confirmation has been registered with the team. You will receive
              ride details and updates shortly on your registered contact.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/">
                <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Back to home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
              <Link href="/#booking">
                <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 transition-colors">
                  Make another booking
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Support strip */}
        <section className="pb-12 sm:pb-16">
          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-7">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 text-left">
              Need help with this booking?
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-left">
              Support is available 24/7 if you have questions or need to make
              changes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+916232107555" className="w-full sm:w-auto">
                <button className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                  <Phone className="w-4 h-4 mr-2" />
                  Call support: +91 62321 07555
                </button>
              </a>
              <a href="mailto:support@eionrides.com" className="w-full sm:w-auto">
                <button className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  Email support
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
