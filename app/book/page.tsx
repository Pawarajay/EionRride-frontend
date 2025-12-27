// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowLeft, Tag, UserCheck, UserPlus, Lock } from "lucide-react";
// import Link from "next/link";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import { useSearchParams, useRouter } from "next/navigation";

// type VehicleType = {
//   id: string;
//   name: string;
//   basePrice: number;
//   image?: string;
//   capacity?: string;
//   features?: string[];
// };

// export default function BookingPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const pickupRef = useRef<HTMLInputElement | null>(null);
//   const dropRef = useRef<HTMLInputElement | null>(null);
//   const bookingFormRef = useRef<HTMLDivElement | null>(null);

//   const serviceType = searchParams.get("service") || "rental";
//   const tripType = searchParams.get("tripType") || "oneway";

//   const urlPickupLat = searchParams.get("pickupLat");
//   const urlPickupLng = searchParams.get("pickupLng");
//   const urlDropLat = searchParams.get("dropLat");
//   const urlDropLng = searchParams.get("dropLng");
//   const urlPickup = searchParams.get("pickup") || "";
//   const urlDrop = searchParams.get("drop") || "";

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [inlineMessage, setInlineMessage] = useState<string | null>(null);

//   const [actualHours, setActualHours] = useState(4);
//   const [actualDistance, setActualDistance] = useState(40);
//   const [totalTripHours, setTotalTripHours] = useState<number | null>(null);
//   const [totalTripMinutes, setTotalTripMinutes] = useState<number | null>(null);
//   const [distanceKm, setDistanceKm] = useState<number | null>(null);
//   const [distanceError, setDistanceError] = useState<string | null>(null);
//   const [prices, setPrices] = useState<Record<string, string>>({});
//   const [pricesLoading, setPricesLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [calculatingDistance, setCalculatingDistance] = useState(false);
//   const [fareBreakdowns, setFareBreakdowns] = useState<Record<string, any>>({});

//   const [lockedDistanceKm, setLockedDistanceKm] = useState<number | null>(null);
//   const [lockedTripMinutes, setLockedTripMinutes] = useState<number | null>(
//     null
//   );
//   const [lockedTripHours, setLockedTripHours] = useState<number | null>(null);
//   const [isLocked, setIsLocked] = useState(false);

//   const [infoVehicleId, setInfoVehicleId] = useState<string | null>(null);

//   const rentalPlans = [
//     { id: "4hr", name: "4 Hr", duration: "40 Kms", hours: 4, kms: 40 },
//     { id: "6hr", name: "6 Hr", duration: "60 Kms", hours: 6, kms: 60 },
//     { id: "8hr", name: "8 Hr", duration: "80 Kms", hours: 8, kms: 80 },
//     { id: "10hr", name: "10 Hr", duration: "100 Kms", hours: 10, kms: 100 },
//     { id: "12hr", name: "12 Hr", duration: "120 Kms", hours: 12, kms: 120 },
//   ];
//   const rentalPlanHoursMap: Record<string, number> = {
//     "4hr": 4,
//     "6hr": 6,
//     "8hr": 8,
//     "10hr": 10,
//     "12hr": 12,
//   };
//   const rentalPlanKmsMap: Record<string, number> = {
//     "4hr": 40,
//     "6hr": 60,
//     "8hr": 80,
//     "10hr": 100,
//     "12hr": 120,
//   };

//   const allVehicleTypes: VehicleType[] = [
//     {
//       id: "mini",
//       name: "Mini",
//       basePrice: 0.0,
//       image: "/green-economy-car.png",
//       capacity: "4 seats",
//       features: ["AC", "Music"],
//     },
//     {
//       id: "sedan",
//       name: "Sedan",
//       basePrice: 0.0,
//       image: "/green-comfort-car-sedan.png",
//       capacity: "4 seats",
//       features: ["AC", "Music", "Premium Interior"],
//     },
//     {
//       id: "suv",
//       name: "SUV",
//       basePrice: 0.0,
//       image: "/taxi-car-on-street-mumbai.png",
//       capacity: "6 seats",
//       features: ["AC", "Music", "Spacious"],
//     },
//     {
//       id: "innova",
//       name: "Innova Crysta",
//       basePrice: 0.0,
//       image: "/green-comfort-car-sedan.png",
//       capacity: "7 seats",
//       features: ["AC", "Music", "Premium", "Extra Space"],
//     },
//   ];

//   const [bookingData, setBookingData] = useState({
//     pickup: urlPickup,
//     pickupLat: urlPickupLat ? parseFloat(urlPickupLat) : null,
//     pickupLng: urlPickupLng ? parseFloat(urlPickupLng) : null,
//     destination: urlDrop,
//     dropLat: urlDropLat ? parseFloat(urlDropLat) : null,
//     dropLng: urlDropLng ? parseFloat(urlDropLng) : null,
//     rentalPlan: "",
//     actualHours: 4,
//     actualDistance: 40,
//     vehicleType: "",
//     pickupDate: searchParams.get("pickupDate") || "",
//     pickupTime: searchParams.get("pickupTime") || "",
//     returnDate: searchParams.get("returnDate") || "",
//     returnTime: searchParams.get("returnTime") || "",
//     passengers: 1,
//     fare: 0,
//     gstAmount: 0,
//     totalFare: 0,
//     notes: "",
//     customerName: "",
//     customerPhone: "",
//     customerEmail: "",
//     couponCode: "",
//     discount: 0,
//     bookingFor: "self",
//     otherPersonName: "",
//     otherPersonPhone: "",
//     paymentMethod: "online",
//     serviceType: serviceType,
//     tripType: tripType,
//   });

//   const BACKEND_URL =
//     process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

//   // Filter vehicles based on service type
//   const vehicleTypes = bookingData.serviceType === "flexi" 
//     ? allVehicleTypes.filter(v => v.id !== "innova")
//     : allVehicleTypes;

//   const getServiceDisplayName = (): string => {
//     switch (bookingData.serviceType) {
//       case "flexi":
//         return "Flexi Ride";
//       case "rental":
//         return "Rental Service";
//       case "outstation":
//         return bookingData.tripType === "roundtrip"
//           ? "Outstation Round Trip"
//           : "Outstation One Way";
//       default:
//         return "Rental Service";
//     }
//   };

//   const updateBookingData = (field: string, value: any) => {
//     setBookingData((prev) => ({ ...prev, [field]: value }));
//   };

//   const detectCity = (pickup: string) => {
//     if (pickup.toLowerCase().includes("pune")) return "Pune";
//     if (pickup.toLowerCase().includes("bhopal")) return "Bhopal";
//     return "Mumbai";
//   };

//   const computeDistanceAndPrices = async (customRentalPlan?: string) => {
//     const pickup = bookingData.pickup?.trim();
//     const destination = bookingData.destination?.trim();

//     if (
//       !pickup ||
//       !destination ||
//       !bookingData.pickupLat ||
//       !bookingData.dropLat
//     ) {
//       setDistanceError("Invalid booking data. Please go back to home page.");
//       return;
//     }

//     try {
//       setCalculatingDistance(true);
//       setDistanceError(null);

//       const distanceResponse = await fetch(
//         `${BACKEND_URL}/routes/calculate-distance?` +
//           `pickupLat=${bookingData.pickupLat}&` +
//           `pickupLng=${bookingData.pickupLng}&` +
//           `dropLat=${bookingData.dropLat}&` +
//           `dropLng=${bookingData.dropLng}&` +
//           `serviceType=${bookingData.serviceType}&` +
//           `tripType=${bookingData.tripType}`
//       );

//       const distanceData = await distanceResponse.json();

//       if (!distanceResponse.ok || !distanceData.success) {
//         throw new Error(distanceData.error || "Failed to calculate distance");
//       }

//       const backendKm = distanceData.distanceKm;
//       const backendMinutes = distanceData.durationMinutes;
//       const backendHours = distanceData.durationHours;

//       setLockedDistanceKm(backendKm);
//       setLockedTripMinutes(backendMinutes);
//       setLockedTripHours(backendHours);
//       setIsLocked(true);

//       setDistanceKm(backendKm);
//       setTotalTripMinutes(backendMinutes);
//       setTotalTripHours(backendHours);

//       const planId = customRentalPlan || bookingData.rentalPlan;
//       const newPrices: Record<string, string> = {};
//       const newBreakdowns: Record<string, any> = {};

//       await Promise.all(
//         vehicleTypes.map(async (v) => {
//           setPricesLoading((prev) => ({ ...prev, [v.id]: true }));
//           try {
//             const urlParams = new URLSearchParams();
//             urlParams.append("distance", backendKm.toString());
//             urlParams.append("vehicleType", v.id);
//             urlParams.append("city", detectCity(pickup));
//             urlParams.append("serviceType", bookingData.serviceType);
//             urlParams.append(
//               "pickupLat",
//               bookingData.pickupLat?.toString() || ""
//             );
//             urlParams.append(
//               "pickupLng",
//               bookingData.pickupLng?.toString() || ""
//             );
//             urlParams.append(
//               "dropLat",
//               bookingData.dropLat?.toString() || ""
//             );
//             urlParams.append(
//               "dropLng",
//               bookingData.dropLng?.toString() || ""
//             );
//             urlParams.append("tripType", bookingData.tripType || "oneway");
//             urlParams.append("pickupDate", bookingData.pickupDate || "");
//             urlParams.append("pickupTime", bookingData.pickupTime || "");

//             if (bookingData.tripType === "roundtrip") {
//               urlParams.append("returnDate", bookingData.returnDate || "");
//               urlParams.append("returnTime", bookingData.returnTime || "");
//             }
//             if (
//               bookingData.serviceType === "outstation" &&
//               bookingData.tripType === "roundtrip"
//             ) {
//               urlParams.append("tripHours", backendHours.toString());
//             }
//             if (bookingData.serviceType === "rental") {
//               urlParams.append(
//                 "rentalHours",
//                 String(rentalPlanHoursMap[planId] || 4)
//               );
//               urlParams.append(
//                 "actualHours",
//                 actualHours
//                   ? String(actualHours)
//                   : String(rentalPlanHoursMap[planId] || 4)
//               );
//             }
//             if (bookingData.serviceType === "flexi") {
//               urlParams.append(
//                 "actualTripMinutes",
//                 backendMinutes.toString()
//               );
//             }

//             const url = `${BACKEND_URL}/routes/calculate-price?${urlParams.toString()}`;
//             const res = await fetch(url);
//             const data = await res.json();

//             if (res.ok && data.totalFare) {
//               newPrices[v.id] = new Intl.NumberFormat("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               }).format(data.totalFare);
//               newBreakdowns[v.id] = data.breakdown || {};
//             } else {
//               newPrices[v.id] = new Intl.NumberFormat("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               }).format(v.basePrice);
//               newBreakdowns[v.id] = {};
//               if (data.error) setDistanceError(String(data.error));
//             }
//           } catch {
//             newPrices[v.id] = new Intl.NumberFormat("en-IN", {
//               style: "currency",
//               currency: "INR",
//             }).format(v.basePrice);
//             newBreakdowns[v.id] = {};
//           } finally {
//             setPricesLoading((prev) => ({ ...prev, [v.id]: false }));
//           }
//         })
//       );

//       setPrices(newPrices);
//       setFareBreakdowns(newBreakdowns);
//       setCalculatingDistance(false);
//     } catch {
//       setDistanceError("Error calculating distance. Please try again.");
//       setDistanceKm(null);
//       setTotalTripHours(null);
//       setTotalTripMinutes(null);

//       const fallbackPrices: Record<string, string> = {};
//       vehicleTypes.forEach((v) => {
//         fallbackPrices[v.id] = new Intl.NumberFormat("en-IN", {
//           style: "currency",
//           currency: "INR",
//         }).format(v.basePrice);
//       });
//       setPrices(fallbackPrices);
//       setCalculatingDistance(false);
//     }
//   };

//   useEffect(() => {
//     computeDistanceAndPrices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (bookingData.serviceType === "rental" && bookingData.rentalPlan) {
//       setActualHours(rentalPlanHoursMap[bookingData.rentalPlan] || 4);
//       setActualDistance(rentalPlanKmsMap[bookingData.rentalPlan] || 40);
//       computeDistanceAndPrices(bookingData.rentalPlan);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [bookingData.rentalPlan, bookingData.serviceType]);

//   const formatDistance = (km: number | null) =>
//     km === null ? "—" : `${km.toFixed(2)} km`;
//   const formatTimeHours = (hours: number | null) =>
//     hours !== null ? `${hours.toFixed(2)} hr` : "---";
//   const formatTimeMins = (mins: number | null) =>
//     mins !== null ? `${mins} min` : "---";

//   const applyCoupon = () => {
//     const coupons: Record<string, number> = {
//       FIRST10: 10,
//       SAVE20: 20,
//       WELCOME15: 15,
//     };
//     const discount = coupons[bookingData.couponCode.toUpperCase()] || 0;
//     updateBookingData("discount", discount);
//     if (discount > 0) {
//       alert(`Coupon applied! You saved ${discount}%`);
//     } else {
//       alert("Invalid coupon code");
//     }
//   };

//   const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

//   const handleBookNow = () => {
//     if (bookingData.serviceType === "rental" && !bookingData.rentalPlan) {
//       alert("Please select a rental plan");
//       return;
//     }
//     if (!bookingData.vehicleType) {
//       alert("Please select a vehicle type");
//       return;
//     }

//     setShowBookingForm(true);
//   };

//   const handleConfirmBooking = async () => {
//     if (
//       !bookingData.customerName ||
//       !bookingData.customerPhone ||
//       !isValidPhone(bookingData.customerPhone)
//     ) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     if (
//       bookingData.bookingFor === "other" &&
//       (!bookingData.otherPersonName ||
//         !bookingData.otherPersonPhone ||
//         !isValidPhone(bookingData.otherPersonPhone))
//     ) {
//       alert("Please provide details for the person you're booking for");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await fetch(`${BACKEND_URL}/routes/save-booking`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...bookingData,
//           distanceKm: lockedDistanceKm,
//           tripHours: lockedTripHours,
//           actualTripMinutes:
//             bookingData.serviceType === "flexi"
//               ? lockedTripMinutes
//               : undefined,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Thank you, your booking has been confirmed.");
//         router.push("/thank-you");
//       } else {
//         alert(
//           data.error ||
//             "There was an error confirming your booking. Please try again."
//         );
//       }
//     } catch {
//       alert("Network error while confirming booking.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isBookNowDisabled =
//     (bookingData.serviceType === "rental" && !bookingData.rentalPlan) ||
//     !bookingData.vehicleType;

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         <div className="flex items-center mb-6">
//           <Link
//             href="/"
//             className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             <span className="text-sm sm:text-base">Back to home</span>
//           </Link>
//         </div>

//         <Card className="p-4 sm:p-6 mb-4">
//           <CardContent className="p-0">
//             <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
//               Pick your locations
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pickup location *
//                 </label>
//                 <div className="flex gap-2">
//                   <Input
//                     ref={pickupRef}
//                     type="text"
//                     placeholder="Enter pickup location"
//                     value={bookingData.pickup}
//                     onChange={(e) =>
//                       updateBookingData("pickup", e.target.value)
//                     }
//                     required
//                     className="flex-1"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Drop location *
//                 </label>
//                 <Input
//                   ref={dropRef}
//                   type="text"
//                   placeholder="Enter drop location"
//                   value={bookingData.destination}
//                   onChange={(e) =>
//                     updateBookingData("destination", e.target.value)
//                   }
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setBookingData((prev) => ({
//                     ...prev,
//                     pickup: "",
//                     destination: "",
//                     pickupLat: null,
//                     pickupLng: null,
//                     dropLat: null,
//                     dropLng: null,
//                   }));
//                   setLockedDistanceKm(null);
//                   setLockedTripHours(null);
//                   setLockedTripMinutes(null);
//                   setIsLocked(false);
//                   setDistanceKm(null);
//                   setTotalTripHours(null);
//                   setTotalTripMinutes(null);
//                 }}
//                 className="text-xs font-medium text-blue-600 hover:text-blue-800"
//               >
//                 Clear all
//               </button>
//             </div>

//             {bookingData.serviceType === "outstation" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Pickup date & time *
//                   </label>
//                   <input
//                     className="border p-2 rounded w-full text-sm"
//                     type="date"
//                     value={bookingData.pickupDate}
//                     onChange={(e) =>
//                       updateBookingData("pickupDate", e.target.value)
//                     }
//                   />
//                   <input
//                     className="border p-2 rounded w-full mt-1 text-sm"
//                     type="time"
//                     value={bookingData.pickupTime}
//                     onChange={(e) =>
//                       updateBookingData("pickupTime", e.target.value)
//                     }
//                   />
//                 </div>
//                 {bookingData.tripType === "roundtrip" && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Return date & time *
//                     </label>
//                     <input
//                       className="border p-2 rounded w-full text-sm"
//                       type="date"
//                       value={bookingData.returnDate}
//                       onChange={(e) =>
//                         updateBookingData("returnDate", e.target.value)
//                       }
//                     />
//                     <input
//                       className="border p-2 rounded w-full mt-1 text-sm"
//                       type="time"
//                       value={bookingData.returnTime}
//                       onChange={(e) =>
//                         updateBookingData("returnTime", e.target.value)
//                       }
//                     />
//                   </div>
//                 )}
//               </div>
//             )}

//             {bookingData.serviceType === "outstation" &&
//               bookingData.tripType === "roundtrip" && (
//                 <div className="mt-2 text-sm text-blue-800">
//                   Estimated total time:{" "}
//                   <b>
//                     {formatTimeHours(lockedTripHours || totalTripHours)} (
//                     {formatTimeMins(lockedTripMinutes || totalTripMinutes)})
//                   </b>
//                 </div>
//               )}

//             {(!bookingData.pickup ||
//               !bookingData.destination ||
//               !bookingData.pickupLat ||
//               !bookingData.dropLat) && (
//               <div className="text-xs text-red-500 mt-2">
//                 Please select locations from the suggestions. Both pickup and
//                 drop must be valid.
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {!showBookingForm ? (
//           <div className="space-y-6">
//             <div className="mb-6">
//               <div className="mt-4">
//                 <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2">
//                   <span className="text-blue-700 font-medium text-sm sm:text-base">
//                     Service: {getServiceDisplayName()}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="text-sm text-gray-600">
//               <div className="flex flex-wrap gap-2 items-center">
//                 <span className="font-medium">Distance:</span>{" "}
//                 <span>
//                   {calculatingDistance
//                     ? "Calculating..."
//                     : isLocked
//                     ? formatDistance(lockedDistanceKm)
//                     : formatDistance(distanceKm)}
//                 </span>
//                 <span className="text-gray-400">•</span>
//                 <span className="font-medium">Duration:</span>{" "}
//                 <span>
//                   {calculatingDistance
//                     ? "Calculating..."
//                     : isLocked
//                     ? formatTimeMins(lockedTripMinutes)
//                     : formatTimeMins(totalTripMinutes)}
//                 </span>
//               </div>
//               {distanceError && (
//                 <div className="text-xs text-red-600 mt-1">
//                   {distanceError}
//                 </div>
//               )}
//             </div>
            
//             <div className="text-xl sm:text-2xl font-bold text-blue-900">
//               {pricesLoading[bookingData.vehicleType]
//                 ? "Calculating..."
//                 : prices[bookingData.vehicleType]
//                 ? prices[bookingData.vehicleType]
//                 : ""}
//             </div>

//             {bookingData.vehicleType &&
//               fareBreakdowns[bookingData.vehicleType] && (
//                 <div className="p-4 sm:p-5 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 max-w-full sm:max-w-md">
//                   <h4 className="font-semibold text-blue-900 mb-3 border-b border-blue-300 pb-2 text-sm sm:text-base">
//                     Fare calculation breakdown
//                   </h4>
//                   <ul className="text-xs sm:text-sm space-y-1 list-disc list-inside text-blue-900 font-medium">
//                     {Object.entries(
//                       fareBreakdowns[bookingData.vehicleType]
//                     ).map(([key, value]) => (
//                       <li key={key}>
//                         <span className="capitalize">
//                           {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
//                         </span>
//                         :{" "}
//                         <span className="font-normal">
//                           {typeof value === "number"
//                             ? value.toLocaleString("en-IN", {
//                                 maximumFractionDigits: 2,
//                               })
//                             : String(value)}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//             {bookingData.serviceType === "rental" &&
//               bookingData.rentalPlan && (
//                 <Card className="p-4 sm:p-6 mt-6">
//                   <CardContent className="p-0">
//                     <h3 className="text-base sm:text-lg font-semibold mb-3 text-blue-600">
//                       Actual usage (for extra charges)
//                     </h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Actual hours used
//                         </label>
//                         <Input
//                           type="number"
//                           min={rentalPlanHoursMap[bookingData.rentalPlan] || 4}
//                           value={actualHours}
//                           onChange={(e) =>
//                             setActualHours(Number(e.target.value))
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Actual distance (km)
//                         </label>
//                         <Input
//                           type="number"
//                           min={rentalPlanKmsMap[bookingData.rentalPlan] || 40}
//                           value={actualDistance}
//                           onChange={(e) =>
//                             setActualDistance(Number(e.target.value))
//                           }
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//             {bookingData.serviceType === "rental" && (
//               <Card className="p-4 sm:p-6">
//                 <CardContent className="p-0">
//                   <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
//                     Rental plans
//                   </h3>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//                     {rentalPlans.map((plan) => (
//                       <button
//                         key={plan.id}
//                         onClick={() =>
//                           updateBookingData("rentalPlan", plan.id)
//                         }
//                         className={`p-3 sm:p-4 rounded-lg border-2 text-center transition-all ${
//                           bookingData.rentalPlan === plan.id
//                             ? "border-blue-500 bg-blue-50 text-blue-700"
//                             : "border-gray-200 hover:border-blue-300"
//                         }`}
//                       >
//                         <div className="font-semibold text-base sm:text-lg">
//                           {plan.name}
//                         </div>
//                         <div className="text-xs sm:text-sm text-gray-600">
//                           {plan.duration}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
//                   Vehicle type
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//                   {vehicleTypes.map((vehicle) => {
//                     const breakdown = fareBreakdowns[vehicle.id];

//                     return (
//                       <button
//                         key={vehicle.id}
//                         onClick={() => {
//                           setBookingData((prev) => ({
//                             ...prev,
//                             vehicleType: vehicle.id,
//                             fare: breakdown?.totalBeforeGST || 0,
//                             gstAmount: breakdown?.gstAmount || 0,
//                             totalFare: breakdown?.totalFareWithGST || 0,
//                           }));
//                         }}
//                         className={`p-4 rounded-lg border-2 transition-all flex flex-col justify-between text-left ${
//                           bookingData.vehicleType === vehicle.id
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200 hover:border-blue-300"
//                         }`}
//                       >
//                         <div className="flex items-start justify-between gap-2">
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={vehicle.image || "/placeholder.svg"}
//                               alt={vehicle.name}
//                               className="w-12 h-10 sm:w-16 sm:h-12 object-fill"
//                             />
//                             <div>
//                               <div className="font-semibold text-sm sm:text-base">
//                                 {vehicle.name}
//                               </div>
//                               <div className="text-xs sm:text-sm text-gray-600">
//                                 {vehicle.capacity}
//                               </div>
//                               <div className="text-xs text-gray-500 line-clamp-2">
//                                 {vehicle.features?.join(" • ")}
//                               </div>
//                             </div>
//                           </div>

//                           <button
//                             type="button"
//                             aria-label={`View details for ${vehicle.name}`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setInfoVehicleId(vehicle.id);
//                             }}
//                             className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 flex-shrink-0"
//                           >
//                             i
//                           </button>
//                         </div>

//                         <div className="mt-3">
//                           {pricesLoading[vehicle.id] ? (
//                             <div className="text-sm text-gray-600">
//                               Calculating...
//                             </div>
//                           ) : prices[vehicle.id] ? (
//                             <div className="text-base sm:text-lg font-semibold">
//                               {prices[vehicle.id]}
//                             </div>
//                           ) : (
//                             <div className="text-base sm:text-lg font-semibold">
//                               {new Intl.NumberFormat("en-IN", {
//                                 style: "currency",
//                                 currency: "INR",
//                               }).format(vehicle.basePrice)}
//                             </div>
//                           )}
//                           <div className="text-xs text-gray-500 mt-1">
//                             {isLocked
//                               ? `${lockedDistanceKm?.toFixed(2)} km`
//                               : distanceKm
//                               ? `${distanceKm.toFixed(2)} km`
//                               : "Price based on route"}
//                           </div>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>

//             <Button
//               onClick={handleBookNow}
//               disabled={isBookNowDisabled}
//               className="w-full bg-blue-500 text-white hover:bg-blue-600 py-4 text-base sm:text-lg font-semibold"
//             >
//               Book now
//             </Button>
//           </div>
//         ) : (
//           <div ref={bookingFormRef} className="space-y-6">
//             {inlineMessage && (
//               <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
//                 {inlineMessage}
//               </div>
//             )}

//             <div className="mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
//                 Complete your {getServiceDisplayName()} booking
//               </h2>
//               <p className="text-sm sm:text-base text-gray-600">
//                 Fill in the details to confirm your booking.
//               </p>
//               {isLocked && (
//                 <div className="mt-4 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-green-800">
//                   <Lock className="w-4 h-4 mr-2" />
//                   <span>Your fare is locked at {prices[bookingData.vehicleType]} for{" "}
//                   {formatDistance(lockedDistanceKm)}</span>
//                 </div>
//               )}
//             </div>
//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-base sm:text-lg font-semibold mb-4">
//                   Who are you booking for?
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => updateBookingData("bookingFor", "self")}
//                     className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${
//                       bookingData.bookingFor === "self"
//                         ? "border-blue-500 bg-blue-50 text-blue-700"
//                         : "border-gray-200 hover:border-blue-300"
//                     }`}
//                   >
//                     <UserCheck className="w-5 h-5" />
//                     <span className="text-sm sm:text-base">For myself</span>
//                   </button>
//                   <button
//                     onClick={() => updateBookingData("bookingFor", "other")}
//                     className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${
//                       bookingData.bookingFor === "other"
//                         ? "border-blue-500 bg-blue-50 text-blue-700"
//                         : "border-gray-200 hover:border-blue-300"
//                     }`}
//                   >
//                     <UserPlus className="w-5 h-5" />
//                     <span className="text-sm sm:text-base">For someone else</span>
//                   </button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0 space-y-4">
//                 <h3 className="text-base sm:text-lg font-semibold">Your details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full name *
//                     </label>
//                     <Input
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={bookingData.customerName}
//                       onChange={(e) =>
//                         updateBookingData("customerName", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone number *
//                     </label>
//                     <Input
//                       type="tel"
//                       placeholder="Enter 10-digit mobile number"
//                       value={bookingData.customerPhone}
//                       onChange={(e) =>
//                         updateBookingData("customerPhone", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email address
//                   </label>
//                   <Input
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={bookingData.customerEmail}
//                     onChange={(e) =>
//                       updateBookingData("customerEmail", e.target.value)
//                     }
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {bookingData.bookingFor === "other" && (
//               <Card className="p-4 sm:p-6">
//                 <CardContent className="p-0 space-y-4">
//                   <h3 className="text-base sm:text-lg font-semibold">Passenger details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Passenger name *
//                       </label>
//                       <Input
//                         type="text"
//                         placeholder="Enter passenger's full name"
//                         value={bookingData.otherPersonName}
//                         onChange={(e) =>
//                           updateBookingData("otherPersonName", e.target.value)
//                         }
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Passenger phone *
//                       </label>
//                       <Input
//                         type="tel"
//                         placeholder="Enter 10-digit mobile number"
//                         value={bookingData.otherPersonPhone}
//                         onChange={(e) =>
//                           updateBookingData(
//                             "otherPersonPhone",
//                             e.target.value
//                           )
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-base sm:text-lg font-semibold mb-4">
//                   Apply coupon code
//                 </h3>
//                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//                   <Input
//                     type="text"
//                     placeholder="Enter coupon code"
//                     value={bookingData.couponCode}
//                     onChange={(e) =>
//                       updateBookingData("couponCode", e.target.value)
//                     }
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={applyCoupon}
//                     variant="outline"
//                     className="bg-transparent w-full sm:w-auto"
//                   >
//                     <Tag className="w-4 h-4 mr-2" /> Apply
//                   </Button>
//                 </div>
//                 <div className="mt-2 text-xs sm:text-sm text-gray-600">
//                   Try: FIRST10, SAVE20, WELCOME15
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//               <Button
//                 onClick={() => setShowBookingForm(false)}
//                 variant="outline"
//                 className="flex-1 bg-transparent"
//               >
//                 Back
//               </Button>
//               <Button
//                 onClick={handleConfirmBooking}
//                 className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Confirming..." : "Confirm booking"}
//               </Button>
//             </div>
//           </div>
//         )}

//         {infoVehicleId && (
//           <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/50 px-4">
//             <div className="w-full max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-lg p-5">
//               {(() => {
//                 const vehicle = allVehicleTypes.find(
//                   (v) => v.id === infoVehicleId
//                 );
//                 const breakdown = vehicle
//                   ? fareBreakdowns[vehicle.id]
//                   : null;

//                 if (!vehicle) return null;

//                 return (
//                   <>
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="text-base sm:text-lg font-semibold">
//                           {vehicle.name}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-gray-600">
//                           {vehicle.capacity} •{" "}
//                           {vehicle.features?.join(" • ")}
//                         </p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setInfoVehicleId(null)}
//                         className="text-sm text-gray-500 hover:text-gray-800"
//                       >
//                         Close
//                       </button>
//                     </div>

//                     {prices[vehicle.id] && (
//                       <div className="mb-3">
//                         <div className="text-xs text-gray-500">
//                           Estimated fare
//                         </div>
//                         <div className="text-lg sm:text-xl font-semibold">
//                           {prices[vehicle.id]}
//                         </div>
//                       </div>
//                     )}

//                     {breakdown && (
//                       <div className="mt-2 border-t pt-3">
//                         <div className="text-sm font-semibold mb-2">
//                           Price breakdown
//                         </div>
//                         <ul className="text-xs sm:text-sm space-y-1">
//                           {Object.entries(breakdown).map(([key, value]) => (
//                             <li
//                               key={key}
//                               className="flex justify-between"
//                             >
//                               <span className="capitalize">
//                                 {key.replace(
//                                   /([a-z])([A-Z])/g,
//                                   "$1 $2"
//                                 )}
//                               </span>
//                               <span className="font-medium">
//                                 {typeof value === "number"
//                                   ? value.toLocaleString("en-IN", {
//                                       maximumFractionDigits: 2,
//                                     })
//                                   : String(value)}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </>
//                 );
//               })()}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

// function loadGoogleMapsScript() {
//   return new Promise<void>((resolve, reject) => {
//     if (typeof window === "undefined")
//       return reject(new Error("Window undefined"));
//     if ((window as any).google && (window as any).google.maps) return resolve();
//     const existing = document.getElementById("gmaps-js");
//     if (existing) {
//       existing.addEventListener("load", () => resolve());
//       return;
//     }
//     const script = document.createElement("script");
//     script.id = "gmaps-js";
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${
//       process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
//     }&libraries=places`;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => resolve();
//     script.onerror = (err) => reject(err);
//     document.head.appendChild(script);
//   });
// }



//testing

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowLeft, Tag, UserCheck, UserPlus, Lock } from "lucide-react";
// import Link from "next/link";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import { useSearchParams, useRouter } from "next/navigation";

// type VehicleType = {
//   id: string;
//   name: string;
//   basePrice: number;
//   image?: string;
//   capacity?: string;
//   features?: string[];
// };

// export default function BookingPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const pickupRef = useRef<HTMLInputElement | null>(null);
//   const dropRef = useRef<HTMLInputElement | null>(null);
//   const bookingFormRef = useRef<HTMLDivElement | null>(null);

//   const serviceType = searchParams.get("service") || "rental";
//   const tripType = searchParams.get("tripType") || "oneway";

//   const urlPickupLat = searchParams.get("pickupLat");
//   const urlPickupLng = searchParams.get("pickupLng");
//   const urlDropLat = searchParams.get("dropLat");
//   const urlDropLng = searchParams.get("dropLng");
//   const urlPickup = searchParams.get("pickup") || "";
//   const urlDrop = searchParams.get("drop") || "";

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [inlineMessage, setInlineMessage] = useState<string | null>(null);

//   const [actualHours, setActualHours] = useState(4);
//   const [actualDistance, setActualDistance] = useState(40);
//   const [totalTripHours, setTotalTripHours] = useState<number | null>(null);
//   const [totalTripMinutes, setTotalTripMinutes] = useState<number | null>(null);
//   const [distanceKm, setDistanceKm] = useState<number | null>(null);
//   const [distanceError, setDistanceError] = useState<string | null>(null);
//   const [prices, setPrices] = useState<Record<string, string>>({});
//   const [pricesLoading, setPricesLoading] = useState<Record<string, boolean>>(
//     {}
//   );
//   const [calculatingDistance, setCalculatingDistance] = useState(false);
//   const [fareBreakdowns, setFareBreakdowns] = useState<Record<string, any>>({});

//   const [lockedDistanceKm, setLockedDistanceKm] = useState<number | null>(null);
//   const [lockedTripMinutes, setLockedTripMinutes] = useState<number | null>(
//     null
//   );
//   const [lockedTripHours, setLockedTripHours] = useState<number | null>(null);
//   const [isLocked, setIsLocked] = useState(false);

//   const [infoVehicleId, setInfoVehicleId] = useState<string | null>(null);

//   const rentalPlans = [
//     { id: "4hr", name: "4 Hr", duration: "40 Kms", hours: 4, kms: 40 },
//     { id: "6hr", name: "6 Hr", duration: "60 Kms", hours: 6, kms: 60 },
//     { id: "8hr", name: "8 Hr", duration: "80 Kms", hours: 8, kms: 80 },
//     { id: "10hr", name: "10 Hr", duration: "100 Kms", hours: 10, kms: 100 },
//     { id: "12hr", name: "12 Hr", duration: "120 Kms", hours: 12, kms: 120 },
//   ];
//   const rentalPlanHoursMap: Record<string, number> = {
//     "4hr": 4,
//     "6hr": 6,
//     "8hr": 8,
//     "10hr": 10,
//     "12hr": 12,
//   };
//   const rentalPlanKmsMap: Record<string, number> = {
//     "4hr": 40,
//     "6hr": 60,
//     "8hr": 80,
//     "10hr": 100,
//     "12hr": 120,
//   };

//   const allVehicleTypes: VehicleType[] = [
//     {
//       id: "mini",
//       name: "Mini",
//       basePrice: 0.0,
//       image: "/green-economy-car.png",
//       capacity: "4 seats",
//       features: ["AC", "Music"],
//     },
//     {
//       id: "sedan",
//       name: "Sedan",
//       basePrice: 0.0,
//       image: "/green-comfort-car-sedan.png",
//       capacity: "4 seats",
//       features: ["AC", "Music", "Premium Interior"],
//     },
//     {
//       id: "suv",
//       name: "SUV",
//       basePrice: 0.0,
//       image: "/taxi-car-on-street-mumbai.png",
//       capacity: "6 seats",
//       features: ["AC", "Music", "Spacious"],
//     },
//     {
//       id: "innova",
//       name: "Innova Crysta",
//       basePrice: 0.0,
//       image: "/green-comfort-car-sedan.png",
//       capacity: "7 seats",
//       features: ["AC", "Music", "Premium", "Extra Space"],
//     },
//   ];

//   const [bookingData, setBookingData] = useState({
//     pickup: urlPickup,
//     pickupLat: urlPickupLat ? parseFloat(urlPickupLat) : null,
//     pickupLng: urlPickupLng ? parseFloat(urlPickupLng) : null,
//     destination: urlDrop,
//     dropLat: urlDropLat ? parseFloat(urlDropLat) : null,
//     dropLng: urlDropLng ? parseFloat(urlDropLng) : null,
//     rentalPlan: "",
//     actualHours: 4,
//     actualDistance: 40,
//     vehicleType: "",
//     pickupDate: searchParams.get("pickupDate") || "",
//     pickupTime: searchParams.get("pickupTime") || "",
//     returnDate: searchParams.get("returnDate") || "",
//     returnTime: searchParams.get("returnTime") || "",
//     passengers: 1,
//     fare: 0,
//     gstAmount: 0,
//     totalFare: 0,
//     notes: "",
//     customerName: "",
//     customerPhone: "",
//     customerEmail: "",
//     couponCode: "",
//     discount: 0,
//     bookingFor: "self",
//     otherPersonName: "",
//     otherPersonPhone: "",
//     paymentMethod: "online",
//     serviceType: serviceType,
//     tripType: tripType,
//   });

//   const BACKEND_URL =
//     process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

//   // Filter vehicles based on service type
//   const vehicleTypes = bookingData.serviceType === "flexi" 
//     ? allVehicleTypes.filter(v => v.id !== "innova")
//     : allVehicleTypes;

//   const getServiceDisplayName = (): string => {
//     switch (bookingData.serviceType) {
//       case "flexi":
//         return "Flexi Ride";
//       case "rental":
//         return "Rental Service";
//       case "outstation":
//         return bookingData.tripType === "roundtrip"
//           ? "Outstation Round Trip"
//           : "Outstation One Way";
//       default:
//         return "Rental Service";
//     }
//   };

//   const updateBookingData = (field: string, value: any) => {
//     setBookingData((prev) => ({ ...prev, [field]: value }));
//   };

//   const detectCity = (pickup: string) => {
//     if (pickup.toLowerCase().includes("pune")) return "Pune";
//     if (pickup.toLowerCase().includes("bhopal")) return "Bhopal";
//     return "Mumbai";
//   };

//   const computeDistanceAndPrices = async (customRentalPlan?: string) => {
//     const pickup = bookingData.pickup?.trim();
//     const destination = bookingData.destination?.trim();

//     if (
//       !pickup ||
//       !destination ||
//       !bookingData.pickupLat ||
//       !bookingData.dropLat
//     ) {
//       setDistanceError("Invalid booking data. Please go back to home page.");
//       return;
//     }

//     try {
//       setCalculatingDistance(true);
//       setDistanceError(null);

//       const distanceResponse = await fetch(
//         `${BACKEND_URL}/routes/calculate-distance?` +
//           `pickupLat=${bookingData.pickupLat}&` +
//           `pickupLng=${bookingData.pickupLng}&` +
//           `dropLat=${bookingData.dropLat}&` +
//           `dropLng=${bookingData.dropLng}&` +
//           `serviceType=${bookingData.serviceType}&` +
//           `tripType=${bookingData.tripType}`
//       );

//       const distanceData = await distanceResponse.json();

//       if (!distanceResponse.ok || !distanceData.success) {
//         throw new Error(distanceData.error || "Failed to calculate distance");
//       }

//       const backendKm = distanceData.distanceKm;
//       const backendMinutes = distanceData.durationMinutes;
//       const backendHours = distanceData.durationHours;

//       setLockedDistanceKm(backendKm);
//       setLockedTripMinutes(backendMinutes);
//       setLockedTripHours(backendHours);
//       setIsLocked(true);

//       setDistanceKm(backendKm);
//       setTotalTripMinutes(backendMinutes);
//       setTotalTripHours(backendHours);

//       const planId = customRentalPlan || bookingData.rentalPlan;
//       const newPrices: Record<string, string> = {};
//       const newBreakdowns: Record<string, any> = {};

//       await Promise.all(
//         vehicleTypes.map(async (v) => {
//           setPricesLoading((prev) => ({ ...prev, [v.id]: true }));
//           try {
//             const urlParams = new URLSearchParams();
//             urlParams.append("distance", backendKm.toString());
//             urlParams.append("vehicleType", v.id);
//             urlParams.append("city", detectCity(pickup));
//             urlParams.append("serviceType", bookingData.serviceType);
//             urlParams.append(
//               "pickupLat",
//               bookingData.pickupLat?.toString() || ""
//             );
//             urlParams.append(
//               "pickupLng",
//               bookingData.pickupLng?.toString() || ""
//             );
//             urlParams.append(
//               "dropLat",
//               bookingData.dropLat?.toString() || ""
//             );
//             urlParams.append(
//               "dropLng",
//               bookingData.dropLng?.toString() || ""
//             );
//             urlParams.append("tripType", bookingData.tripType || "oneway");
//             urlParams.append("pickupDate", bookingData.pickupDate || "");
//             urlParams.append("pickupTime", bookingData.pickupTime || "");

//             if (bookingData.tripType === "roundtrip") {
//               urlParams.append("returnDate", bookingData.returnDate || "");
//               urlParams.append("returnTime", bookingData.returnTime || "");
//             }
//             if (
//               bookingData.serviceType === "outstation" &&
//               bookingData.tripType === "roundtrip"
//             ) {
//               urlParams.append("tripHours", backendHours.toString());
//             }
//             if (bookingData.serviceType === "rental") {
//               urlParams.append(
//                 "rentalHours",
//                 String(rentalPlanHoursMap[planId] || 4)
//               );
//               urlParams.append(
//                 "actualHours",
//                 actualHours
//                   ? String(actualHours)
//                   : String(rentalPlanHoursMap[planId] || 4)
//               );
//             }
//             if (bookingData.serviceType === "flexi") {
//               urlParams.append(
//                 "actualTripMinutes",
//                 backendMinutes.toString()
//               );
//             }

//             const url = `${BACKEND_URL}/routes/calculate-price?${urlParams.toString()}`;
//             const res = await fetch(url);
//             const data = await res.json();

//             if (res.ok && data.totalFare) {
//               newPrices[v.id] = new Intl.NumberFormat("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               }).format(data.totalFare);
//               newBreakdowns[v.id] = data.breakdown || {};
//             } else {
//               newPrices[v.id] = new Intl.NumberFormat("en-IN", {
//                 style: "currency",
//                 currency: "INR",
//               }).format(v.basePrice);
//               newBreakdowns[v.id] = {};
//               if (data.error) setDistanceError(String(data.error));
//             }
//           } catch {
//             newPrices[v.id] = new Intl.NumberFormat("en-IN", {
//               style: "currency",
//               currency: "INR",
//             }).format(v.basePrice);
//             newBreakdowns[v.id] = {};
//           } finally {
//             setPricesLoading((prev) => ({ ...prev, [v.id]: false }));
//           }
//         })
//       );

//       setPrices(newPrices);
//       setFareBreakdowns(newBreakdowns);
//       setCalculatingDistance(false);
//     } catch {
//       setDistanceError("Error calculating distance. Please try again.");
//       setDistanceKm(null);
//       setTotalTripHours(null);
//       setTotalTripMinutes(null);

//       const fallbackPrices: Record<string, string> = {};
//       vehicleTypes.forEach((v) => {
//         fallbackPrices[v.id] = new Intl.NumberFormat("en-IN", {
//           style: "currency",
//           currency: "INR",
//         }).format(v.basePrice);
//       });
//       setPrices(fallbackPrices);
//       setCalculatingDistance(false);
//     }
//   };

//   useEffect(() => {
//     computeDistanceAndPrices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (bookingData.serviceType === "rental" && bookingData.rentalPlan) {
//       setActualHours(rentalPlanHoursMap[bookingData.rentalPlan] || 4);
//       setActualDistance(rentalPlanKmsMap[bookingData.rentalPlan] || 40);
//       computeDistanceAndPrices(bookingData.rentalPlan);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [bookingData.rentalPlan, bookingData.serviceType]);

//   const formatDistance = (km: number | null) =>
//     km === null ? "—" : `${km.toFixed(2)} km`;
//   const formatTimeHours = (hours: number | null) =>
//     hours !== null ? `${hours.toFixed(2)} hr` : "---";
//   const formatTimeMins = (mins: number | null) =>
//     mins !== null ? `${mins} min` : "---";

//   const applyCoupon = () => {
//     const coupons: Record<string, number> = {
//       FIRST10: 10,
//       SAVE20: 20,
//       WELCOME15: 15,
//     };
//     const discount = coupons[bookingData.couponCode.toUpperCase()] || 0;
//     updateBookingData("discount", discount);
//     if (discount > 0) {
//       alert(`Coupon applied! You saved ${discount}%`);
//     } else {
//       alert("Invalid coupon code");
//     }
//   };

//   const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

//   const handleBookNow = () => {
//     if (bookingData.serviceType === "rental" && !bookingData.rentalPlan) {
//       alert("Please select a rental plan");
//       return;
//     }
//     if (!bookingData.vehicleType) {
//       alert("Please select a vehicle type");
//       return;
//     }

//     setShowBookingForm(true);
//   };

//   const handleConfirmBooking = async () => {
//     if (
//       !bookingData.customerName ||
//       !bookingData.customerPhone ||
//       !isValidPhone(bookingData.customerPhone)
//     ) {
//       alert("Please fill in all required fields");
//       return;
//     }
//     if (
//       bookingData.bookingFor === "other" &&
//       (!bookingData.otherPersonName ||
//         !bookingData.otherPersonPhone ||
//         !isValidPhone(bookingData.otherPersonPhone))
//     ) {
//       alert("Please provide details for the person you're booking for");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await fetch(`${BACKEND_URL}/routes/save-booking`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...bookingData,
//           distanceKm: lockedDistanceKm,
//           tripHours: lockedTripHours,
//           actualTripMinutes:
//             bookingData.serviceType === "flexi"
//               ? lockedTripMinutes
//               : undefined,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Thank you, your booking has been confirmed.");
//         router.push("/thank-you");
//       } else {
//         alert(
//           data.error ||
//             "There was an error confirming your booking. Please try again."
//         );
//       }
//     } catch {
//       alert("Network error while confirming booking.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isBookNowDisabled =
//     (bookingData.serviceType === "rental" && !bookingData.rentalPlan) ||
//     !bookingData.vehicleType;

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         <div className="flex items-center mb-6">
//           <Link
//             href="/"
//             className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             <span className="text-sm sm:text-base">Back to home</span>
//           </Link>
//         </div>

//        <Card className="p-4 sm:p-6 mb-4">
//   <CardContent className="p-0">
//     <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600 text-left">
//       Pick your locations
//     </h3>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
//           Pickup location
//         </label>
//         <Input
//           value={bookingData.pickup}
//           readOnly
//           className="flex-1 bg-gray-50 cursor-not-allowed"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
//           Drop location
//         </label>
//         <Input
//           value={bookingData.destination}
//           readOnly
//           className="bg-gray-50 cursor-not-allowed"
//         />
//       </div>
//     </div>

//     <div className="flex justify-between items-center mt-3">
//       <button
//         type="button"
//         onClick={() => {
//           // send user back to booking interface to change addresses
//           router.push("/");
//         }}
//         className="text-xs font-medium text-blue-600 hover:text-blue-800"
//       >
//         Change locations
//       </button>
//     </div>

//     {bookingData.serviceType === "outstation" && (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
//             Pickup date & time *
//           </label>
//           <input
//             className="border p-2 rounded w-full text-sm"
//             type="date"
//             value={bookingData.pickupDate}
//             onChange={(e) => updateBookingData("pickupDate", e.target.value)}
//           />
//           <input
//             className="border p-2 rounded w-full mt-1 text-sm"
//             type="time"
//             value={bookingData.pickupTime}
//             onChange={(e) => updateBookingData("pickupTime", e.target.value)}
//           />
//         </div>
//         {bookingData.tripType === "roundtrip" && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
//               Return date & time *
//             </label>
//             <input
//               className="border p-2 rounded w-full text-sm"
//               type="date"
//               value={bookingData.returnDate}
//               onChange={(e) => updateBookingData("returnDate", e.target.value)}
//             />
//             <input
//               className="border p-2 rounded w-full mt-1 text-sm"
//               type="time"
//               value={bookingData.returnTime}
//               onChange={(e) => updateBookingData("returnTime", e.target.value)}
//             />
//           </div>
//         )}
//       </div>
//     )}

//     {bookingData.serviceType === "outstation" &&
//       bookingData.tripType === "roundtrip" && (
//         <div className="mt-2 text-sm text-blue-800 text-left">
//           Estimated total time{" "}
//           <b>
//             {formatTimeHours(lockedTripHours || totalTripHours)} (
//             {formatTimeMins(lockedTripMinutes || totalTripMinutes)})
//           </b>
//         </div>
//       )}

//     {(!bookingData.pickup ||
//       !bookingData.destination ||
//       !bookingData.pickupLat ||
//       !bookingData.dropLat) && (
//       <div className="text-xs text-red-500 mt-2 text-left">
//         Please go back and select valid pickup and drop locations on the
//         booking screen.
//       </div>
//     )}
//   </CardContent>
// </Card>


//         {!showBookingForm ? (
//           <div className="space-y-6">
//             <div className="mb-6">
//               <div className="mt-4">
//                 <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2">
//                   <span className="text-blue-700 font-medium text-sm sm:text-base">
//                     Service: {getServiceDisplayName()}
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="text-sm text-gray-600">
//               <div className="flex flex-wrap gap-2 items-center">
//                 <span className="font-medium">Distance:</span>{" "}
//                 <span>
//                   {calculatingDistance
//                     ? "Calculating..."
//                     : isLocked
//                     ? formatDistance(lockedDistanceKm)
//                     : formatDistance(distanceKm)}
//                 </span>
//                 <span className="text-gray-400">•</span>
//                 <span className="font-medium">Duration:</span>{" "}
//                 <span>
//                   {calculatingDistance
//                     ? "Calculating..."
//                     : isLocked
//                     ? formatTimeMins(lockedTripMinutes)
//                     : formatTimeMins(totalTripMinutes)}
//                 </span>
//               </div>
//               {distanceError && (
//                 <div className="text-xs text-red-600 mt-1">
//                   {distanceError}
//                 </div>
//               )}
//             </div>
            
//             <div className="text-xl sm:text-2xl font-bold text-blue-900">
//               {pricesLoading[bookingData.vehicleType]
//                 ? "Calculating..."
//                 : prices[bookingData.vehicleType]
//                 ? prices[bookingData.vehicleType]
//                 : ""}
//             </div>
//             {bookingData.serviceType === "rental" &&
//               bookingData.rentalPlan && (
//                 <Card className="p-4 sm:p-6 mt-6">
//                   <CardContent className="p-0">
//                     <h3 className="text-base sm:text-lg font-semibold mb-3 text-blue-600">
//                       Actual usage (for extra charges)
//                     </h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Actual hours used
//                         </label>
//                         <Input
//                           type="number"
//                           min={rentalPlanHoursMap[bookingData.rentalPlan] || 4}
//                           value={actualHours}
//                           onChange={(e) =>
//                             setActualHours(Number(e.target.value))
//                           }
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Actual distance (km)
//                         </label>
//                         <Input
//                           type="number"
//                           min={rentalPlanKmsMap[bookingData.rentalPlan] || 40}
//                           value={actualDistance}
//                           onChange={(e) =>
//                             setActualDistance(Number(e.target.value))
//                           }
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//             {bookingData.serviceType === "rental" && (
//               <Card className="p-4 sm:p-6">
//                 <CardContent className="p-0">
//                   <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
//                     Rental plans
//                   </h3>
//                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//                     {rentalPlans.map((plan) => (
//                       <button
//                         key={plan.id}
//                         onClick={() =>
//                           updateBookingData("rentalPlan", plan.id)
//                         }
//                         className={`p-3 sm:p-4 rounded-lg border-2 text-center transition-all ${
//                           bookingData.rentalPlan === plan.id
//                             ? "border-blue-500 bg-blue-50 text-blue-700"
//                             : "border-gray-200 hover:border-blue-300"
//                         }`}
//                       >
//                         <div className="font-semibold text-base sm:text-lg">
//                           {plan.name}
//                         </div>
//                         <div className="text-xs sm:text-sm text-gray-600">
//                           {plan.duration}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
//                   Vehicle type
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
//                   {vehicleTypes.map((vehicle) => {
//                     const breakdown = fareBreakdowns[vehicle.id];

//                     return (
//                       <button
//                         key={vehicle.id}
//                         onClick={() => {
//                           setBookingData((prev) => ({
//                             ...prev,
//                             vehicleType: vehicle.id,
//                             fare: breakdown?.totalBeforeGST || 0,
//                             gstAmount: breakdown?.gstAmount || 0,
//                             totalFare: breakdown?.totalFareWithGST || 0,
//                           }));
//                         }}
//                         className={`p-4 rounded-lg border-2 transition-all flex flex-col justify-between text-left ${
//                           bookingData.vehicleType === vehicle.id
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200 hover:border-blue-300"
//                         }`}
//                       >
//                         <div className="flex items-start justify-between gap-2">
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={vehicle.image || "/placeholder.svg"}
//                               alt={vehicle.name}
//                               className="w-12 h-10 sm:w-16 sm:h-12 object-fill"
//                             />
//                             <div>
//                               <div className="font-semibold text-sm sm:text-base">
//                                 {vehicle.name}
//                               </div>
//                               <div className="text-xs sm:text-sm text-gray-600">
//                                 {vehicle.capacity}
//                               </div>
//                               <div className="text-xs text-gray-500 line-clamp-2">
//                                 {vehicle.features?.join(" • ")}
//                               </div>
//                             </div>
//                           </div>

//                           <button
//                             type="button"
//                             aria-label={`View details for ${vehicle.name}`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setInfoVehicleId(vehicle.id);
//                             }}
//                             className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 flex-shrink-0"
//                           >
//                             i
//                           </button>
//                         </div>

//                         <div className="mt-3">
//                           {pricesLoading[vehicle.id] ? (
//                             <div className="text-sm text-gray-600">
//                               Calculating...
//                             </div>
//                           ) : prices[vehicle.id] ? (
//                             <div className="text-base sm:text-lg font-semibold">
//                               {prices[vehicle.id]}
//                             </div>
//                           ) : (
//                             <div className="text-base sm:text-lg font-semibold">
//                               {new Intl.NumberFormat("en-IN", {
//                                 style: "currency",
//                                 currency: "INR",
//                               }).format(vehicle.basePrice)}
//                             </div>
//                           )}
//                           <div className="text-xs text-gray-500 mt-1">
//                             {isLocked
//                               ? `${lockedDistanceKm?.toFixed(2)} km`
//                               : distanceKm
//                               ? `${distanceKm.toFixed(2)} km`
//                               : "Price based on route"}
//                           </div>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>

//             <Button
//               onClick={handleBookNow}
//               disabled={isBookNowDisabled}
//               className="w-full bg-blue-500 text-white hover:bg-blue-600 py-4 text-base sm:text-lg font-semibold"
//             >
//               Book now
//             </Button>
//           </div>
//         ) : (
//           <div ref={bookingFormRef} className="space-y-6">
//             {inlineMessage && (
//               <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
//                 {inlineMessage}
//               </div>
//             )}

//             <div className="mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
//                 Complete your {getServiceDisplayName()} booking
//               </h2>
//               <p className="text-sm sm:text-base text-gray-600">
//                 Fill in the details to confirm your booking.
//               </p>
//               {isLocked && (
//                 <div className="mt-4 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-green-800">
//                   <Lock className="w-4 h-4 mr-2" />
//                   <span>Your fare is locked at {prices[bookingData.vehicleType]} for{" "}
//                   {formatDistance(lockedDistanceKm)}</span>
//                 </div>
//               )}
//             </div>
//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-base sm:text-lg font-semibold mb-4">
//                   Who are you booking for?
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => updateBookingData("bookingFor", "self")}
//                     className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${
//                       bookingData.bookingFor === "self"
//                         ? "border-blue-500 bg-blue-50 text-blue-700"
//                         : "border-gray-200 hover:border-blue-300"
//                     }`}
//                   >
//                     <UserCheck className="w-5 h-5" />
//                     <span className="text-sm sm:text-base">For myself</span>
//                   </button>
//                   <button
//                     onClick={() => updateBookingData("bookingFor", "other")}
//                     className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${
//                       bookingData.bookingFor === "other"
//                         ? "border-blue-500 bg-blue-50 text-blue-700"
//                         : "border-gray-200 hover:border-blue-300"
//                     }`}
//                   >
//                     <UserPlus className="w-5 h-5" />
//                     <span className="text-sm sm:text-base">For someone else</span>
//                   </button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0 space-y-4">
//                 <h3 className="text-base sm:text-lg font-semibold">Your details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full name *
//                     </label>
//                     <Input
//                       type="text"
//                       placeholder="Enter your full name"
//                       value={bookingData.customerName}
//                       onChange={(e) =>
//                         updateBookingData("customerName", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone number *
//                     </label>
//                     <Input
//                       type="tel"
//                       placeholder="Enter 10-digit mobile number"
//                       value={bookingData.customerPhone}
//                       onChange={(e) =>
//                         updateBookingData("customerPhone", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email address
//                   </label>
//                   <Input
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={bookingData.customerEmail}
//                     onChange={(e) =>
//                       updateBookingData("customerEmail", e.target.value)
//                     }
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {bookingData.bookingFor === "other" && (
//               <Card className="p-4 sm:p-6">
//                 <CardContent className="p-0 space-y-4">
//                   <h3 className="text-base sm:text-lg font-semibold">Passenger details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Passenger name *
//                       </label>
//                       <Input
//                         type="text"
//                         placeholder="Enter passenger's full name"
//                         value={bookingData.otherPersonName}
//                         onChange={(e) =>
//                           updateBookingData("otherPersonName", e.target.value)
//                         }
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Passenger phone *
//                       </label>
//                       <Input
//                         type="tel"
//                         placeholder="Enter 10-digit mobile number"
//                         value={bookingData.otherPersonPhone}
//                         onChange={(e) =>
//                           updateBookingData(
//                             "otherPersonPhone",
//                             e.target.value
//                           )
//                         }
//                         required
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             <Card className="p-4 sm:p-6">
//               <CardContent className="p-0">
//                 <h3 className="text-base sm:text-lg font-semibold mb-4">
//                   Apply coupon code
//                 </h3>
//                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//                   <Input
//                     type="text"
//                     placeholder="Enter coupon code"
//                     value={bookingData.couponCode}
//                     onChange={(e) =>
//                       updateBookingData("couponCode", e.target.value)
//                     }
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={applyCoupon}
//                     variant="outline"
//                     className="bg-transparent w-full sm:w-auto"
//                   >
//                     <Tag className="w-4 h-4 mr-2" /> Apply
//                   </Button>
//                 </div>
//                 <div className="mt-2 text-xs sm:text-sm text-gray-600">
//                   Try: FIRST10, SAVE20, WELCOME15
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//               <Button
//                 onClick={() => setShowBookingForm(false)}
//                 variant="outline"
//                 className="flex-1 bg-transparent"
//               >
//                 Back
//               </Button>
//               <Button
//                 onClick={handleConfirmBooking}
//                 className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Confirming..." : "Confirm booking"}
//               </Button>
//             </div>
//           </div>
//         )}

//         {infoVehicleId && (
//           <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/50 px-4">
//             <div className="w-full max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-lg p-5">
//               {(() => {
//                 const vehicle = allVehicleTypes.find(
//                   (v) => v.id === infoVehicleId
//                 );
//                 const breakdown = vehicle
//                   ? fareBreakdowns[vehicle.id]
//                   : null;

//                 if (!vehicle) return null;

//                 return (
//                   <>
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <h3 className="text-base sm:text-lg font-semibold">
//                           {vehicle.name}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-gray-600">
//                           {vehicle.capacity} •{" "}
//                           {vehicle.features?.join(" • ")}
//                         </p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setInfoVehicleId(null)}
//                         className="text-sm text-gray-500 hover:text-gray-800"
//                       >
//                         Close
//                       </button>
//                     </div>

//                     {prices[vehicle.id] && (
//                       <div className="mb-3">
//                         <div className="text-xs text-gray-500">
//                           Estimated fare
//                         </div>
//                         <div className="text-lg sm:text-xl font-semibold">
//                           {prices[vehicle.id]}
//                         </div>
//                       </div>
//                     )}

//                     {breakdown && (
//                       <div className="mt-2 border-t pt-3">
//                         <div className="text-sm font-semibold mb-2">
//                           Price breakdown
//                         </div>
//                         <ul className="text-xs sm:text-sm space-y-1">
//                           {Object.entries(breakdown).map(([key, value]) => (
//                             <li
//                               key={key}
//                               className="flex justify-between"
//                             >
//                               <span className="capitalize">
//                                 {key.replace(
//                                   /([a-z])([A-Z])/g,
//                                   "$1 $2"
//                                 )}
//                               </span>
//                               <span className="font-medium">
//                                 {typeof value === "number"
//                                   ? value.toLocaleString("en-IN", {
//                                       maximumFractionDigits: 2,
//                                     })
//                                   : String(value)}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </>
//                 );
//               })()}
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }


// function loadGoogleMapsScript() {
//   return new Promise<void>((resolve, reject) => {
//     if (typeof window === "undefined")
//       return reject(new Error("Window undefined"));
//     if ((window as any).google && (window as any).google.maps) return resolve();
//     const existing = document.getElementById("gmaps-js");
//     if (existing) {
//       existing.addEventListener("load", () => resolve());
//       return;
//     }
//     const script = document.createElement("script");
//     script.id = "gmaps-js";
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${
//       process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
//     }&libraries=places`;
//     script.async = true;
//     script.defer = true;
//     script.onload = () => resolve();
//     script.onerror = (err) => reject(err);
//     document.head.appendChild(script);
//   });
// }


//testing for responvie


"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Tag, UserCheck, UserPlus, Lock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useSearchParams, useRouter } from "next/navigation";

type VehicleType = {
  id: string;
  name: string;
  basePrice: number;
  image?: string;
  capacity?: string;
  features?: string[];
};

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pickupRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLInputElement | null>(null);
  const bookingFormRef = useRef<HTMLDivElement | null>(null);

  const serviceType = searchParams.get("service") || "rental";
  const tripType = searchParams.get("tripType") || "oneway";

  const urlPickupLat = searchParams.get("pickupLat");
  const urlPickupLng = searchParams.get("pickupLng");
  const urlDropLat = searchParams.get("dropLat");
  const urlDropLng = searchParams.get("dropLng");
  const urlPickup = searchParams.get("pickup") || "";
  const urlDrop = searchParams.get("drop") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [inlineMessage, setInlineMessage] = useState<string | null>(null);

  const [actualHours, setActualHours] = useState(4);
  const [actualDistance, setActualDistance] = useState(40);
  const [totalTripHours, setTotalTripHours] = useState<number | null>(null);
  const [totalTripMinutes, setTotalTripMinutes] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [pricesLoading, setPricesLoading] = useState<Record<string, boolean>>(
    {}
  );
  const [calculatingDistance, setCalculatingDistance] = useState(false);
  const [fareBreakdowns, setFareBreakdowns] = useState<Record<string, any>>({});

  const [lockedDistanceKm, setLockedDistanceKm] = useState<number | null>(null);
  const [lockedTripMinutes, setLockedTripMinutes] = useState<number | null>(
    null
  );
  const [lockedTripHours, setLockedTripHours] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const [infoVehicleId, setInfoVehicleId] = useState<string | null>(null);

  const rentalPlans = [
    { id: "4hr", name: "4 Hr", duration: "40 Kms", hours: 4, kms: 40 },
    { id: "6hr", name: "6 Hr", duration: "60 Kms", hours: 6, kms: 60 },
    { id: "8hr", name: "8 Hr", duration: "80 Kms", hours: 8, kms: 80 },
    { id: "10hr", name: "10 Hr", duration: "100 Kms", hours: 10, kms: 100 },
    { id: "12hr", name: "12 Hr", duration: "120 Kms", hours: 12, kms: 120 },
  ];
  const rentalPlanHoursMap: Record<string, number> = {
    "4hr": 4,
    "6hr": 6,
    "8hr": 8,
    "10hr": 10,
    "12hr": 12,
  };
  const rentalPlanKmsMap: Record<string, number> = {
    "4hr": 40,
    "6hr": 60,
    "8hr": 80,
    "10hr": 100,
    "12hr": 120,
  };

  const allVehicleTypes: VehicleType[] = [
    {
      id: "mini",
      name: "Mini",
      basePrice: 0.0,
      image: "/green-economy-car.png",
      capacity: "4 seats",
      features: ["AC", "Music"],
    },
    {
      id: "sedan",
      name: "Sedan",
      basePrice: 0.0,
      image: "/green-comfort-car-sedan.png",
      capacity: "4 seats",
      features: ["AC", "Music", "Premium Interior"],
    },
    {
      id: "suv",
      name: "SUV",
      basePrice: 0.0,
      image: "/taxi-car-on-street-mumbai.png",
      capacity: "6 seats",
      features: ["AC", "Music", "Spacious"],
    },
    {
      id: "innova",
      name: "Innova Crysta",
      basePrice: 0.0,
      image: "/green-comfort-car-sedan.png",
      capacity: "7 seats",
      features: ["AC", "Music", "Premium", "Extra Space"],
    },
  ];

  const [bookingData, setBookingData] = useState({
    pickup: urlPickup,
    pickupLat: urlPickupLat ? parseFloat(urlPickupLat) : null,
    pickupLng: urlPickupLng ? parseFloat(urlPickupLng) : null,
    destination: urlDrop,
    dropLat: urlDropLat ? parseFloat(urlDropLat) : null,
    dropLng: urlDropLng ? parseFloat(urlDropLng) : null,
    rentalPlan: "",
    actualHours: 4,
    actualDistance: 40,
    vehicleType: "",
    pickupDate: searchParams.get("pickupDate") || "",
    pickupTime: searchParams.get("pickupTime") || "",
    returnDate: searchParams.get("returnDate") || "",
    returnTime: searchParams.get("returnTime") || "",
    passengers: 1,
    fare: 0,
    gstAmount: 0,
    totalFare: 0,
    notes: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    couponCode: "",
    discount: 0,
    bookingFor: "self",
    otherPersonName: "",
    otherPersonPhone: "",
    paymentMethod: "online",
    serviceType: serviceType,
    tripType: tripType,
  });

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const vehicleTypes =
    bookingData.serviceType === "flexi"
      ? allVehicleTypes.filter((v) => v.id !== "innova")
      : allVehicleTypes;

  const getServiceDisplayName = (): string => {
    switch (bookingData.serviceType) {
      case "flexi":
        return "Flexi Ride";
      case "rental":
        return "Rental Service";
      case "outstation":
        return bookingData.tripType === "roundtrip"
          ? "Outstation Round Trip"
          : "Outstation One Way";
      default:
        return "Rental Service";
    }
  };

  const updateBookingData = (field: string, value: any) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const detectCity = (pickup: string) => {
    if (pickup.toLowerCase().includes("pune")) return "Pune";
    if (pickup.toLowerCase().includes("bhopal")) return "Bhopal";
    return "Mumbai";
  };

  const computeDistanceAndPrices = async (customRentalPlan?: string) => {
    const pickup = bookingData.pickup?.trim();
    const destination = bookingData.destination?.trim();

    if (!pickup || !destination || !bookingData.pickupLat || !bookingData.dropLat) {
      setDistanceError("Invalid booking data. Please go back to home page.");
      return;
    }

    try {
      setCalculatingDistance(true);
      setDistanceError(null);

      const distanceResponse = await fetch(
        `${BACKEND_URL}/routes/calculate-distance?` +
          `pickupLat=${bookingData.pickupLat}&` +
          `pickupLng=${bookingData.pickupLng}&` +
          `dropLat=${bookingData.dropLat}&` +
          `dropLng=${bookingData.dropLng}&` +
          `serviceType=${bookingData.serviceType}&` +
          `tripType=${bookingData.tripType}`
      );

      const distanceData = await distanceResponse.json();

      if (!distanceResponse.ok || !distanceData.success) {
        throw new Error(distanceData.error || "Failed to calculate distance");
      }

      const backendKm = distanceData.distanceKm;
      const backendMinutes = distanceData.durationMinutes;
      const backendHours = distanceData.durationHours;

      setLockedDistanceKm(backendKm);
      setLockedTripMinutes(backendMinutes);
      setLockedTripHours(backendHours);
      setIsLocked(true);

      setDistanceKm(backendKm);
      setTotalTripMinutes(backendMinutes);
      setTotalTripHours(backendHours);

      const planId = customRentalPlan || bookingData.rentalPlan;
      const newPrices: Record<string, string> = {};
      const newBreakdowns: Record<string, any> = {};

      await Promise.all(
        vehicleTypes.map(async (v) => {
          setPricesLoading((prev) => ({ ...prev, [v.id]: true }));
          try {
            const urlParams = new URLSearchParams();
            urlParams.append("distance", backendKm.toString());
            urlParams.append("vehicleType", v.id);
            urlParams.append("city", detectCity(pickup));
            urlParams.append("serviceType", bookingData.serviceType);
            urlParams.append(
              "pickupLat",
              bookingData.pickupLat?.toString() || ""
            );
            urlParams.append(
              "pickupLng",
              bookingData.pickupLng?.toString() || ""
            );
            urlParams.append("dropLat", bookingData.dropLat?.toString() || "");
            urlParams.append("dropLng", bookingData.dropLng?.toString() || "");
            urlParams.append("tripType", bookingData.tripType || "oneway");
            urlParams.append("pickupDate", bookingData.pickupDate || "");
            urlParams.append("pickupTime", bookingData.pickupTime || "");

            if (bookingData.tripType === "roundtrip") {
              urlParams.append("returnDate", bookingData.returnDate || "");
              urlParams.append("returnTime", bookingData.returnTime || "");
            }
            if (
              bookingData.serviceType === "outstation" &&
              bookingData.tripType === "roundtrip"
            ) {
              urlParams.append("tripHours", backendHours.toString());
            }
            if (bookingData.serviceType === "rental") {
              urlParams.append(
                "rentalHours",
                String(rentalPlanHoursMap[planId] || 4)
              );
              urlParams.append(
                "actualHours",
                actualHours
                  ? String(actualHours)
                  : String(rentalPlanHoursMap[planId] || 4)
              );
            }
            if (bookingData.serviceType === "flexi") {
              urlParams.append(
                "actualTripMinutes",
                backendMinutes.toString()
              );
            }

            const url = `${BACKEND_URL}/routes/calculate-price?${urlParams.toString()}`;
            const res = await fetch(url);
            const data = await res.json();

            if (res.ok && data.totalFare) {
              newPrices[v.id] = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data.totalFare);
              newBreakdowns[v.id] = data.breakdown || {};
            } else {
              newPrices[v.id] = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(v.basePrice);
              newBreakdowns[v.id] = {};
              if (data.error) setDistanceError(String(data.error));
            }
          } catch {
            newPrices[v.id] = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(v.basePrice);
            newBreakdowns[v.id] = {};
          } finally {
            setPricesLoading((prev) => ({ ...prev, [v.id]: false }));
          }
        })
      );

      setPrices(newPrices);
      setFareBreakdowns(newBreakdowns);
      setCalculatingDistance(false);
    } catch {
      setDistanceError("Error calculating distance. Please try again.");
      setDistanceKm(null);
      setTotalTripHours(null);
      setTotalTripMinutes(null);

      const fallbackPrices: Record<string, string> = {};
      vehicleTypes.forEach((v) => {
        fallbackPrices[v.id] = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(v.basePrice);
      });
      setPrices(fallbackPrices);
      setCalculatingDistance(false);
    }
  };

  useEffect(() => {
    computeDistanceAndPrices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (bookingData.serviceType === "rental" && bookingData.rentalPlan) {
      setActualHours(rentalPlanHoursMap[bookingData.rentalPlan] || 4);
      setActualDistance(rentalPlanKmsMap[bookingData.rentalPlan] || 40);
      computeDistanceAndPrices(bookingData.rentalPlan);
    }
  }, [bookingData.rentalPlan, bookingData.serviceType]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDistance = (km: number | null) =>
    km === null ? "—" : `${km.toFixed(2)} km`;
  const formatTimeHours = (hours: number | null) =>
    hours !== null ? `${hours.toFixed(2)} hr` : "---";
  const formatTimeMins = (mins: number | null) =>
    mins !== null ? `${mins} min` : "---";

  const applyCoupon = () => {
    const coupons: Record<string, number> = {
      FIRST10: 10,
      SAVE20: 20,
      WELCOME15: 15,
    };
    const discount = coupons[bookingData.couponCode.toUpperCase()] || 0;
    updateBookingData("discount", discount);
    if (discount > 0) {
      alert(`Coupon applied! You saved ${discount}%`);
    } else {
      alert("Invalid coupon code");
    }
  };

  const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

  const handleBookNow = () => {
    if (bookingData.serviceType === "rental" && !bookingData.rentalPlan) {
      alert("Please select a rental plan");
      return;
    }
    if (!bookingData.vehicleType) {
      alert("Please select a vehicle type");
      return;
    }

    setShowBookingForm(true);
  };

  const handleConfirmBooking = async () => {
    if (
      !bookingData.customerName ||
      !bookingData.customerPhone ||
      !isValidPhone(bookingData.customerPhone)
    ) {
      alert("Please fill in all required fields");
      return;
    }
    if (
      bookingData.bookingFor === "other" &&
      (!bookingData.otherPersonName ||
        !bookingData.otherPersonPhone ||
        !isValidPhone(bookingData.otherPersonPhone))
    ) {
      alert("Please provide details for the person you're booking for");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BACKEND_URL}/routes/save-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          distanceKm: lockedDistanceKm,
          tripHours: lockedTripHours,
          actualTripMinutes:
            bookingData.serviceType === "flexi"
              ? lockedTripMinutes
              : undefined,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Thank you, your booking has been confirmed.");
        router.push("/thank-you");
      } else {
        alert(
          data.error ||
            "There was an error confirming your booking. Please try again."
        );
      }
    } catch {
      alert("Network error while confirming booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBookNowDisabled =
    (bookingData.serviceType === "rental" && !bookingData.rentalPlan) ||
    !bookingData.vehicleType;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm sm:text-base">Back to home</span>
          </Link>
        </div>

        <Card className="p-4 sm:p-6 mb-4">
          <CardContent className="p-0">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600 text-left">
              Pick your locations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Pickup location
                </label>
                <Input
                  value={bookingData.pickup}
                  readOnly
                  className="flex-1 bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Drop location
                </label>
                <Input
                  value={bookingData.destination}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <button
                type="button"
                onClick={() => {
                  router.push("/");
                }}
                className="text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                Change locations
              </button>
            </div>

            {bookingData.serviceType === "outstation" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Pickup date & time *
                  </label>
                  <input
                    className="border p-2 rounded w-full text-sm"
                    type="date"
                    value={bookingData.pickupDate}
                    onChange={(e) =>
                      updateBookingData("pickupDate", e.target.value)
                    }
                  />
                  <input
                    className="border p-2 rounded w-full mt-1 text-sm"
                    type="time"
                    value={bookingData.pickupTime}
                    onChange={(e) =>
                      updateBookingData("pickupTime", e.target.value)
                    }
                  />
                </div>
                {bookingData.tripType === "roundtrip" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Return date & time *
                    </label>
                    <input
                      className="border p-2 rounded w-full text-sm"
                      type="date"
                      value={bookingData.returnDate}
                      onChange={(e) =>
                        updateBookingData("returnDate", e.target.value)
                      }
                    />
                    <input
                      className="border p-2 rounded w-full mt-1 text-sm"
                      type="time"
                      value={bookingData.returnTime}
                      onChange={(e) =>
                        updateBookingData("returnTime", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            )}

            {bookingData.serviceType === "outstation" &&
              bookingData.tripType === "roundtrip" && (
                <div className="mt-2 text-sm text-blue-800 text-left">
                  Estimated total time{" "}
                  <b>
                    {formatTimeHours(lockedTripHours || totalTripHours)} (
                    {formatTimeMins(lockedTripMinutes || totalTripMinutes)})
                  </b>
                </div>
              )}

            {(!bookingData.pickup ||
              !bookingData.destination ||
              !bookingData.pickupLat ||
              !bookingData.dropLat) && (
              <div className="text-xs text-red-500 mt-2 text-left">
                Please go back and select valid pickup and drop locations on the
                booking screen.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start">
          <div className="lg:col-span-2 space-y-6">
            {!showBookingForm ? (
              <div className="space-y-6">
                <div className="mb-6">
                  <div className="mt-4">
                    <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-2">
                      <span className="text-blue-700 font-medium text-sm sm:text-base">
                        Service: {getServiceDisplayName()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="font-medium">Distance:</span>{" "}
                    <span>
                      {calculatingDistance
                        ? "Calculating..."
                        : isLocked
                        ? formatDistance(lockedDistanceKm)
                        : formatDistance(distanceKm)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="font-medium">Duration:</span>{" "}
                    <span>
                      {calculatingDistance
                        ? "Calculating..."
                        : isLocked
                        ? formatTimeMins(lockedTripMinutes)
                        : formatTimeMins(totalTripMinutes)}
                    </span>
                  </div>
                  {distanceError && (
                    <div className="text-xs text-red-600 mt-1">
                      {distanceError}
                    </div>
                  )}
                </div>

                <div className="text-xl sm:text-2xl font-bold text-blue-900">
                  {pricesLoading[bookingData.vehicleType]
                    ? "Calculating..."
                    : prices[bookingData.vehicleType]
                    ? prices[bookingData.vehicleType]
                    : ""}
                </div>

                {bookingData.serviceType === "rental" &&
                  bookingData.rentalPlan && (
                    <Card className="p-4 sm:p-6 mt-6">
                      <CardContent className="p-0">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 text-blue-600">
                          Actual usage (for extra charges)
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Actual hours used
                            </label>
                            <Input
                              type="number"
                              min={
                                rentalPlanHoursMap[bookingData.rentalPlan] || 4
                              }
                              value={actualHours}
                              onChange={(e) =>
                                setActualHours(Number(e.target.value))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Actual distance (km)
                            </label>
                            <Input
                              type="number"
                              min={
                                rentalPlanKmsMap[bookingData.rentalPlan] || 40
                              }
                              value={actualDistance}
                              onChange={(e) =>
                                setActualDistance(Number(e.target.value))
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {bookingData.serviceType === "rental" && (
                  <Card className="p-4 sm:p-6">
                    <CardContent className="p-0">
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
                        Rental plans
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {rentalPlans.map((plan) => (
                          <button
                            key={plan.id}
                            onClick={() =>
                              updateBookingData("rentalPlan", plan.id)
                            }
                            className={`p-3 sm:p-4 rounded-lg border-2 text-center transition-all ${
                              bookingData.rentalPlan === plan.id
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="font-semibold text-base sm:text-lg">
                              {plan.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {plan.duration}
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="p-4 sm:p-6">
                  <CardContent className="p-0">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">
                      Vehicle type
                    </h3>
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                      {vehicleTypes.map((vehicle) => {
                        const breakdown = fareBreakdowns[vehicle.id];

                        return (
                          <button
                            key={vehicle.id}
                            onClick={() => {
                              setBookingData((prev) => ({
                                ...prev,
                                vehicleType: vehicle.id,
                                fare: breakdown?.totalBeforeGST || 0,
                                gstAmount: breakdown?.gstAmount || 0,
                                totalFare:
                                  breakdown?.totalFareWithGST || 0,
                              }));
                            }}
                            className={`p-4 rounded-lg border-2 transition-all flex flex-col justify-between text-left ${
                              bookingData.vehicleType === vehicle.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <img
                                  src={vehicle.image || "/placeholder.svg"}
                                  alt={vehicle.name}
                                  className="w-12 h-10 sm:w-16 sm:h-12 object-fill"
                                />
                                <div>
                                  <div className="font-semibold text-sm sm:text-base">
                                    {vehicle.name}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-600">
                                    {vehicle.capacity}
                                  </div>
                                  <div className="text-xs text-gray-500 line-clamp-2">
                                    {vehicle.features?.join(" • ")}
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                aria-label={`View details for ${vehicle.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInfoVehicleId(vehicle.id);
                                }}
                                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 flex-shrink-0"
                              >
                                i
                              </button>
                            </div>

                            <div className="mt-3">
                              {pricesLoading[vehicle.id] ? (
                                <div className="text-sm text-gray-600">
                                  Calculating...
                                </div>
                              ) : prices[vehicle.id] ? (
                                <div className="text-base sm:text-lg font-semibold">
                                  {prices[vehicle.id]}
                                </div>
                              ) : (
                                <div className="text-base sm:text-lg font-semibold">
                                  {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                  }).format(vehicle.basePrice)}
                                </div>
                              )}
                              <div className="text-xs text-gray-500 mt-1">
                                {isLocked
                                  ? `${lockedDistanceKm?.toFixed(2)} km`
                                  : distanceKm
                                  ? `${distanceKm.toFixed(2)} km`
                                  : "Price based on route"}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
  {vehicleTypes.map((vehicle) => {
    const breakdown = fareBreakdowns[vehicle.id];

    const onSelectVehicle = () => {
      setBookingData((prev) => ({
        ...prev,
        vehicleType: vehicle.id,
        fare: breakdown?.totalBeforeGST || 0,
        gstAmount: breakdown?.gstAmount || 0,
        totalFare: breakdown?.totalFareWithGST || 0,
      }));
    };

    return (
      <div
        key={vehicle.id}
        role="button"
        tabIndex={0}
        onClick={onSelectVehicle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelectVehicle();
          }
        }}
        className={`p-4 rounded-lg border-2 transition-all flex flex-col justify-between text-left cursor-pointer ${
          bookingData.vehicleType === vehicle.id
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-300"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <img
              src={vehicle.image || "/placeholder.svg"}
              alt={vehicle.name}
              className="w-12 h-10 sm:w-16 sm:h-12 object-fill"
            />
            <div>
              <div className="font-semibold text-sm sm:text-base">
                {vehicle.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {vehicle.capacity}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {vehicle.features?.join(" • ")}
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label={`View details for ${vehicle.name}`}
            onClick={(e) => {
              e.stopPropagation();
              setInfoVehicleId(vehicle.id);
            }}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 flex-shrink-0"
          >
            i
          </button>
        </div>

        <div className="mt-3">
          {pricesLoading[vehicle.id] ? (
            <div className="text-sm text-gray-600">Calculating...</div>
          ) : prices[vehicle.id] ? (
            <div className="text-base sm:text-lg font-semibold">
              {prices[vehicle.id]}
            </div>
          ) : (
            <div className="text-base sm:text-lg font-semibold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(vehicle.basePrice)}
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            {isLocked
              ? `${lockedDistanceKm?.toFixed(2)} km`
              : distanceKm
              ? `${distanceKm.toFixed(2)} km`
              : "Price based on route"}
          </div>
        </div>
      </div>
    );
  })}
</div>

                  </CardContent>
                </Card>

                <Button
                  onClick={handleBookNow}
                  disabled={isBookNowDisabled}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 py-4 text-base sm:text-lg font-semibold"
                >
                  Book now
                </Button>
              </div>
            ) : (
              <div ref={bookingFormRef} className="space-y-6">
                {inlineMessage && (
                  <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    {inlineMessage}
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Complete your {getServiceDisplayName()} booking
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Fill in the details to confirm your booking.
                  </p>
                  {isLocked && (
                    <div className="mt-4 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-green-800">
                      <Lock className="w-4 h-4 mr-2" />
                      <span>
                        Your fare is locked at {prices[bookingData.vehicleType]}{" "}
                        for {formatDistance(lockedDistanceKm)}
                      </span>
                    </div>
                  )}
                </div>

                <Card className="p-4 sm:p-6">
                  <CardContent className="p-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-4">
                      Who are you booking for?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() =>
                          updateBookingData("bookingFor", "self")
                        }
                        className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${
                          bookingData.bookingFor === "self"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <UserCheck className="w-5 h-5" />
                        <span className="text-sm sm:text-base">
                          For myself
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          updateBookingData("bookingFor", "other")
                        }
                        className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 ${
                          bookingData.bookingFor === "other"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <UserPlus className="w-5 h-5" />
                        <span className="text-sm sm:text-base">
                          For someone else
                        </span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 sm:p-6">
                  <CardContent className="p-0 space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Your details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full name *
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={bookingData.customerName}
                          onChange={(e) =>
                            updateBookingData("customerName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone number *
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter 10-digit mobile number"
                          value={bookingData.customerPhone}
                          onChange={(e) =>
                            updateBookingData("customerPhone", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={bookingData.customerEmail}
                        onChange={(e) =>
                          updateBookingData("customerEmail", e.target.value)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {bookingData.bookingFor === "other" && (
                  <Card className="p-4 sm:p-6">
                    <CardContent className="p-0 space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold">
                        Passenger details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Passenger name *
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter passenger's full name"
                            value={bookingData.otherPersonName}
                            onChange={(e) =>
                              updateBookingData(
                                "otherPersonName",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Passenger phone *
                          </label>
                          <Input
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={bookingData.otherPersonPhone}
                            onChange={(e) =>
                              updateBookingData(
                                "otherPersonPhone",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="p-4 sm:p-6">
                  <CardContent className="p-0 space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Additional details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of passengers
                        </label>
                        <Input
                          type="number"
                          min={1}
                          max={7}
                          value={bookingData.passengers}
                          onChange={(e) =>
                            updateBookingData(
                              "passengers",
                              Number(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment method
                        </label>
                        <select
                          className="border rounded px-3 py-2 w-full text-sm"
                          value={bookingData.paymentMethod}
                          onChange={(e) =>
                            updateBookingData(
                              "paymentMethod",
                              e.target.value
                            )
                          }
                        >
                          <option value="online">Online payment</option>
                          <option value="cash">Cash to driver</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special instructions for driver
                      </label>
                      <textarea
                        className="border rounded px-3 py-2 w-full text-sm min-h-[80px]"
                        placeholder="Any special pickup instructions or notes"
                        value={bookingData.notes}
                        onChange={(e) =>
                          updateBookingData("notes", e.target.value)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 sm:p-6">
                  <CardContent className="p-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-4">
                      Apply coupon code
                    </h3>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={bookingData.couponCode}
                        onChange={(e) =>
                          updateBookingData("couponCode", e.target.value)
                        }
                        className="flex-1"
                      />
                      <Button
                        onClick={applyCoupon}
                        variant="outline"
                        className="bg-transparent w-full sm:w-auto"
                      >
                        <Tag className="w-4 h-4 mr-2" /> Apply
                      </Button>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-600">
                      Try: FIRST10, SAVE20, WELCOME15
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={() => setShowBookingForm(false)}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Confirming..." : "Confirm booking"}
                  </Button>
                </div>
              </div>
            )}

            {infoVehicleId && (
              <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/50 px-4">
                <div className="w-full max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-lg p-5 max-h-[80vh] overflow-y-auto">
                  {(() => {
                    const vehicle = allVehicleTypes.find(
                      (v) => v.id === infoVehicleId
                    );
                    const breakdown = vehicle
                      ? fareBreakdowns[vehicle.id]
                      : null;

                    if (!vehicle) return null;

                    return (
                      <>
                        <div className="flex items-start justify-between mb-3 gap-3">
                          <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold truncate">
                              {vehicle.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 break-words">
                              {vehicle.capacity} •{" "}
                              {vehicle.features?.join(" • ")}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setInfoVehicleId(null)}
                            className="text-sm text-gray-500 hover:text-gray-800 flex-shrink-0"
                          >
                            Close
                          </button>
                        </div>

                        {prices[vehicle.id] && (
                          <div className="mb-3">
                            <div className="text-xs text-gray-500">
                              Estimated fare
                            </div>
                            <div className="text-lg sm:text-xl font-semibold">
                              {prices[vehicle.id]}
                            </div>
                          </div>
                        )}

                        {breakdown && (
                          <div className="mt-2 border-t pt-3">
                            <div className="text-sm font-semibold mb-2">
                              Price breakdown
                            </div>
                            <ul className="text-xs sm:text-sm space-y-2">
                              {Object.entries(breakdown).map(
                                ([key, value]) => (
                                  <li
                                    key={key}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                                  >
                                    <span className="capitalize text-gray-700 break-words">
                                      {key.replace(
                                        /([a-z])([A-Z])/g,
                                        "$1 $2"
                                      )}
                                    </span>
                                    <span className="font-medium text-gray-900 break-words text-right sm:text-left">
                                      {typeof value === "number"
                                        ? value.toLocaleString("en-IN", {
                                            maximumFractionDigits: 2,
                                          })
                                        : String(value)}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 lg:space-y-6">
            {/* Right-side summary slot if needed */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function loadGoogleMapsScript() {
  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined")
      return reject(new Error("Window undefined"));
    if ((window as any).google && (window as any).google.maps) return resolve();
    const existing = document.getElementById("gmaps-js");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.id = "gmaps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    }&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.head.appendChild(script);
  });
}
