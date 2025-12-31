"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  MapPin,
  ArrowRight,
  CheckCircle,
  Navigation,
  X,
  Crosshair,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ClockTimePicker } from "@/components/ui/clock-time-picker";
import { useRouter } from "next/navigation";

// --- GOOGLE AUTOCOMPLETE FOR PLACE --
function setupPlaceAutocomplete(
  ref: React.RefObject<HTMLInputElement>,
  onSelect: (address: string, lat: number, lng: number) => void
) {
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
          document
            .getElementById("gmaps-js")
            ?.addEventListener("load", setup);
        }
      } else {
        setup();
      }
    }
    function setup() {
      const google = (window as any).google;
      if (ref.current && !(ref.current as any).autocompleteAttached) {
        const autocomplete = new google.maps.places.Autocomplete(ref.current, {
          componentRestrictions: { country: "in" },
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place?.geometry?.location) {
            onSelect(
              place.formatted_address || place.name,
              place.geometry.location.lat(),
              place.geometry.location.lng()
            );
          }
        });
        (ref.current as any).autocompleteAttached = true;
      }
    }
    loadScript();
    // eslint-disable-next-line
  }, []);
}

// --- MAIN COMPONENT --
export default function BookingInterface() {
  const router = useRouter();

  // State Management
  const [selectedService, setSelectedService] = useState("flexi");
  const [selectedTripType, setSelectedTripType] = useState("oneway");

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);

  const [dropLocation, setDropLocation] = useState("");
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
  const [mapCenter, setMapCenter] = useState({ lat: 19.076, lng: 72.8777 }); // Default Mumbai
  const [selectedMapLocation, setSelectedMapLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
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

  useEffect(() => {
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(userLocation);
          setSelectedMapLocation(userLocation);
          setTimeout(() => initializeMap(userLocation), 100);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setTimeout(() => initializeMap(mapCenter), 100);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
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

    const map = new google.maps.Map(mapElement, {
      center: center,
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    const marker = new google.maps.Marker({
      position: center,
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    mapRef.current = map;
    markerRef.current = marker;

    getAddressFromLatLng(center.lat, center.lng);

    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      const lat = position.lat();
      const lng = position.lng();
      setSelectedMapLocation({ lat, lng });
      getAddressFromLatLng(lat, lng);
    });

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
          returnTime: returnTime,
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
    <div className="bg-white/90 w-full p-5 sm:p-6 flex-grow lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl lg:flex-grow-0">
      {/* MAP PICKER MODAL */}
      {showMapPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[560px] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-blue-600" />
                <h3 className="text-base sm:text-lg font-semibold">
                  Select your pickup location
                </h3>
              </div>
              <button
                onClick={() => setShowMapPicker(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
              <div id="location-map" className="w-full h-full" />

              {/* Center Pin Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                <MapPin className="w-9 h-9 text-red-500 drop-shadow-lg" />
              </div>
            </div>

            {/* Address Display & Confirm */}
            <div className="px-4 py-3 border-t bg-white">
              <div className="mb-3">
                <p className="text-[11px] text-gray-500 mb-1">
                  Selected address
                </p>
                {loadingAddress ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-400">
                      Loading address...
                    </span>
                  </div>
                ) : (
                  <p className="font-medium text-xs sm:text-sm">
                    {mapAddress || "Drag the marker to select location"}
                  </p>
                )}
                {selectedMapLocation && (
                  <p className="text-[11px] text-gray-400 mt-1">
                    Lat: {selectedMapLocation.lat.toFixed(6)}, Lng:{" "}
                    {selectedMapLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => setShowMapPicker(false)}
                  variant="outline"
                  className="flex-1 h-9 text-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmMapLocation}
                  disabled={
                    !selectedMapLocation || !mapAddress || loadingAddress
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 h-9 text-sm"
                >
                  Confirm location
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 mb-5">
        {/* Pickup - WITH MAP PICKER */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          </div>
          <Input
            ref={pickupInputRef}
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="pl-9 pr-20 h-11 text-sm font-medium border-gray-300 focus:border-blue-500"
            placeholder="Enter pickup location"
          />
          {/* <button
            type="button"
            onClick={handleOpenMapPicker}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-blue-50 rounded-full p-1.5 transition-colors cursor-pointer"
            title="Pick location from map"
          >
            <Navigation className="w-4 h-4 text-blue-500" />
          </button> */}

<button
  type="button"
  onClick={handleOpenMapPicker}
  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full border border-cyan-400 bg-white shadow-sm hover:bg-cyan-50 transition-colors cursor-pointer"
  title="Use current location on map"
>
  <span className="relative flex items-center justify-center w-2.5 h-2.5">
    {/* outer ring */}
    <span className="absolute inset-0 rounded-full border border-cyan-500" />
    {/* inner dot */}
    <span className="w-0.5 h-0.5 rounded-full bg-cyan-500" />
    {/* four ticks */}
    <span className="absolute -top-[1.5px] w-px h-[2px] bg-cyan-500" />
    <span className="absolute -bottom-[1.5px] w-px h-[2px] bg-cyan-500" />
    <span className="absolute -left-[1.5px] h-px w-[2px] bg-cyan-500" />
    <span className="absolute -right-[1.5px] h-px w-[2px] bg-cyan-500" />
  </span>
</button>

          {pickupLat && pickupLng && (
            <div className="text-[11px] text-gray-500 mt-1">
              Lat: {pickupLat.toFixed(6)}, Lng: {pickupLng.toFixed(6)}
            </div>
          )}
          {errors.pickupLocation && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.pickupLocation}
            </p>
          )}
        </div>

        {/* Drop - NO MAP PICKER */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          </div>
          <Input
            ref={dropInputRef}
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            className="pl-9 pr-9 h-11 text-sm font-medium border-gray-300 focus:border-blue-500"
            placeholder="Enter drop location"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <MapPin className="w-4 h-4 text-gray-400" />
          </div>
          {dropLat && dropLng && (
            <div className="text-[11px] text-gray-500 mt-1">
              Lat: {dropLat.toFixed(6)}, Lng: {dropLng.toFixed(6)}
            </div>
          )}
          {errors.dropLocation && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.dropLocation}
            </p>
          )}
        </div>
      </div>

      {/* Service Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {services.map((service) => (
          <Button
            key={service.id}
            variant={selectedService === service.id ? "default" : "outline"}
            onClick={() => setSelectedService(service.id)}
            className="flex-1 min-w-[80px] h-9 text-sm"
          >
            {service.name}
          </Button>
        ))}
      </div>

      {/* Outstation Trip Type Selection */}
      {selectedService === "outstation" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tripTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedTripType === type.id ? "default" : "outline"}
              onClick={() => setSelectedTripType(type.id)}
              className="flex-1 min-w-[80px] h-9 text-sm"
            >
              {type.name}
            </Button>
          ))}
        </div>
      )}

      {/* Date, Time, and Return Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Pickup Time */}
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            PICKUP TIME
          </label>
          <ClockTimePicker
            value={pickupTime}
            onChange={setPickupTime}
            minTime={getMinTimeForDate(pickupDate)}
          />
          {errors.pickupTime && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.pickupTime}
            </p>
          )}
        </div>
        {/* Pickup Date */}
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">
            PICKUP DATE
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-10 text-sm",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? (
                  format(pickupDate, "MMM d, yyyy")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                disabled={(date) =>
                  date <
                  new Date(new Date().setDate(new Date().getDate() - 1))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.pickupDate && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.pickupDate}
            </p>
          )}
        </div>

        {/* Return Date and Time for Round Trip */}
        {selectedService === "outstation" &&
          selectedTripType === "roundtrip" && (
            <>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  RETURN TIME
                </label>
                <ClockTimePicker
                  value={returnTime}
                  onChange={setReturnTime}
                />
                {errors.returnTime && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.returnTime}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  RETURN DATE
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 text-sm",
                        !returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? (
                        format(returnDate, "MMM d, yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) =>
                        pickupDate ? date < pickupDate : date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.returnDate && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.returnDate}
                  </p>
                )}
              </div>
            </>
          )}
      </div>

      {/* Assure Ride Option */}
      <div className="flex items-center space-x-3 mb-4">
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
        <span className="text-sm text-gray-700">
          Ride cover for ₹20.00 per ride
        </span>
      </div>

      {/* Proceed Button */}
      <Button
        onClick={handleProceed}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 sm:py-3.5 text-base sm:text-lg font-semibold rounded-xl flex items-center justify-center group transition-all"
      >
        <span className="whitespace-nowrap">Book My Ride</span>
        <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}





