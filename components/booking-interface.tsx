// "use client"

// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { ClockTimePicker } from "@/components/ui/clock-time-picker";
// import { useRouter } from "next/navigation";

// // --- GOOGLE AUTOCOMPLETE FOR PLACE --
// function setupPlaceAutocomplete(ref: React.RefObject<HTMLInputElement>, onSelect: (address: string, lat: number, lng: number) => void) {
//   useEffect(() => {
//     if (!ref.current) return;
//     const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
//     async function loadScript() {
//       if (!(window as any).google || !(window as any).google.maps) {
//         if (!document.getElementById("gmaps-js")) {
//           const script = document.createElement("script");
//           script.id = "gmaps-js";
//           script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`;
//           script.async = true;
//           script.defer = true;
//           document.head.appendChild(script);
//           script.onload = setup;
//         } else {
//           document.getElementById("gmaps-js")?.addEventListener("load", setup);
//         }
//       } else {
//         setup();
//       }
//     }
//     function setup() {
//       const google = (window as any).google;
//       if (ref.current && !(ref.current as any).autocompleteAttached) {
//         const autocomplete = new google.maps.places.Autocomplete(ref.current, { componentRestrictions: { country: "in" } });
//         autocomplete.addListener("place_changed", () => {
//           const place = autocomplete.getPlace();
//           if (place?.geometry?.location) {
//             onSelect(place.formatted_address || place.name, place.geometry.location.lat(), place.geometry.location.lng());
//           }
//         });
//         (ref.current as any).autocompleteAttached = true;
//       }
//     }
//     loadScript();
//     // No cleanup needed for one-time setup
//     // eslint-disable-next-line
//   }, []);
// }

// // --- MAIN COMPONENT --
// export default function BookingInterface() {
//   const router = useRouter();

//   // State Management
//   const [selectedService, setSelectedService] = useState("flexi");
//   const [selectedTripType, setSelectedTripType] = useState("oneway");

//   const [pickupLocation, setPickupLocation] = useState(""); // text
//   const [pickupLat, setPickupLat] = useState<number | null>(null);
//   const [pickupLng, setPickupLng] = useState<number | null>(null);

//   const [dropLocation, setDropLocation] = useState(""); // text
//   const [dropLat, setDropLat] = useState<number | null>(null);
//   const [dropLng, setDropLng] = useState<number | null>(null);

//   const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
//   const [pickupTime, setPickupTime] = useState("");
//   const [returnDate, setReturnDate] = useState<Date | undefined>();
//   const [returnTime, setReturnTime] = useState("");
//   const [assureRide, setAssureRide] = useState(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   // Autocomplete refs
//   const pickupInputRef = useRef<HTMLInputElement>(null);
//   const dropInputRef = useRef<HTMLInputElement>(null);

//   // Attach Google Autocomplete once
//   setupPlaceAutocomplete(pickupInputRef, (address, lat, lng) => {
//     setPickupLocation(address);
//     setPickupLat(lat);
//     setPickupLng(lng);
//   });
//   setupPlaceAutocomplete(dropInputRef, (address, lat, lng) => {
//     setDropLocation(address);
//     setDropLat(lat);
//     setDropLng(lng);
//   });

//   // --- Set default pickup date/time ---
//   useEffect(() => {
//     const now = new Date();
//     const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
//     setPickupDate(oneHourLater);
//     setPickupTime(format(oneHourLater, "HH:mm"));
//   }, []);

//   const getMinTimeForDate = (selectedDate: Date | undefined) => {
//     if (!selectedDate) return "00:00";
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const selDate = new Date(selectedDate);
//     selDate.setHours(0, 0, 0, 0);
//     if (selDate.getTime() === today.getTime()) {
//       const now = new Date();
//       const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
//       return format(oneHourLater, "HH:mm");
//     }
//     return "00:00";
//   };

//   useEffect(() => {
//     if (!pickupDate) return;
//     const minTime = getMinTimeForDate(pickupDate);
//     if (pickupTime < minTime) setPickupTime(minTime);
//   }, [pickupDate]);

//   // --- Validation and Submission ---
//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!pickupLocation.trim() || !pickupLat || !pickupLng) {
//       newErrors.pickupLocation = "Select pickup from suggestions.";
//     }
//     if (!dropLocation.trim() || !dropLat || !dropLng) {
//       newErrors.dropLocation = "Select drop from suggestions.";
//     }
//     if (!pickupDate) {
//       newErrors.pickupDate = "Pickup date is required.";
//     }
//     if (!pickupTime) {
//       newErrors.pickupTime = "Pickup time is required.";
//     }
//     if (selectedService === "outstation" && selectedTripType === "roundtrip") {
//       if (!returnDate) {
//         newErrors.returnDate = "Return date is required.";
//       }
//       if (!returnTime) {
//         newErrors.returnTime = "Return time is required.";
//       }
//       if (pickupDate && pickupTime && returnDate && returnTime) {
//         const pickupDateTime = new Date(pickupDate);
//         const [pHour, pMin] = pickupTime.split(":").map(Number);
//         pickupDateTime.setHours(pHour, pMin);

//         const returnDateTime = new Date(returnDate);
//         const [rHour, rMin] = returnTime.split(":").map(Number);
//         returnDateTime.setHours(rHour, rMin);

//         if (returnDateTime <= pickupDateTime) {
//           newErrors.returnDate = "Return date and time must be after pickup.";
//         }
//       }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- Booking page navigation ---
//   const handleProceed = () => {
//     if (!validateForm()) return;
//     const params = new URLSearchParams({
//       service: selectedService,
//       tripType: selectedTripType,
//       pickup: pickupLocation,
//       pickupLat: pickupLat?.toString() || "",
//       pickupLng: pickupLng?.toString() || "",
//       drop: dropLocation,
//       dropLat: dropLat?.toString() || "",
//       dropLng: dropLng?.toString() || "",
//       pickupDate: pickupDate ? format(pickupDate, "yyyy-MM-dd") : "",
//       pickupTime: pickupTime,
//       ...(selectedService === "outstation" &&
//         selectedTripType === "roundtrip" && {
//         returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
//         returnTime: returnTime
//       }),
//       assureRide: assureRide.toString(),
//     });
//     router.push(`/book?${params.toString()}`);
//   };

//   const services = [
//     { id: "flexi", name: "Flexi" },
//     { id: "rental", name: "Rental" },
//     { id: "outstation", name: "Outstation" },
//   ];
//   const tripTypes = [
//     { id: "oneway", name: "One Way" },
//     { id: "roundtrip", name: "Round Trip" },
//   ];

//   return (
//     <div className="bg-white/90 w-full p-6 flex-grow lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl lg:flex-grow-0">
//       <div className="space-y-4 mb-6">

//         {/* Pickup */}
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//           </div>
//           <Input
//             ref={pickupInputRef}
//             value={pickupLocation}
//             onChange={e => setPickupLocation(e.target.value)}
//             className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
//             placeholder="Enter Pickup Location "
//           />
//           <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             <MapPin className="w-5 h-5 text-gray-400" />
//           </button>
//           {pickupLat && pickupLng && (
//             <div className="text-xs text-gray-500 mt-1">
//               Lat: {pickupLat}, Lng: {pickupLng}
//             </div>
//           )}
//           {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
//         </div>
//         {/* Drop */}
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//           </div>
//           <Input
//             ref={dropInputRef}
//             value={dropLocation}
//             onChange={e => setDropLocation(e.target.value)}
//             className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
//             placeholder="Enter Drop Location "
//           />
//           <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             <MapPin className="w-5 h-5 text-gray-400" />
//           </button>
//           {dropLat && dropLng && (
//             <div className="text-xs text-gray-500 mt-1">
//               Lat: {dropLat}, Lng: {dropLng}
//             </div>
//           )}
//           {errors.dropLocation && <p className="text-red-500 text-xs mt-1">{errors.dropLocation}</p>}
//         </div>
//       </div>
//       {/* Service Selection */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {services.map((service) => (
//           <Button
//             key={service.id}
//             variant={selectedService === service.id ? "default" : "outline"}
//             onClick={() => setSelectedService(service.id)}
//             className="flex-grow"
//           >
//             {service.name}
//           </Button>
//         ))}
//       </div>
//       {/* Outstation Trip Type Selection */}
//       {selectedService === "outstation" && (
//         <div className="flex flex-wrap gap-2 mb-6">
//           {tripTypes.map((type) => (
//             <Button
//               key={type.id}
//               variant={selectedTripType === type.id ? "default" : "outline"}
//               onClick={() => setSelectedTripType(type.id)}
//               className="flex-grow"
//             >
//               {type.name}
//             </Button>
//           ))}
//         </div>
//       )}
//       {/* Date, Time, and Return Fields */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//         {/* Pickup Time */}
//         <div>
//           <label className="block text-xs text-gray-500 mb-1">PICKUP TIME</label>
//           <ClockTimePicker
//             value={pickupTime}
//             onChange={setPickupTime}
//             minTime={getMinTimeForDate(pickupDate)}
//           />
//           {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
//         </div>
//         {/* Pickup Date */}
//         <div>
//           <label className="block text-xs text-gray-500 mb-1">PICKUP DATE</label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant={"outline"}
//                 className={cn(
//                   "w-full justify-start text-left font-normal",
//                   !pickupDate && "text-muted-foreground"
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {pickupDate ? format(pickupDate, "MMM d, yyyy") : <span>Pick a date</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <Calendar
//                 mode="single"
//                 selected={pickupDate}
//                 onSelect={setPickupDate}
//                 disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
//         </div>
//         {/* Return Date and Time for Round Trip */}
//         {selectedService === "outstation" && selectedTripType === "roundtrip" && (
//           <>
//             <div>
//               <label className="block text-xs text-gray-500 mb-1">RETURN TIME</label>
//               <ClockTimePicker
//                 value={returnTime}
//                 onChange={setReturnTime}
//               />
//               {errors.returnTime && <p className="text-red-500 text-xs mt-1">{errors.returnTime}</p>}
//             </div>
//             <div>
//               <label className="block text-xs text-gray-500 mb-1">RETURN DATE</label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full justify-start text-left font-normal",
//                       !returnDate && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {returnDate ? format(returnDate, "MMM d, yyyy") : <span>Pick a date</span>}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={returnDate}
//                     onSelect={setReturnDate}
//                     disabled={(date) => pickupDate ? date < pickupDate : date < new Date()}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
//             </div>
//           </>
//         )}
//       </div>
//       {/* Assure Ride Option */}
//   {/* Assure Ride Option */}
// <div className="flex items-center space-x-3 mb-6">
//   <button
//     type="button"
//     onClick={() => setAssureRide(!assureRide)}
//     className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
//       assureRide
//         ? "bg-blue-600 border-blue-600"
//         : "border-gray-800 bg-white hover:border-blue-500"
//     }`}
//   >
//     {assureRide && <CheckCircle className="w-4 h-4 text-white" />}
//   </button>
//   <span className="text-sm text-gray-700">Ride cover for ₹20.00 per ride</span>
// </div>

//       {/* Proceed Button */}
//       <Button
//         onClick={handleProceed}
//         className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl flex items-center justify-center group transition-all"
//       >
//         <span className="whitespace-nowrap">Book My Ride</span>
//         <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
//       </Button>
//     </div>
//   );
// }


//testing

// "use client"

// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar as CalendarIcon, MapPin, ArrowRight, CheckCircle, Navigation } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { ClockTimePicker } from "@/components/ui/clock-time-picker";
// import { useRouter } from "next/navigation";

// // --- GOOGLE AUTOCOMPLETE FOR PLACE --
// function setupPlaceAutocomplete(ref: React.RefObject<HTMLInputElement>, onSelect: (address: string, lat: number, lng: number) => void) {
//   useEffect(() => {
//     if (!ref.current) return;
//     const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
//     async function loadScript() {
//       if (!(window as any).google || !(window as any).google.maps) {
//         if (!document.getElementById("gmaps-js")) {
//           const script = document.createElement("script");
//           script.id = "gmaps-js";
//           script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`;
//           script.async = true;
//           script.defer = true;
//           document.head.appendChild(script);
//           script.onload = setup;
//         } else {
//           document.getElementById("gmaps-js")?.addEventListener("load", setup);
//         }
//       } else {
//         setup();
//       }
//     }
//     function setup() {
//       const google = (window as any).google;
//       if (ref.current && !(ref.current as any).autocompleteAttached) {
//         const autocomplete = new google.maps.places.Autocomplete(ref.current, { componentRestrictions: { country: "in" } });
//         autocomplete.addListener("place_changed", () => {
//           const place = autocomplete.getPlace();
//           if (place?.geometry?.location) {
//             onSelect(place.formatted_address || place.name, place.geometry.location.lat(), place.geometry.location.lng());
//           }
//         });
//         (ref.current as any).autocompleteAttached = true;
//       }
//     }
//     loadScript();
//     // No cleanup needed for one-time setup
//     // eslint-disable-next-line
//   }, []);
// }

// // --- REVERSE GEOCODE WITH PLACE DETAILS ---
// async function reverseGeocodeWithPlace(lat: number, lng: number): Promise<{ address: string; lat: number; lng: number } | null> {
//   const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  
//   try {
//     // First, get the place_id from reverse geocoding
//     const geocodeResponse = await fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}&location_type=ROOFTOP|RANGE_INTERPOLATED&result_type=street_address|premise|route`
//     );
//     const geocodeData = await geocodeResponse.json();
    
//     console.log("Reverse Geocode Response:", geocodeData); // Debug log
    
//     if (geocodeData.status !== "OK" || !geocodeData.results || geocodeData.results.length === 0) {
//       console.error("Geocoding failed:", geocodeData.status);
//       return null;
//     }

//     // Find the most precise result
//     let bestResult = null;
//     const precisionOrder = ["street_address", "premise", "subpremise", "route", "intersection"];
    
//     for (const precision of precisionOrder) {
//       bestResult = geocodeData.results.find((result: any) => 
//         result.types.includes(precision)
//       );
//       if (bestResult) break;
//     }
    
//     // Fallback to first result
//     if (!bestResult) {
//       bestResult = geocodeData.results[0];
//     }

//     console.log("Selected Result:", bestResult); // Debug log

//     // Get precise coordinates from the result
//     const preciseLat = bestResult.geometry.location.lat;
//     const preciseLng = bestResult.geometry.location.lng;
//     const address = bestResult.formatted_address;

//     console.log("Final Location:", { address, lat: preciseLat, lng: preciseLng }); // Debug log

//     return {
//       address: address,
//       lat: preciseLat,
//       lng: preciseLng
//     };
    
//   } catch (error) {
//     console.error("Reverse geocoding error:", error);
//     return null;
//   }
// }

// // --- MAIN COMPONENT --
// export default function BookingInterface() {
//   const router = useRouter();

//   // State Management
//   const [selectedService, setSelectedService] = useState("flexi");
//   const [selectedTripType, setSelectedTripType] = useState("oneway");

//   const [pickupLocation, setPickupLocation] = useState(""); // text
//   const [pickupLat, setPickupLat] = useState<number | null>(null);
//   const [pickupLng, setPickupLng] = useState<number | null>(null);

//   const [dropLocation, setDropLocation] = useState(""); // text
//   const [dropLat, setDropLat] = useState<number | null>(null);
//   const [dropLng, setDropLng] = useState<number | null>(null);

//   const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
//   const [pickupTime, setPickupTime] = useState("");
//   const [returnDate, setReturnDate] = useState<Date | undefined>();
//   const [returnTime, setReturnTime] = useState("");
//   const [assureRide, setAssureRide] = useState(false);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [loadingCurrentLocation, setLoadingCurrentLocation] = useState(false);

//   // Autocomplete refs
//   const pickupInputRef = useRef<HTMLInputElement>(null);
//   const dropInputRef = useRef<HTMLInputElement>(null);

//   // Attach Google Autocomplete once
//   setupPlaceAutocomplete(pickupInputRef, (address, lat, lng) => {
//     setPickupLocation(address);
//     setPickupLat(lat);
//     setPickupLng(lng);
//   });
//   setupPlaceAutocomplete(dropInputRef, (address, lat, lng) => {
//     setDropLocation(address);
//     setDropLat(lat);
//     setDropLng(lng);
//   });

//   // --- Set default pickup date/time ---
//   useEffect(() => {
//     const now = new Date();
//     const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
//     setPickupDate(oneHourLater);
//     setPickupTime(format(oneHourLater, "HH:mm"));
//   }, []);

//   const getMinTimeForDate = (selectedDate: Date | undefined) => {
//     if (!selectedDate) return "00:00";
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const selDate = new Date(selectedDate);
//     selDate.setHours(0, 0, 0, 0);
//     if (selDate.getTime() === today.getTime()) {
//       const now = new Date();
//       const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
//       return format(oneHourLater, "HH:mm");
//     }
//     return "00:00";
//   };

//   useEffect(() => {
//     if (!pickupDate) return;
//     const minTime = getMinTimeForDate(pickupDate);
//     if (pickupTime < minTime) setPickupTime(minTime);
//   }, [pickupDate, pickupTime]);

//   // --- GET CURRENT LOCATION (ONLY FOR HOME PAGE) ---
//   const handleGetCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser");
//       return;
//     }

//     setLoadingCurrentLocation(true);
//     setErrors({ ...errors, pickupLocation: "" }); // Clear previous errors
    
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const rawLat = position.coords.latitude;
//         const rawLng = position.coords.longitude;
//         const accuracy = position.coords.accuracy;
        
//         console.log("Raw GPS Position:", { lat: rawLat, lng: rawLng, accuracy }); // Debug log
        
//         // Get precise address and coordinates from reverse geocoding
//         const result = await reverseGeocodeWithPlace(rawLat, rawLng);
        
//         if (result) {
//           // Use the precise coordinates from Google's geocoding response
//           // This ensures the coordinates match the address exactly
//           setPickupLocation(result.address);
//           setPickupLat(result.lat);
//           setPickupLng(result.lng);
//           console.log("Final location set:", result); // Debug log
          
//           // Show accuracy warning if GPS accuracy is poor
//           if (accuracy > 50) {
//             console.warn("GPS accuracy is low:", accuracy, "meters");
//           }
//         } else {
//           // Fallback: use raw GPS coordinates if geocoding fails
//           setPickupLocation(`Lat: ${rawLat.toFixed(6)}, Lng: ${rawLng.toFixed(6)}`);
//           setPickupLat(rawLat);
//           setPickupLng(rawLng);
//           alert("Could not get exact address, but coordinates were saved. You can manually adjust the location for better accuracy.");
//         }
//         setLoadingCurrentLocation(false);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         let errorMessage = "Unable to retrieve your location.";
        
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location permission denied. Please enable location access in your browser settings.";
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is unavailable. Please try again.";
//             break;
//           case error.TIMEOUT:
//             errorMessage = "Location request timed out. Please try again.";
//             break;
//         }
        
//         alert(errorMessage);
//         setLoadingCurrentLocation(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 15000,
//         maximumAge: 0
//       }
//     );
//   };

//   // --- Validation and Submission ---
//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};
//     if (!pickupLocation.trim() || !pickupLat || !pickupLng) {
//       newErrors.pickupLocation = "Select pickup from suggestions.";
//     }
//     if (!dropLocation.trim() || !dropLat || !dropLng) {
//       newErrors.dropLocation = "Select drop from suggestions.";
//     }
//     if (!pickupDate) {
//       newErrors.pickupDate = "Pickup date is required.";
//     }
//     if (!pickupTime) {
//       newErrors.pickupTime = "Pickup time is required.";
//     }
//     if (selectedService === "outstation" && selectedTripType === "roundtrip") {
//       if (!returnDate) {
//         newErrors.returnDate = "Return date is required.";
//       }
//       if (!returnTime) {
//         newErrors.returnTime = "Return time is required.";
//       }
//       if (pickupDate && pickupTime && returnDate && returnTime) {
//         const pickupDateTime = new Date(pickupDate);
//         const [pHour, pMin] = pickupTime.split(":").map(Number);
//         pickupDateTime.setHours(pHour, pMin);

//         const returnDateTime = new Date(returnDate);
//         const [rHour, rMin] = returnTime.split(":").map(Number);
//         returnDateTime.setHours(rHour, rMin);

//         if (returnDateTime <= pickupDateTime) {
//           newErrors.returnDate = "Return date and time must be after pickup.";
//         }
//       }
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- Booking page navigation ---
//   const handleProceed = () => {
//     if (!validateForm()) return;
//     const params = new URLSearchParams({
//       service: selectedService,
//       tripType: selectedTripType,
//       pickup: pickupLocation,
//       pickupLat: pickupLat?.toString() || "",
//       pickupLng: pickupLng?.toString() || "",
//       drop: dropLocation,
//       dropLat: dropLat?.toString() || "",
//       dropLng: dropLng?.toString() || "",
//       pickupDate: pickupDate ? format(pickupDate, "yyyy-MM-dd") : "",
//       pickupTime: pickupTime,
//       ...(selectedService === "outstation" &&
//         selectedTripType === "roundtrip" && {
//         returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
//         returnTime: returnTime
//       }),
//       assureRide: assureRide.toString(),
//     });
//     router.push(`/book?${params.toString()}`);
//   };

//   const services = [
//     { id: "flexi", name: "Flexi" },
//     { id: "rental", name: "Rental" },
//     { id: "outstation", name: "Outstation" },
//   ];
//   const tripTypes = [
//     { id: "oneway", name: "One Way" },
//     { id: "roundtrip", name: "Round Trip" },
//   ];

//   return (
//     <div className="bg-white/90 w-full p-6 flex-grow lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl lg:flex-grow-0">
//       <div className="space-y-4 mb-6">

//         {/* Pickup - WITH CURRENT LOCATION FEATURE */}
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//           </div>
//           <Input
//             ref={pickupInputRef}
//             value={pickupLocation}
//             onChange={e => setPickupLocation(e.target.value)}
//             className="pl-10 pr-20 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
//             placeholder="Enter Pickup Location"
//           />
//           <div
//             onClick={handleGetCurrentLocation}
//             className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-blue-50 rounded-full p-1 transition-colors cursor-pointer ${loadingCurrentLocation ? 'opacity-50 pointer-events-none' : ''}`}
//             title="Use current location"
//           >
//             {loadingCurrentLocation ? (
//               <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             ) : (
//               <Navigation className="w-5 h-5 text-blue-500" />
//             )}
//           </div>
//           {pickupLat && pickupLng && (
//             <div className="text-xs text-gray-500 mt-1">
//               Lat: {pickupLat}, Lng: {pickupLng}
//             </div>
//           )}
//           {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
//         </div>

//         {/* Drop - NO CURRENT LOCATION FEATURE */}
//         <div className="relative">
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
//             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//           </div>
//           <Input
//             ref={dropInputRef}
//             value={dropLocation}
//             onChange={e => setDropLocation(e.target.value)}
//             className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
//             placeholder="Enter Drop Location "
//           />
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//             <MapPin className="w-5 h-5 text-gray-400" />
//           </div>
//           {dropLat && dropLng && (
//             <div className="text-xs text-gray-500 mt-1">
//               Lat: {dropLat}, Lng: {dropLng}
//             </div>
//           )}
//           {errors.dropLocation && <p className="text-red-500 text-xs mt-1">{errors.dropLocation}</p>}
//         </div>
//       </div>

//       {/* Service Selection */}
//       <div className="flex flex-wrap gap-2 mb-6">
//         {services.map((service) => (
//           <Button
//             key={service.id}
//             variant={selectedService === service.id ? "default" : "outline"}
//             onClick={() => setSelectedService(service.id)}
//             className="flex-grow"
//           >
//             {service.name}
//           </Button>
//         ))}
//       </div>

//       {/* Outstation Trip Type Selection */}
//       {selectedService === "outstation" && (
//         <div className="flex flex-wrap gap-2 mb-6">
//           {tripTypes.map((type) => (
//             <Button
//               key={type.id}
//               variant={selectedTripType === type.id ? "default" : "outline"}
//               onClick={() => setSelectedTripType(type.id)}
//               className="flex-grow"
//             >
//               {type.name}
//             </Button>
//           ))}
//         </div>
//       )}

//       {/* Date, Time, and Return Fields */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//         {/* Pickup Time */}
//         <div>
//           <label className="block text-xs text-gray-500 mb-1">PICKUP TIME</label>
//           <ClockTimePicker
//             value={pickupTime}
//             onChange={setPickupTime}
//             minTime={getMinTimeForDate(pickupDate)}
//           />
//           {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
//         </div>
//         {/* Pickup Date */}
//         <div>
//           <label className="block text-xs text-gray-500 mb-1">PICKUP DATE</label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant={"outline"}
//                 className={cn(
//                   "w-full justify-start text-left font-normal",
//                   !pickupDate && "text-muted-foreground"
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {pickupDate ? format(pickupDate, "MMM d, yyyy") : <span>Pick a date</span>}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <Calendar
//                 mode="single"
//                 selected={pickupDate}
//                 onSelect={setPickupDate}
//                 disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
//         </div>
//         {/* Return Date and Time for Round Trip */}
//         {selectedService === "outstation" && selectedTripType === "roundtrip" && (
//           <>
//             <div>
//               <label className="block text-xs text-gray-500 mb-1">RETURN TIME</label>
//               <ClockTimePicker
//                 value={returnTime}
//                 onChange={setReturnTime}
//               />
//               {errors.returnTime && <p className="text-red-500 text-xs mt-1">{errors.returnTime}</p>}
//             </div>
//             <div>
//               <label className="block text-xs text-gray-500 mb-1">RETURN DATE</label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full justify-start text-left font-normal",
//                       !returnDate && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {returnDate ? format(returnDate, "MMM d, yyyy") : <span>Pick a date</span>}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar
//                     mode="single"
//                     selected={returnDate}
//                     onSelect={setReturnDate}
//                     disabled={(date) => pickupDate ? date < pickupDate : date < new Date()}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Assure Ride Option */}
//       <div className="flex items-center space-x-3 mb-6">
//         <button
//           type="button"
//           onClick={() => setAssureRide(!assureRide)}
//           className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
//             assureRide
//               ? "bg-blue-600 border-blue-600"
//               : "border-gray-800 bg-white hover:border-blue-500"
//           }`}
//         >
//           {assureRide && <CheckCircle className="w-4 h-4 text-white" />}
//         </button>
//         <span className="text-sm text-gray-700">Ride cover for ₹20.00 per ride</span>
//       </div>

//       {/* Proceed Button */}
//       <Button
//         onClick={handleProceed}
//         className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl flex items-center justify-center group transition-all"
//       >
//         <span className="whitespace-nowrap">Book My Ride</span>
//         <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
//       </Button>
//     </div>
//   );
// }


//above work but small issue
//testingn 2 

"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, MapPin, ArrowRight, CheckCircle, Navigation, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ClockTimePicker } from "@/components/ui/clock-time-picker";
import { useRouter } from "next/navigation";

// --- GOOGLE AUTOCOMPLETE FOR PLACE --
function setupPlaceAutocomplete(ref: React.RefObject<HTMLInputElement>, onSelect: (address: string, lat: number, lng: number) => void) {
  useEffect(() => {
    if (!ref.current) return;
    const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    async function loadScript() {
      if (!(window as any).google || !(window as any).google.maps) {
        if (!document.getElementById("gmaps-js")) {
          const script = document.createElement("script");
          script.id = "gmaps-js";
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
          script.onload = setup;
        } else {
          document.getElementById("gmaps-js")?.addEventListener("load", setup);
        }
      } else {
        setup();
      }
    }
    function setup() {
      const google = (window as any).google;
      if (ref.current && !(ref.current as any).autocompleteAttached) {
        const autocomplete = new google.maps.places.Autocomplete(ref.current, { componentRestrictions: { country: "in" } });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place?.geometry?.location) {
            onSelect(place.formatted_address || place.name, place.geometry.location.lat(), place.geometry.location.lng());
          }
        });
        (ref.current as any).autocompleteAttached = true;
      }
    }
    loadScript();
    // No cleanup needed for one-time setup
    // eslint-disable-next-line
  }, []);
}

// --- MAIN COMPONENT --
export default function BookingInterface() {
  const router = useRouter();

  // State Management
  const [selectedService, setSelectedService] = useState("flexi");
  const [selectedTripType, setSelectedTripType] = useState("oneway");

  const [pickupLocation, setPickupLocation] = useState(""); // text
  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);

  const [dropLocation, setDropLocation] = useState(""); // text
  const [dropLat, setDropLat] = useState<number | null>(null);
  const [dropLng, setDropLng] = useState<number | null>(null);

  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [returnTime, setReturnTime] = useState("");
  const [assureRide, setAssureRide] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Map picker states
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Default Mumbai
  const [selectedMapLocation, setSelectedMapLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapAddress, setMapAddress] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Autocomplete refs
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropInputRef = useRef<HTMLInputElement>(null);

  // Attach Google Autocomplete once
  setupPlaceAutocomplete(pickupInputRef, (address, lat, lng) => {
    setPickupLocation(address);
    setPickupLat(lat);
    setPickupLng(lng);
  });
  setupPlaceAutocomplete(dropInputRef, (address, lat, lng) => {
    setDropLocation(address);
    setDropLat(lat);
    setDropLng(lng);
  });

const [isClient, setIsClient] = useState(false);
  // --- Set default pickup date/time ---
  // useEffect(() => {
  //   const now = new Date();
  //   const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  //   setPickupDate(oneHourLater);
  //   setPickupTime(format(oneHourLater, "HH:mm"));
  // }, []);
  useEffect(() => {
  // Mark as client-side only
  setIsClient(true);
  
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  setPickupDate(oneHourLater);
  setPickupTime(format(oneHourLater, "HH:mm"));
}, []);

  const getMinTimeForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return "00:00";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selDate = new Date(selectedDate);
    selDate.setHours(0, 0, 0, 0);
    if (selDate.getTime() === today.getTime()) {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      return format(oneHourLater, "HH:mm");
    }
    return "00:00";
  };

  useEffect(() => {
    if (!pickupDate) return;
    const minTime = getMinTimeForDate(pickupDate);
    if (pickupTime < minTime) setPickupTime(minTime);
  }, [pickupDate, pickupTime]);

  // --- OPEN MAP PICKER WITH CURRENT LOCATION ---
  const handleOpenMapPicker = () => {
    setShowMapPicker(true);
    
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setMapCenter(userLocation);
          setSelectedMapLocation(userLocation);
          
          // Initialize map after getting location
          setTimeout(() => initializeMap(userLocation), 100);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default location (Mumbai)
          setTimeout(() => initializeMap(mapCenter), 100);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      // Browser doesn't support geolocation
      setTimeout(() => initializeMap(mapCenter), 100);
    }
  };

  // --- INITIALIZE GOOGLE MAP ---
  const initializeMap = (center: { lat: number; lng: number }) => {
    if (!(window as any).google?.maps) {
      console.error("Google Maps not loaded");
      return;
    }

    const google = (window as any).google;
    const mapElement = document.getElementById("location-map");
    
    if (!mapElement) return;

    // Create map
    const map = new google.maps.Map(mapElement, {
      center: center,
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // Create draggable marker
    const marker = new google.maps.Marker({
      position: center,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    mapRef.current = map;
    markerRef.current = marker;

    // Get address for initial position
    getAddressFromLatLng(center.lat, center.lng);

    // Update location when marker is dragged
    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      const lat = position.lat();
      const lng = position.lng();
      setSelectedMapLocation({ lat, lng });
      getAddressFromLatLng(lat, lng);
    });

    // Update location when map is clicked
    map.addListener("click", (e: any) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      marker.setPosition(e.latLng);
      setSelectedMapLocation({ lat, lng });
      getAddressFromLatLng(lat, lng);
    });
  };

  // --- GET ADDRESS FROM LAT/LNG ---
  const getAddressFromLatLng = async (lat: number, lng: number) => {
    setLoadingAddress(true);
    const google = (window as any).google;
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode(
      { location: { lat, lng } },
      (results: any[], status: string) => {
        setLoadingAddress(false);
        if (status === "OK" && results && results.length > 0) {
          setMapAddress(results[0].formatted_address);
        } else {
          setMapAddress("Unable to get address");
        }
      }
    );
  };

  // --- CONFIRM LOCATION FROM MAP ---
  const confirmMapLocation = () => {
    if (selectedMapLocation && mapAddress) {
      setPickupLocation(mapAddress);
      setPickupLat(selectedMapLocation.lat);
      setPickupLng(selectedMapLocation.lng);
      setShowMapPicker(false);
      setErrors({ ...errors, pickupLocation: "" });
    }
  };

  // --- Validation and Submission ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!pickupLocation.trim() || !pickupLat || !pickupLng) {
      newErrors.pickupLocation = "Select pickup from suggestions.";
    }
    if (!dropLocation.trim() || !dropLat || !dropLng) {
      newErrors.dropLocation = "Select drop from suggestions.";
    }
    if (!pickupDate) {
      newErrors.pickupDate = "Pickup date is required.";
    }
    if (!pickupTime) {
      newErrors.pickupTime = "Pickup time is required.";
    }
    if (selectedService === "outstation" && selectedTripType === "roundtrip") {
      if (!returnDate) {
        newErrors.returnDate = "Return date is required.";
      }
      if (!returnTime) {
        newErrors.returnTime = "Return time is required.";
      }
      if (pickupDate && pickupTime && returnDate && returnTime) {
        const pickupDateTime = new Date(pickupDate);
        const [pHour, pMin] = pickupTime.split(":").map(Number);
        pickupDateTime.setHours(pHour, pMin);

        const returnDateTime = new Date(returnDate);
        const [rHour, rMin] = returnTime.split(":").map(Number);
        returnDateTime.setHours(rHour, rMin);

        if (returnDateTime <= pickupDateTime) {
          newErrors.returnDate = "Return date and time must be after pickup.";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Booking page navigation ---
  const handleProceed = () => {
    if (!validateForm()) return;
    const params = new URLSearchParams({
      service: selectedService,
      tripType: selectedTripType,
      pickup: pickupLocation,
      pickupLat: pickupLat?.toString() || "",
      pickupLng: pickupLng?.toString() || "",
      drop: dropLocation,
      dropLat: dropLat?.toString() || "",
      dropLng: dropLng?.toString() || "",
      pickupDate: pickupDate ? format(pickupDate, "yyyy-MM-dd") : "",
      pickupTime: pickupTime,
      ...(selectedService === "outstation" &&
        selectedTripType === "roundtrip" && {
        returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : "",
        returnTime: returnTime
      }),
      assureRide: assureRide.toString(),
    });
    router.push(`/book?${params.toString()}`);
  };

  const services = [
    { id: "flexi", name: "Flexi" },
    { id: "rental", name: "Rental" },
    { id: "outstation", name: "Outstation" },
  ];
  const tripTypes = [
    { id: "oneway", name: "One Way" },
    { id: "roundtrip", name: "Round Trip" },
  ];

  return (
    <div className="bg-white/90 w-full p-6 flex-grow lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl lg:flex-grow-0">
      
      {/* MAP PICKER MODAL */}
      {showMapPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[600px] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Select Your Pickup Location</h3>
              <button
                onClick={() => setShowMapPicker(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
              <div id="location-map" className="w-full h-full"></div>
              
              {/* Center Pin Indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
                <MapPin className="w-10 h-10 text-red-500 drop-shadow-lg" />
              </div>
            </div>

            {/* Address Display & Confirm */}
            <div className="p-4 border-t bg-white">
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Selected Address:</p>
                {loadingAddress ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-400">Loading address...</span>
                  </div>
                ) : (
                  <p className="font-medium text-sm">{mapAddress || "Drag the marker to select location"}</p>
                )}
                {selectedMapLocation && (
                  <p className="text-xs text-gray-400 mt-1">
                    Lat: {selectedMapLocation.lat.toFixed(6)}, Lng: {selectedMapLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowMapPicker(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmMapLocation}
                  disabled={!selectedMapLocation || !mapAddress || loadingAddress}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  Confirm Location
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 mb-6">

        {/* Pickup - WITH MAP PICKER */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <Input
            ref={pickupInputRef}
            value={pickupLocation}
            onChange={e => setPickupLocation(e.target.value)}
            className="pl-10 pr-20 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
            placeholder="Enter Pickup Location"
          />
          <div
            onClick={handleOpenMapPicker}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-blue-50 rounded-full p-1 transition-colors cursor-pointer"
            title="Pick location from map"
          >
            <Navigation className="w-5 h-5 text-blue-500" />
          </div>
          {pickupLat && pickupLng && (
            <div className="text-xs text-gray-500 mt-1">
              Lat: {pickupLat.toFixed(6)}, Lng: {pickupLng.toFixed(6)}
            </div>
          )}
          {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
        </div>

        {/* Drop - NO MAP PICKER */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <Input
            ref={dropInputRef}
            value={dropLocation}
            onChange={e => setDropLocation(e.target.value)}
            className="pl-10 pr-10 py-3 text-sm font-medium border-gray-300 focus:border-blue-500"
            placeholder="Enter Drop Location "
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          {dropLat && dropLng && (
            <div className="text-xs text-gray-500 mt-1">
              Lat: {dropLat.toFixed(6)}, Lng: {dropLng.toFixed(6)}
            </div>
          )}
          {errors.dropLocation && <p className="text-red-500 text-xs mt-1">{errors.dropLocation}</p>}
        </div>
      </div>

      {/* Service Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {services.map((service) => (
          <Button
            key={service.id}
            variant={selectedService === service.id ? "default" : "outline"}
            onClick={() => setSelectedService(service.id)}
            className="flex-grow"
          >
            {service.name}
          </Button>
        ))}
      </div>

      {/* Outstation Trip Type Selection */}
      {selectedService === "outstation" && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tripTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedTripType === type.id ? "default" : "outline"}
              onClick={() => setSelectedTripType(type.id)}
              className="flex-grow"
            >
              {type.name}
            </Button>
          ))}
        </div>
      )}

      {/* Date, Time, and Return Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* Pickup Time */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">PICKUP TIME</label>
          <ClockTimePicker
            value={pickupTime}
            onChange={setPickupTime}
            minTime={getMinTimeForDate(pickupDate)}
          />
          {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
        </div>
        {/* Pickup Date */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">PICKUP DATE</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "MMM d, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
        </div>
        {/* Return Date and Time for Round Trip */}
        {selectedService === "outstation" && selectedTripType === "roundtrip" && (
          <>
            <div>
              <label className="block text-xs text-gray-500 mb-1">RETURN TIME</label>
              <ClockTimePicker
                value={returnTime}
                onChange={setReturnTime}
              />
              {errors.returnTime && <p className="text-red-500 text-xs mt-1">{errors.returnTime}</p>}
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">RETURN DATE</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "MMM d, yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => pickupDate ? date < pickupDate : date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
            </div>
          </>
        )}
      </div>

      {/* Assure Ride Option */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          type="button"
          onClick={() => setAssureRide(!assureRide)}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            assureRide
              ? "bg-blue-600 border-blue-600"
              : "border-gray-800 bg-white hover:border-blue-500"
          }`}
        >
          {assureRide && <CheckCircle className="w-4 h-4 text-white" />}
        </button>
        <span className="text-sm text-gray-700">Ride cover for ₹20.00 per ride</span>
      </div>

      {/* Proceed Button */}
      <Button
        onClick={handleProceed}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl flex items-center justify-center group transition-all"
      >
        <span className="whitespace-nowrap">Book My Ride</span>
        <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}