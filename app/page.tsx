// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import BookingInterface from "@/components/booking-interface"
// import Image from "next/image"
// import {
//   MapPin,
//   Star,
//   CreditCard,
//   Play,
//   Apple,
//   Phone,
//   Mail,
//   User,
//   Car,
//   Clock,
//   ArrowRight,
//   CheckCircle,
//   MessageCircle,
//   Navigation,
//   Smartphone,
//   Zap,
//   Shield,
//   Heart,
//   TrendingUp,
//   Sparkles,
// } from "lucide-react"
// import { Description } from "@radix-ui/react-toast"

// const screens = [
//   "/screen-logo.jpg",
//   "/screen-booking.jpg",
//   "/screenshot-3.jpg",
//   "/screenshot-4.jpg",
//   "/screenshot-5.jpg",
//   "/screenshot-6.jpg",
//   "/screenshot-7.jpg",
//   "/screenshot-8.jpg"
// ]

// export default function InDrivePage() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [isBookingOpen, setIsBookingOpen] = useState(false)
//   const [selectedVehicle, setSelectedVehicle] = useState("")
//   const [animatedStats, setAnimatedStats] = useState({ drivers: 0, waitTime: 0, rides: 0 })
//   const [isVisible, setIsVisible] = useState(false)
//   type FloatingElement = { id: number; x: number; y: number; delay: number; size: number; opacity: number }
//   const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
//   const [currentTestimonial, setCurrentTestimonial] = useState(0)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const generateFloatingElements = () =>
//     Array.from({ length: 12 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       delay: Math.random() * 4,
//       size: Math.random() * 30 + 10, // Made them a bit larger
//       opacity: Math.random() * 0.2 + 0.05,
//     }))


//   useEffect(() => {
//     setIsVisible(true)

//     const timer = setTimeout(() => {
//       const interval = setInterval(() => {
//         setAnimatedStats((prev) => ({
//           drivers: prev.drivers < 2254 ? prev.drivers + 23 : 2254,
//           waitTime: prev.waitTime < 3.2 ? Math.min(prev.waitTime + 0.1, 3.2) : 3.2,
//           rides: prev.rides < 7743 ? prev.rides + 87 : 7743,
//         }))
//       }, 30)

//       setTimeout(() => clearInterval(interval), 3000)
//     }, 800)

//     const elements = Array.from({ length: 12 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       delay: Math.random() * 4,
//       size: Math.random() * 3 + 1,
//       opacity: Math.random() * 0.3 + 0.1,
//     }))
//     setFloatingElements(elements)

//     const testimonialInterval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % 3)
//     }, 4000)

//     return () => {
//       clearTimeout(timer)
//       clearInterval(testimonialInterval)
//     }
//   }, [])

//   const bookingSteps = [
//     {
//       title: "Set Pickup Location", icon: MapPin,
//       description: "Enter your pickup point or use GPS to auto-detect your location."
//     },
//     {
//       title: "Choose Destination",
//       description: "Type your drop-off address or select from recent locations.", icon: Navigation
//     },
//     {
//       title: "Select Vehicle Type",
//       description: " Pick from Mini, Sedan, SUV, MUV, or Luxury cars — based on your need", icon: Car
//     },
//     {
//       title: "Set Your Fare",
//       description: "Decide your price. Drivers compete for your trip, ensuring fair rides.", icon: CreditCard
//     },
//     {
//       title: "Confirm Booking",
//       description: "Get instant ride confirmation with driver & vehicle details.", icon: CheckCircle
//     },
//   ]

//   const benefits = [
//     {
//       title: "Fair & Transparent Pricing",
//       description:
//         "No surge charges – you set the fare and drivers compete for your ride.",
//     },
//     {
//       title: "Verified Drivers",
//       description:
//         "All drivers are trained, experienced, and background-checked for safety.",
//     },
//     {
//       title: "Fast Pickups",
//       description:
//         "Average wait time of just a few minutes across Mumbai’s busiest areas.",
//     },
//     {
//       title: "Wide Fleet Options",
//       description:
//         "Choose from Mini, Sedan, SUV, MUV, or Luxury cars depending on your travel need.",
//     },
//     {
//       title: "Multiple Ride Types",
//       description:
//         "Local Flexi rides, hourly/daily rentals, airport transfers, and outstation trips.",
//     },
//     {
//       title: "24x7 Availability",
//       description: "Reliable cab booking in Mumbai, anytime you need.",
//     },
//     {
//       title: "Tech + Human Support",
//       description:
//         "Live tracking, digital payments, and a call-centre to assist.",
//     },
//   ];

//   const vehicleTypes = [
//     {
//       id: "Mini",
//       name: "Mini",
//       image: "/swift.jpg",
//       desc: "Quick & economical",
//     },
//     {
//       id: "Sedan",
//       name: "Sedan",
//       image: "/economy.jpg",
//       desc: "Affordable rides",
//     },
//     {
//       id: "SUV",
//       name: "SUV",
//       image: "/SUV.jpg",
//       desc: "Premium experience",
//     },
//   ]

//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       role: "Marketing Executive",
//       rating: 5,
//       review: "Game changer! I save ₹200+ daily with fair pricing. No more surge pricing stress!",
//       avatar: "/user-avatar-female.jpg",
//     },
//     {
//       name: "Rahul Mehta",
//       role: "Software Engineer",
//       rating: 5,
//       review: "Reliable and safe. The driver verification gives me complete peace of mind.",
//       avatar: "/user-avatar-female.jpg",
//     },
//     {
//       name: "Anjali Patel",
//       role: "Doctor",
//       rating: 5,
//       review: "Perfect for my night shifts. Always find a ride, even at 3 AM!",
//       avatar: "/user-avatar-female.jpg",
//     },
//   ]
//   useEffect(() => {
//     setIsVisible(true)
//     setFloatingElements(generateFloatingElements())
//   }, [])

//   useEffect(() => {
//     // Set up an interval to change the screen every 3 seconds
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % screens.length)
//     }, 3000)

//     // Clear the interval when the component unmounts
//     return () => clearInterval(interval)
//   }, [])

//   // This function determines the style of each slide based on its position
//   const getSlideStyle = (index: number) => {
//     // Current (center) slide
//     if (index === currentIndex) {
//       return {
//         transform: "translateX(0) scale(1)",
//         opacity: 1,
//         zIndex: 10,
//       }
//     }

//     // Previous slide (to the left)
//     const prevIndex = (currentIndex - 1 + screens.length) % screens.length
//     if (index === prevIndex) {
//       return {
//         transform: "translateX(-50%) scale(0.8)",
//         opacity: 0.7,
//         zIndex: 5,
//       }
//     }

//     // Next slide (to the right)
//     const nextIndex = (currentIndex + 1) % screens.length
//     if (index === nextIndex) {
//       return {
//         transform: "translateX(50%) scale(0.8)",
//         opacity: 0.7,
//         zIndex: 5,
//       }
//     }

//     // Other hidden slides
//     return {
//       transform: "scale(0.7)",
//       opacity: 0,
//       zIndex: 0,
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       <Navbar />
//       <section
//         id="booking"
//         className="relative lg:min-h-screen flex lg:items-center lg:py-20 lg:px-4 overflow-hidden isolate"
//       >
//         {/* LAYER 1: The Background Image (Now it will be visible) */}
//         <div className="absolute inset-0 w-full h-full z-[-2]">
//           <img
//             src="/heroimage1.png"
//             alt="A modern cab on a city street at dusk"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* LAYER 2: Dark Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-[-1]" />

//         {/* Floating Bubbles */}
//         <div className="absolute inset-0 overflow-hidden z-[-1]">
//           {floatingElements.map((element) => (
//             <div
//               key={element.id}
//               className="absolute bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
//               style={{
//                 left: `${element.x}%`,
//                 top: `${element.y}%`,
//                 width: `${element.size}px`,
//                 height: `${element.size}px`,
//                 opacity: element.opacity,
//                 animation: `float 8s ease-in-out infinite ${element.delay}s, pulse 4s ease-in-out infinite ${element.delay * 0.5}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* LAYER 3: Main Content Container (This part was already correct) */}
//         <div className="relative z-10 max-w-7xl mx-auto w-full">
//           <div
//             className={`w-full transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}
      
//       // DESKTOP STYLES (lg and up)
//       lg:max-w-xl lg:bg-black/20 lg:backdrop-blur-lg lg:p-8 lg:rounded-2xl lg:border lg:border-white/20 lg:shadow-2xl`
//             }
//           >
//             {/* On mobile, this h1 needs its own padding. On desktop, the parent provides it. */}
//             <h1 className="text-xl lg:text-4xl font-bold mb-6 leading-tight text-white px-6 pt-10 lg:p-0 text-justify">
//               Your Ride, Just a Tap Away
//             </h1>
//             <BookingInterface />
//           </div>

//         </div>


//         <style jsx>{`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px) rotate(0deg); }
//             50% { transform: translateY(-30px) rotate(180deg); }
//           }
//           @keyframes pulse {
//             0%, 100% { opacity: 0.1; }
//             50% { opacity: 0.3; }
//           }
//         `}</style>
//       </section>

//      <section className="py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
//   <div className="max-w-7xl mx-auto">
//     {/* Heading + intro, left-aligned */}
//     <div className="mb-10">
//       <h2 className="text-xl lg:text-4xl font-bold mb-4 text-gray-900">
//         Cab & taxi services in{" "}
//         <span className="text-blue-600">Mumbai, Pune & Bhopal</span>
//       </h2>
//       <p className="text-gray-600 text-base lg:text-lg max-w-3xl text-justify">
//         Eion Rides offers safe, reliable, and affordable cabs across major
//         Indian cities. Whether it’s daily office travel, airport transfers,
//         or weekend getaways, our cab booking services in Mumbai, Pune, and
//         Bhopal are designed for comfort and convenience.
//       </p>
//     </div>

//     {/* City cards: image left, text right */}
//     <div className="space-y-6">
//       {/* Mumbai */}
//       <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         <img
//           src="/mumbai-gateway-of-india.webp"
//           alt="Gateway of India, Mumbai"
//           className="w-full md:w-64 h-44 md:h-40 object-cover rounded-2xl flex-shrink-0"
//         />
//         <div className="flex-1">
//           <h3 className="text-2xl font-bold mb-1 text-gray-900">Mumbai</h3>
//           <p className="text-sm font-semibold text-blue-600 mb-2">
//             Taxi & cab services in Mumbai – local & outstation
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             Serving popular locations like Andheri, Bandra, Colaba, Dadar,
//             Goregaon, Juhu and more.
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             Book airport cabs, office commute rides, outstation taxis, or
//             hourly rentals in Mumbai.
//           </p>
//           <p className="text-sm font-semibold text-gray-900">
//             More areas coming soon…
//           </p>
//         </div>
//       </div>

//       {/* Pune */}
//       <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         <img
//           src="/pune-shaniwar-wada.jpeg"
//           alt="Shaniwar Wada, Pune"
//           className="w-full md:w-64 h-44 md:h-40 object-cover rounded-2xl flex-shrink-0"
//         />
//         <div className="flex-1">
//           <h3 className="text-2xl font-bold mb-1 text-gray-900">Pune</h3>
//           <p className="text-sm font-semibold text-green-600 mb-2">
//             Affordable cab booking in Pune – local & outstation
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             Available in Koregaon Park, Baner, Wakad, Hinjewadi, Kothrud,
//             Deccan and more.
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             Choose daily rentals, Pune airport taxis, corporate travel, or
//             weekend getaways with Eion Rides.
//           </p>
//           <p className="text-sm font-semibold text-gray-900">
//             More areas coming soon…
//           </p>
//         </div>
//       </div>

//       {/* Bhopal */}
//       <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         <img
//           src="/bhopal-upper-lake.jpg"
//           alt="Upper Lake, Bhopal"
//           className="w-full md:w-64 h-44 md:h-40 object-cover rounded-2xl flex-shrink-0"
//         />
//         <div className="flex-1">
//           <h3 className="text-2xl font-bold mb-1 text-gray-900">Bhopal</h3>
//           <p className="text-sm font-semibold text-purple-600 mb-2">
//             Trusted taxi service in Bhopal – city & beyond
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             Now serving New Market, MP Nagar, Arera Colony, Kolar,
//             Shahpura, Habibganj and more.
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             Book affordable local rides, Bhopal airport transfers, and
//             outstation taxis with ease.
//           </p>
//           <p className="text-sm font-semibold text-gray-900">
//             More areas coming soon…
//           </p>
//         </div>
//       </div>
//     </div>

//     {/* CTA */}
//     <div className="mt-10 flex justify-start">
//       <a href="/#booking">
//         <button className="inline-flex items-center bg-blue-600 text-white text-sm lg:text-base font-semibold rounded-full px-6 py-3 hover:bg-blue-700 transition-colors">
//           <MapPin className="w-4 h-4 mr-2" />
//           Book your ride to any destination with Eion Rides
//         </button>
//       </a>
//     </div>
//   </div>
// </section>


//       <section
//         // --- CHANGES START HERE ---
//         className="relative py-20 px-4 border-b border-white/10 isolate overflow-hidden" // 1. Added relative, isolate, overflow-hidden and changed border color
//       // --- CHANGES END HERE ---
//       >
//         {/* LAYER 1: The Background Image */}
//         <div className="absolute inset-0 w-full h-full z-[-2]">
//           <img
//             src="/secondpageimage.jpg" // <-- IMPORTANT: Replace with your actual image file name
//             alt="Abstract city lights or a relevant background"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* LAYER 2: Dark Overlay for Readability */}
//         <div className="absolute inset-0 bg-black/70 z-[-1]" />

//         {/* LAYER 3: Main Content (Brought to the front) */}
//         <div className="relative z-10 max-w-7xl mx-auto text-center">

//           {/* Badge updated for dark background */}
//           <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
//             <TrendingUp className="w-5 h-5 text-cyan-400 mr-2" />
//             <span className="text-white font-semibold">India’s Trusted & Fastest Growing Ride Platform</span>
//           </div>

//           {/* Text colors updated for dark background */}
//           <h2 className="text-xl lg:text-4xl font-bold mb-4 text-white">
//             Why Riders in Mumbai, Pune & Bhopal Trust <span className="text-blue-600">"Eion Rides"</span>?
//           </h2>
//           <p className="text-gray-300 mb-12 text-lg max-w-2xl mx-auto text-justify">
//             Thousands of riders rely on Eion Rides for safe, reliable, and affordable cab booking services. Whether it’s daily office commute, airport transfers, or outstation trips, we make every ride fast and hassle-free.
//           </p>

//           <div className="grid md:grid-cols-3 gap-8 mt-12">
//             {[
//               {
//                 value: animatedStats.drivers,
//                 label: "Verified Drivers Online",
//                 description: "Experienced, trained, and background-checked drivers ready to serve you.",
//                 icon: Car,
//                 color: "text-blue-600",
//                 bgColor: "bg-blue-600/10",
//                 suffix: "+",
//               },
//               {
//                 value: animatedStats.waitTime,
//                 label: "Average Wait Time",
//                 description: "Quick pickups across Mumbai, Pune & Bhopal — skip the long waits.",
//                 icon: Clock,
//                 color: "text-indigo-600",
//                 bgColor: "bg-indigo-500/10",
//                 suffix: " min",
//               },
//               {
//                 value: animatedStats.rides,
//                 label: "Happy Rides Completed",
//                 description: "Thousands of riders trust us for comfort, safety & transparent pricing.",
//                 icon: CheckCircle,
//                 color: "text-purple-600",
//                 bgColor: "bg-purple-500/10",
//                 suffix: "+",
//               },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200"
//               >
//                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 mx-auto">
//                   <stat.icon className={`w-8 h-8 ${stat.color}`} />
//                 </div>
//                 <div className={`text-5xl font-bold ${stat.color} mb-2`}>
//                   {typeof stat.value === "number" && stat.value % 1 !== 0
//                     ? stat.value.toFixed(1)
//                     : Math.floor(stat.value)}
//                   {stat.suffix}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</h3>
//                 <p className="text-gray-600 font-medium text-justify">{stat.description}</p>
//               </div>
//             ))}

//           </div>
//         </div>
//       </section>

//          {/* Fair Prices Section */}
//       <section className="bg-blue-50 text-blue-600 py-12 px-4">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-xl lg:text-4xl font-bold mb-2 text-left">
//               Smart Cab Rides in India
//             </h2>
//             <p className="text-base lg:text-xl font-semibold text-blue-700 mb-6 text-left">
//               Fair prices, no surprises.
//             </p>

//             <p className="text-black mb-4 text-sm lg:text-base text-justify">
//               In today’s crowded cities, parking, car maintenance, and unreliable rides waste time and energy. Eion Rides solves this with on-demand bookings, professional drivers, and real-time technology to keep your travel smooth and predictable.
//             </p>
//             <p className="text-black mb-6 text-sm lg:text-base text-justify">
//               More than just a cab service, Eion Rides is built on safety, trust, and transparent pricing, so every city commute, airport transfer, or outstation ride feels simple and stress-free.
//             </p>

//             <div className="space-y-3">
//               <div className="flex items-start space-x-3">
//                 <div className="mt-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base text-blue-700">
//                   You set the fare – pay what feels fair with no hidden costs.
//                 </span>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="mt-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base text-blue-700">
//                   Drivers compete for your trip, improving availability and response time.
//                 </span>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="mt-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base text-blue-700">
//                   No surge pricing – enjoy consistent, fair prices during peak and off-peak hours.
//                 </span>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="mt-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base text-blue-700">
//                   Flexible ride options – local city rides, airport transfers, rentals, and outstation.
//                 </span>
//               </div>

//               <div className="flex items-start space-x-3">
//                 <div className="mt-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs">✓</span>
//                 </div>
//                 <span className="text-sm lg:text-base text-blue-700">
//                   Tech-enabled and human-backed – live tracking, digital payments, and 24x7 support.
//                 </span>
//               </div>

//               <p className="text-sm lg:text-base text-blue-700 mt-4 text-left">
//                 This isn’t just another cab service — it’s a promise of smarter, fairer, and more accessible travel for everyone.
//               </p>
//             </div>
//           </div>

//           <div>
//             <img
//               src="/taxi.webp"
//               alt="Taxi in Mumbai"
//               className="rounded-lg w-full object-cover"
//             />
//           </div>
//         </div>

//         <a href="/#booking" className="flex justify-center">
//           <button className="font-semibold text-white mt-10 bg-blue-700 px-4 py-2 lg:px-8 lg:py-3 rounded-full text-xs lg:text-lg">
//             Eion Rides – Your Route, Our Responsibility.
//           </button>
//         </a>
//       </section>

//       {/* Vehicle Types */}
//       <section className="bg-blue-50 py-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-xl lg:text-4xl font-bold text-center mb-4">
//             Eion Rides offers a variety of
//             <br className="hidden md:block" />
//             <span className="block md:inline"> transport options</span>
//           </h2>
//           <p className="text-gray-600 text-sm lg:text-base text-center max-w-2xl mx-auto mb-10">
//             Choose the right cab category for your trip — from everyday city rides to more spacious options for family travel or airport runs.
//           </p>

//           <div className="grid md:grid-cols-3 gap-8 mt-6">
//             {vehicleTypes.map((vehicle) => (
//               <Card
//                 key={vehicle.id}
//                 className="p-6 text-left shadow-sm hover:shadow-lg transition-shadow"
//               >
//                 <CardContent className="p-0">
//                   <img
//                     src={vehicle.image || "/placeholder.svg"}
//                     alt={vehicle.name}
//                     className="w-full h-48 object-cover mb-4 rounded-lg"
//                   />
//                   <h3 className="text-lg lg:text-xl font-bold mb-1">
//                     {vehicle.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm lg:text-base mt-2">
//                     {vehicle.desc}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>


//       <section
//         id="download"
//         className="bg-blue-50 text-gray-900 py-20 px-4 relative overflow-hidden"
//       >
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
//           <div>
//             <div className="flex items-center space-x-3 mb-6">
//               <a href="/" className="flex items-center gap-2">
//                 <img
//                   src="/logo.png"   // <-- replace with your logo path
//                   alt="Eion Rides Logo"
//                   className="h-16 w-auto"
//                 />
//               </a>
//             </div>
//             <h2 className="text-xl lg:text-4xl font-bold  leading-tight">
//               Download the
//               <br />
//               <span className="text-blue-600">
//                 Eion Rides app
//               </span>
//             </h2>
//             <h3 className="mb-4">–
//               Your Cab, Anytime, Anywhere</h3>
//             <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//               Hassle-free cab booking, available 24/7 on all platforms.            </p>
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <a
//                 href="https://play.google.com/store/apps/details?id=com.isoftinc.eion_customer"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block transition-transform hover:scale-105"
//               >
//                 <img
//                   src="/playstore.png"
//                   alt="Get it on Google Play"
//                   className="h-16 w-48 object-contain"
//                 />
//               </a>
//               <a
//                 href="https://apps.apple.com/us/app/eion-rides/id6747707285"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block transition-transform hover:scale-105"
//               >
//                 <img
//                   src="/appstore.png"
//                   alt="Download on the App Store"
//                   className="h-16 w-48 object-contain"
//                 />
//               </a>
//             </div>


//             <div className="flex items-center space-x-6 mt-8 text-sm text-gray-500">
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 <span>Free Download</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 <span>No Hidden Fees</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 <span>24/7 Support</span>
//               </div>
//             </div>
//           </div>
//           <div className="relative">
//             <div className="relative w-full h-96 md:h-[500px]">
//               {screens.map((src, index) => (
//                 <div
//                   key={src}
//                   className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
//                   style={getSlideStyle(index)}
//                 >
//                   <Image
//                     src={src}
//                     alt={`App screenshot ${index + 1}`}
//                     width={300} // Adjust width as needed
//                     height={600} // Adjust height as needed
//                     className="object-contain h-full w-auto drop-shadow-2xl"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
//           </div>
//         </div>
//       </section>


//            {/* How to Book */}
//       <section className="bg-white py-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-12">
//             <h2 className="text-xl lg:text-4xl font-bold mb-2 text-left">
//               How to book a cab with Eion Rides
//             </h2>
//             <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
//               Five simple steps to get your ride.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
//             {bookingSteps.map((step, index) => (
//               <div key={index} className="flex flex-col">
//                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 flex-shrink-0">
//                   <step.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 text-left">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm lg:text-base text-left">
//                   {step.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-12 flex justify-start">
//             <a href="/#booking">
//               <button className="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm lg:text-base hover:bg-blue-700 transition-colors">
//                 Book your ride now with Eion Rides
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </button>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Main Advantages */}
//       <section className="bg-blue-50 py-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-12">
//             <h2 className="text-xl lg:text-4xl font-bold mb-2 text-left">
//               What are the main advantages of booking a cab in Mumbai with Eion Rides?
//             </h2>
//             <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
//               Discover why thousands of riders trust us for safe, reliable, and affordable cab services.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {benefits.map((benefit, index) => (
//               <Card key={index} className="p-6 text-left shadow-sm hover:shadow-md transition-shadow">
//                 <CardContent className="p-0">
//                   <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-4">
//                     <span className="text-white font-bold text-sm">{index + 1}</span>
//                   </div>
//                   <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
//                     {benefit.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm lg:text-base">
//                     {benefit.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Customer Reviews with rotation */}
//       <section className="py-16 px-4 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-12">
//             <div className="inline-flex items-center bg-yellow-100 rounded-full px-4 py-2 mb-4">
//               <Star className="w-4 h-4 text-yellow-600 mr-2" />
//               <span className="text-yellow-700 font-semibold text-sm lg:text-base">
//                 4.8/5 average rating
//               </span>
//             </div>
//             <h2 className="text-xl lg:text-4xl font-bold mb-2 text-left">
//               Why thousands choose Eion Rides
//             </h2>
//             <p className="text-gray-600 text-sm lg:text-base text-left">
//               Hear directly from our riders about their experience with us.
//             </p>
//           </div>

//           <div className="relative">
//             <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
//               <div className="flex items-start gap-4 mb-6">
//                 <img
//                   src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
//                   alt={testimonials[currentTestimonial].name}
//                   className="w-14 h-14 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-900 text-sm lg:text-base">
//                     {testimonials[currentTestimonial].name}
//                   </h4>
//                   <p className="text-gray-600 text-xs lg:text-sm">
//                     {testimonials[currentTestimonial].role}
//                   </p>
//                   <div className="flex items-center mt-1">
//                     {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <blockquote className="text-base lg:text-lg text-gray-700 italic leading-relaxed text-left">
//                 "{testimonials[currentTestimonial].review}"
//               </blockquote>
//             </div>

//             <div className="flex justify-center mt-6 space-x-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-2.5 h-2.5 rounded-full transition-all ${
//                     index === currentTestimonial ? "bg-blue-600 w-8" : "bg-gray-300"
//                   }`}
//                   aria-label={`Show testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* WhatsApp Notification Journey */}
//       <section className="bg-blue-50 py-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-12">
//             <h2 className="text-xl lg:text-4xl font-bold mb-2 text-left">
//               Ride updates made simple
//             </h2>
//             <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
//               Get real-time updates throughout your journey via WhatsApp — from booking confirmation to trip completion.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 step: "1",
//                 title: "Booking confirmed",
//                 desc: "Instant confirmation with trip details and reference number.",
//                 icon: CheckCircle,
//                 color: "bg-blue-500",
//               },
//               {
//                 step: "2",
//                 title: "Driver assigned",
//                 desc: "Driver details, vehicle info, and live location sharing.",
//                 icon: User,
//                 color: "bg-green-500",
//               },
//               {
//                 step: "3",
//                 title: "En route updates",
//                 desc: "Real-time arrival time and location tracking.",
//                 icon: Navigation,
//                 color: "bg-orange-500",
//               },
//               {
//                 step: "4",
//                 title: "Trip complete",
//                 desc: "Invoice, payment confirmation, and rating request.",
//                 icon: Star,
//                 color: "bg-purple-500",
//               },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow text-left"
//               >
//                 <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center mb-4 flex-shrink-0`}>
//                   <item.icon className="w-5 h-5 text-white" />
//                 </div>
//                 <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 text-xs lg:text-sm mb-3">
//                   {item.desc}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <MessageCircle className="w-4 h-4 text-green-500" />
//                   <span className="text-xs text-green-600 font-medium">WhatsApp alert</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Authentication Section */}
//       <section className="py-16 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-12">
//             <h2 className="text-xl lg:text-4xl font-bold mb-2 text-left">
//               Multiple ways to join us
//             </h2>
//             <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
//               Choose the login method that works best for you.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: Mail,
//                 title: "Email",
//                 desc: "Quick email verification",
//                 color: "bg-blue-500",
//               },
//               {
//                 icon: Phone,
//                 title: "Mobile OTP",
//                 desc: "SMS verification",
//                 color: "bg-green-500",
//               },
//               {
//                 icon: User,
//                 title: "Username",
//                 desc: "Traditional login",
//                 color: "bg-purple-500",
//               },
//               {
//                 icon: Smartphone,
//                 title: "Social login",
//                 desc: "Google, Facebook, Apple",
//                 color: "bg-orange-500",
//               },
//             ].map((method, index) => (
//               <div
//                 key={index}
//                 className="bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left cursor-pointer"
//               >
//                 <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center mb-4`}>
//                   <method.icon className="w-5 h-5 text-white" />
//                 </div>
//                 <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">
//                   {method.title}
//                 </h3>
//                 <p className="text-gray-600 text-xs lg:text-sm">
//                   {method.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>




//       <Footer />
//     </div>
//   )
// }


//testing (26-12-2025)
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BookingInterface from "@/components/booking-interface"
import Image from "next/image"
import {
  MapPin,
  Star,
  CreditCard,
  Play,
  Apple,
  Phone,
  Mail,
  User,
  Car,
  Clock,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Navigation,
  Smartphone,
  Zap,
  Shield,
  Heart,
  TrendingUp,
  Sparkles,
} from "lucide-react"
import { Description } from "@radix-ui/react-toast"

const screens = [
  "/screen-logo.jpg",
  "/screen-booking.jpg",
  "/screenshot-3.jpg",
  "/screenshot-4.jpg",
  "/screenshot-5.jpg",
  "/screenshot-6.jpg",
  "/screenshot-7.jpg",
  "/screenshot-8.jpg",
]

export default function InDrivePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [animatedStats, setAnimatedStats] = useState({
    drivers: 0,
    waitTime: 0,
    rides: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  type FloatingElement = {
    id: number
    x: number
    y: number
    delay: number
    size: number
    opacity: number
  }
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const generateFloatingElements = () =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      size: Math.random() * 30 + 10,
      opacity: Math.random() * 0.2 + 0.05,
    }))

  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedStats((prev) => ({
          drivers: prev.drivers < 2254 ? prev.drivers + 23 : 2254,
          waitTime:
            prev.waitTime < 3.2 ? Math.min(prev.waitTime + 0.1, 3.2) : 3.2,
          rides: prev.rides < 7743 ? prev.rides + 87 : 7743,
        }))
      }, 30)

      setTimeout(() => clearInterval(interval), 3000)
    }, 800)

    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setFloatingElements(elements)

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearInterval(testimonialInterval)
    }
  }, [])

  const bookingSteps = [
    {
      title: "Set Pickup Location",
      icon: MapPin,
      description:
        "Enter your pickup point or use GPS to auto-detect your location.",
    },
    {
      title: "Choose Destination",
      description:
        "Type your drop-off address or select from recent locations.",
      icon: Navigation,
    },
    {
      title: "Select Vehicle Type",
      description:
        "Pick from Mini, Sedan, SUV, MUV, or Luxury cars — based on your need",
      icon: Car,
    },
    {
      title: "Set Your Fare",
      description:
        "Decide your price. Drivers compete for your trip, ensuring fair rides.",
      icon: CreditCard,
    },
    {
      title: "Confirm Booking",
      description:
        "Get instant ride confirmation with driver & vehicle details.",
      icon: CheckCircle,
    },
  ]

  const benefits = [
    {
      title: "Fair & Transparent Pricing",
      description:
        "No surge charges – you set the fare and drivers compete for your ride.",
    },
    {
      title: "Verified Drivers",
      description:
        "All drivers are trained, experienced, and background-checked for safety.",
    },
    {
      title: "Fast Pickups",
      description:
        "Average wait time of just a few minutes across Mumbai’s busiest areas.",
    },
    {
      title: "Wide Fleet Options",
      description:
        "Choose from Mini, Sedan, SUV, MUV, or Luxury cars depending on your travel need.",
    },
    {
      title: "Multiple Ride Types",
      description:
        "Local Flexi rides, hourly/daily rentals, airport transfers, and outstation trips.",
    },
    {
      title: "24x7 Availability",
      description: "Reliable cab booking in Mumbai, anytime you need.",
    },
    {
      title: "Tech + Human Support",
      description:
        "Live tracking, digital payments, and a call-centre to assist.",
    },
  ]

  const vehicleTypes = [
    {
      id: "Mini",
      name: "Mini",
      image: "/swift.jpg",
      desc: "Quick & economical",
    },
    {
      id: "Sedan",
      name: "Sedan",
      image: "/economy.jpg",
      desc: "Affordable rides",
    },
    {
      id: "SUV",
      name: "SUV",
      image: "/SUV.jpg",
      desc: "Premium experience",
    },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Marketing Executive",
      rating: 5,
      review:
        "Game changer! I save ₹200+ daily with fair pricing. No more surge pricing stress!",
      avatar: "/user-avatar-female.jpg",
    },
    {
      name: "Rahul Mehta",
      role: "Software Engineer",
      rating: 5,
      review:
        "Reliable and safe. The driver verification gives me complete peace of mind.",
      avatar: "/user-avatar-female.jpg",
    },
    {
      name: "Anjali Patel",
      role: "Doctor",
      rating: 5,
      review: "Perfect for my night shifts. Always find a ride, even at 3 AM!",
      avatar: "/user-avatar-female.jpg",
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    setFloatingElements(generateFloatingElements())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screens.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getSlideStyle = (index: number) => {
    if (index === currentIndex) {
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        zIndex: 10,
      }
    }

    const prevIndex = (currentIndex - 1 + screens.length) % screens.length
    if (index === prevIndex) {
      return {
        transform: "translateX(-50%) scale(0.8)",
        opacity: 0.7,
        zIndex: 5,
      }
    }

    const nextIndex = (currentIndex + 1) % screens.length
    if (index === nextIndex) {
      return {
        transform: "translateX(50%) scale(0.8)",
        opacity: 0.7,
        zIndex: 5,
      }
    }

    return {
      transform: "scale(0.7)",
      opacity: 0,
      zIndex: 0,
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero / booking */}
      <section
        id="booking"
        className="relative lg:min-h-screen flex lg:items-center py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden isolate"
      >
        <div className="absolute inset-0 w-full h-full z-[-2]">
          <img
            src="/heroimage1.png"
            alt="A modern cab on a city street at dusk"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-[-1]" />

        <div className="absolute inset-0 overflow-hidden z-[-1]">
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="absolute bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                opacity: element.opacity,
                animation: `float 8s ease-in-out infinite ${element.delay}s, pulse 4s ease-in-out infinite ${
                  element.delay * 0.5
                }s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div
            className={`w-full max-w-xl bg-black/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            } p-6 sm:p-8`}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-white text-left">
              Your ride, just a tap away
            </h1>
            <BookingInterface />
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(180deg);
            }
          }
          @keyframes pulse {
            0%,
            100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.3;
            }
          }
        `}</style>
      </section>

      {/* City services */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-gray-900 text-left">
              Cab & taxi services in{" "}
              <span className="text-blue-600">
                Mumbai, Pune & Bhopal
              </span>
            </h2>
            <p className="text-gray-600 text-base lg:text-lg max-w-3xl text-left">
              Eion Rides offers safe, reliable, and affordable cabs across major
              Indian cities. Whether it is daily office travel, airport
              transfers, or weekend getaways, cab booking services in Mumbai,
              Pune, and Bhopal are designed for comfort and convenience.
            </p>
          </div>

          <div className="space-y-6">
            {/* Mumbai */}
            <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <img
                src="/mumbai-gateway-of-india.webp"
                alt="Gateway of India, Mumbai"
                className="w-full md:w-64 h-44 md:h-40 object-cover rounded-2xl flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold mb-1 text-gray-900">
                  Mumbai
                </h3>
                <p className="text-sm font-semibold text-blue-600 mb-2">
                  Taxi & cab services in Mumbai – local & outstation
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Serving locations like Andheri, Bandra, Colaba, Dadar,
                  Goregaon, Juhu and more.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Book airport cabs, office commute rides, outstation taxis, or
                  hourly rentals in Mumbai.
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  More areas coming soon…
                </p>
              </div>
            </div>

            {/* Pune */}
            <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <img
                src="/pune-shaniwar-wada.jpeg"
                alt="Shaniwar Wada, Pune"
                className="w-full md:w-64 h-44 md:h-40 object-cover rounded-2xl flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold mb-1 text-gray-900">
                  Pune
                </h3>
                <p className="text-sm font-semibold text-green-600 mb-2">
                  Affordable cab booking in Pune – local & outstation
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Available in Koregaon Park, Baner, Wakad, Hinjewadi, Kothrud,
                  Deccan and more.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Choose daily rentals, Pune airport taxis, corporate travel, or
                  weekend getaways.
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  More areas coming soon…
                </p>
              </div>
            </div>

            {/* Bhopal */}
            <div className="bg-white rounded-3xl p-5 lg:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <img
                src="/bhopal-upper-lake.jpg"
                alt="Upper Lake, Bhopal"
                className="w-full md:w-64 h-44 md:h-40 object-cover rounded-2xl flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl lg:text-2xl font-bold mb-1 text-gray-900">
                  Bhopal
                </h3>
                <p className="text-sm font-semibold text-purple-600 mb-2">
                  Trusted taxi service in Bhopal – city & beyond
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Serving New Market, MP Nagar, Arera Colony, Kolar, Shahpura,
                  Habibganj and more.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Book local rides, airport transfers, and outstation taxis with
                  ease.
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  More areas coming soon…
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-start">
            <a href="/#booking">
              <button className="inline-flex items-center bg-blue-600 text-white text-sm lg:text-base font-semibold rounded-full px-6 py-3 hover:bg-blue-700 transition-colors">
                <MapPin className="w-4 h-4 mr-2" />
                Book your ride to any destination with Eion Rides
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats / trust section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 isolate overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-[-2]">
          <img
            src="/secondpageimage.jpg"
            alt="Abstract city lights or a relevant background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/70 z-[-1]" />

        <div className="relative z-10 max-w-7xl mx-auto text-left">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
            <TrendingUp className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="text-white font-semibold text-sm sm:text-base">
              India’s trusted and growing ride platform
            </span>
          </div>

          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-white">
            Why riders in Mumbai, Pune & Bhopal trust{" "}
            <span className="text-blue-500">Eion Rides</span>
          </h2>
          <p className="text-gray-300 mb-10 text-base lg:text-lg max-w-2xl">
            Thousands of riders rely on Eion Rides for safe, reliable, and
            affordable cab booking services. From office commute to airport
            transfers and outstation trips, every ride is designed to be fast
            and hassle-free.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {[
              {
                value: animatedStats.drivers,
                label: "Verified drivers online",
                description:
                  "Experienced, trained, and background-checked drivers ready to serve.",
                icon: Car,
                color: "text-blue-600",
                bgColor: "bg-blue-600/10",
                suffix: "+",
              },
              {
                value: animatedStats.waitTime,
                label: "Average wait time",
                description:
                  "Quick pickups across Mumbai, Pune and Bhopal. Skip long waits.",
                icon: Clock,
                color: "text-indigo-600",
                bgColor: "bg-indigo-500/10",
                suffix: " min",
              },
              {
                value: animatedStats.rides,
                label: "Happy rides completed",
                description:
                  "Riders choose Eion Rides for comfort, safety and transparent pricing.",
                icon: CheckCircle,
                color: "text-purple-600",
                bgColor: "bg-purple-500/10",
                suffix: "+",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 text-left"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-4">
                  <stat.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl sm:text-5xl font-bold ${stat.color} mb-2`}>
                  {typeof stat.value === "number" && stat.value % 1 !== 0
                    ? stat.value.toFixed(1)
                    : Math.floor(stat.value)}
                  {stat.suffix}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {stat.label}
                </h3>
                <p className="text-gray-600 font-medium">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fair prices */}
      <section className="bg-blue-50 text-blue-600 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-left">
              Smart cab rides in India
            </h2>
            <p className="text-base lg:text-xl font-semibold text-blue-700 mb-6 text-left">
              Fair prices, no surprises.
            </p>

            <p className="text-black mb-4 text-sm lg:text-base text-left">
              In crowded cities, parking, maintenance, and unreliable rides
              waste time and energy. Eion Rides solves this with on-demand
              bookings, professional drivers, and technology that keeps travel
              smooth and predictable.
            </p>
            <p className="text-black mb-6 text-sm lg:text-base text-left">
              Eion Rides is built on safety, trust, and transparent pricing, so
              every commute, airport transfer, or outstation ride feels simple
              and stress-free.
            </p>

            <div className="space-y-3">
              {[
                "You set the fare – pay what feels fair with no hidden costs.",
                "Drivers compete for your trip, improving availability and response time.",
                "No surge pricing – enjoy consistent prices at all hours.",
                "Flexible ride options – local, airport, rentals, and outstation.",
                "Tech-enabled and human-backed – live tracking, digital payments, and 24x7 support.",
              ].map((text, index) => (
                <div
                  className="flex items-start space-x-3"
                  key={index}
                >
                  <div className="mt-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm lg:text-base text-blue-700">
                    {text}
                  </span>
                </div>
              ))}

              <p className="text-sm lg:text-base text-blue-700 mt-4 text-left">
                This is a smarter, fairer way to travel for everyone.
              </p>
            </div>
          </div>

          <div>
            <img
              src="/taxi.webp"
              alt="Taxi in Mumbai"
              className="rounded-lg w-full object-cover"
            />
          </div>
        </div>

        <a href="/#booking" className="flex justify-start mt-10">
          <button className="font-semibold text-white bg-blue-700 px-5 py-2.5 lg:px-8 lg:py-3 rounded-full text-xs lg:text-lg hover:bg-blue-800 transition-colors">
            Eion Rides – your route, our responsibility
          </button>
        </a>
      </section>

      {/* Vehicle types */}
      <section className="bg-blue-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-left mb-4">
            Eion Rides offers a variety of transport options
          </h2>
          <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl mb-8">
            Choose the right cab category for your trip, from everyday city
            rides to more spacious options for family travel or airport runs.
          </p>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-4">
            {vehicleTypes.map((vehicle) => (
              <Card
                key={vehicle.id}
                className="p-6 text-left shadow-sm hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-lg lg:text-xl font-bold mb-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base">
                    {vehicle.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App download */}
      <section
        id="download"
        className="bg-blue-50 text-gray-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Eion Rides Logo"
                  className="h-14 sm:h-16 w-auto"
                />
              </a>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold leading-tight mb-2">
              Download the{" "}
              <span className="text-blue-600">Eion Rides app</span>
            </h2>
            <h3 className="mb-4 text-base lg:text-lg">
              Your cab, anytime, anywhere
            </h3>
            <p className="text-base lg:text-xl text-gray-600 mb-8 leading-relaxed">
              Hassle-free cab booking, available 24/7 on your favourite
              platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.isoftinc.eion_customer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/playstore.png"
                  alt="Get it on Google Play"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </a>
              <a
                href="https://apps.apple.com/us/app/eion-rides/id6747707285"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/appstore.png"
                  alt="Download on the App Store"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Free download</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-80 sm:h-96 md:h-[460px]">
              {screens.map((src, index) => (
                <div
                  key={src}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                  style={getSlideStyle(index)}
                >
                  <Image
                    src={src}
                    alt={`App screenshot ${index + 1}`}
                    width={300}
                    height={600}
                    className="object-contain h-full w-auto drop-shadow-2xl"
                  />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          </div>
        </div>
      </section>

      {/* How to book */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-left">
              How to book a cab with Eion Rides
            </h2>
            <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
              Five simple steps to get your ride.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {bookingSteps.map((step, index) => (
              <div key={index} className="flex flex-col">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 text-left">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base text-left">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-start">
            <a href="/#booking">
              <button className="inline-flex items-center justify-center px-6 py-3 lg:px-8 lg:py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm lg:text-base hover:bg-blue-700 transition-colors">
                Book your ride now with Eion Rides
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-blue-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-left">
              Main advantages of booking a cab in Mumbai with Eion Rides
            </h2>
            <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
              Discover why riders trust Eion Rides for safe, reliable, and
              affordable cab services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="inline-flex items-center bg-yellow-100 rounded-full px-4 py-2 mb-4">
              <Star className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-yellow-700 font-semibold text-sm lg:text-base">
                4.8/5 average rating
              </span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-left">
              Why riders choose Eion Rides
            </h2>
            <p className="text-gray-600 text-sm lg:text-base text-left">
              Hear directly from riders about their experience.
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm lg:text-base">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600 text-xs lg:text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <div className="flex items-center mt-1">
                    {[
                      ...Array(testimonials[currentTestimonial].rating),
                    ].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-base lg:text-lg text-gray-700 italic leading-relaxed text-left">
                "{testimonials[currentTestimonial].review}"
              </blockquote>
            </div>

            <div className="flex justify-start mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 w-2.5"
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp journey */}
      <section className="bg-blue-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-left">
              Ride updates made simple
            </h2>
            <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
              Get real-time ride updates on WhatsApp, from booking confirmation
              to trip completion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                step: "1",
                title: "Booking confirmed",
                desc: "Instant confirmation with trip details and reference number.",
                icon: CheckCircle,
                color: "bg-blue-500",
              },
              {
                step: "2",
                title: "Driver assigned",
                desc: "Driver details, vehicle info, and live location sharing.",
                icon: User,
                color: "bg-green-500",
              },
              {
                step: "3",
                title: "En route updates",
                desc: "Real-time arrival time and location tracking.",
                icon: Navigation,
                color: "bg-orange-500",
              },
              {
                step: "4",
                title: "Trip complete",
                desc: "Invoice, payment confirmation, and rating request.",
                icon: Star,
                color: "bg-purple-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div
                  className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center mb-4 flex-shrink-0`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs lg:text-sm mb-3">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">
                    WhatsApp alert
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth methods */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-left">
              Multiple ways to join us
            </h2>
            <p className="text-gray-600 text-sm lg:text-base text-left max-w-2xl">
              Choose the login method that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Mail,
                title: "Email",
                desc: "Quick email verification.",
                color: "bg-blue-500",
              },
              {
                icon: Phone,
                title: "Mobile OTP",
                desc: "Secure SMS verification.",
                color: "bg-green-500",
              },
              {
                icon: User,
                title: "Username",
                desc: "Traditional login.",
                color: "bg-purple-500",
              },
              {
                icon: Smartphone,
                title: "Social login",
                desc: "Google, Facebook, Apple.",
                color: "bg-orange-500",
              },
            ].map((method, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left cursor-pointer"
              >
                <div
                  className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center mb-4`}
                >
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-xs lg:text-sm">
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
