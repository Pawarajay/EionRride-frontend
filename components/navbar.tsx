// "use client"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen)
//   }


//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About Us", href: "/about" },
//     { name: "Our Services", href: "/services" },
//     { name: "Blog", href: "/blog" },
//     { name: "Contact", href: "/contact" },
//     { name: "Download App", href: "/#download" },
//   ]

//   return (
//     <>
//     <header className="bg-white text-gray-900 px-4 py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <div className="flex items-center space-x-3 group cursor-pointer">
//           <a href="/" className="flex items-center gap-2">
//             <img
//               src="/logo.png"   // <-- replace with your logo path
//               alt="Eion Rides Logo"
//               className="h-10 w-auto"
//             />
//           </a>
//         </div>
//         <nav className="hidden lg:flex items-center space-x-8">
//           {navItems.map((item) => (
//             <a
//               key={item.name}
//               href={item.href}
//               className="hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group font-medium text-gray-700"
//             >
//               {item.name}
//               <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 w-0 group-hover:w-full"></span>
//             </a>
//           ))}
//         </nav>

//         {/* Desktop Actions */}
//         <div className="hidden lg:flex items-center space-x-3">
//           <a href="/auth/login">
//             <Button
//               variant="ghost"
//               className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium"
//             >
//               Sign In
//             </Button>
//           </a>
//           <a href="/auth/register">
//             <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-semibold px-6">
//               Book Cab
//             </Button>
//           </a>
//           <a href="/driver/register">
//             <Button
//               variant="outline"
//               className="text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 bg-transparent hover:scale-105 font-medium"
//             >
//               Register as Driver
//             </Button>
//           </a>
//         </div>

//         <button
//           onClick={toggleMobileMenu}
//           className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
//         >
//           {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
//         </button>
//       </div>
//     </header>


//       {/* Mobile Sidebar */ }
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
//           <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
//             <div className="p-6 pt-20">
//               <nav className="space-y-2 mb-8">
//                 {navItems.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     onClick={toggleMobileMenu}
//                     className="block py-4 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium text-lg border-b border-gray-100"
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </nav>

//               <div className="space-y-3 mb-8">
//                 <a href="/auth/login" onClick={toggleMobileMenu}>
//                   <Button
//                     variant="ghost"
//                     className="w-full text-gray-700 hover:text-blue-600 justify-start font-medium text-lg py-4"
//                   >
//                     Sign In
//                   </Button>
//                 </a>
//                 <a href="/book" onClick={toggleMobileMenu}>
//                   <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg py-4">
//                     Book Cab
//                   </Button>
//                 </a>
//                 <a href="/driver/register" onClick={toggleMobileMenu}>
//                   <Button
//                     variant="outline"
//                     className="w-full text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white font-medium bg-transparent text-lg py-4"
//                   >
//                     Register as Driver
//                   </Button>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       </>
//   )
// }


//testing
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Download App", href: "/#download" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Eion Rides Logo"
                  className="h-10 w-auto"
                />
              </a>
            </div>

            {/* Center: Nav links (desktop) */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-6 xl:space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative group font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    <span>{item.name}</span>
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 w-0 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Right: Actions (desktop) */}
            <div className="hidden lg:flex items-center space-x-3">
              <a href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-gray-800 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Button>
              </a>
              <a href="/auth/register">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-5">
                  Book Cab
                </Button>
              </a>
              <a href="/driver/register">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white font-medium bg-transparent"
                >
                  Register as Driver
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="px-5 pt-16 pb-6">
              {/* Links */}
              <nav className="space-y-1.5 mb-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="block py-3 px-3 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-medium text-base border-b border-gray-100 last:border-b-0"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Actions */}
              <div className="space-y-3">
                <a href="/auth/login" onClick={toggleMobileMenu}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-800 hover:text-blue-600 font-medium"
                  >
                    Sign In
                  </Button>
                </a>
                <a href="/auth/register" onClick={toggleMobileMenu}>
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold">
                    Book Cab
                  </Button>
                </a>
                <a href="/driver/register" onClick={toggleMobileMenu}>
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white font-medium bg-transparent"
                  >
                    Register as Driver
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
