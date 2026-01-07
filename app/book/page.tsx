"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Tag,
  UserCheck,
  UserPlus,
  Lock,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
  const [showCouponInput, setShowCouponInput] = useState(false);

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
      <div className="max-w-6xl mx-auto px-3 py-3 sm:px-4 lg:px-6">
        <div className="flex items-center mb-3">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to home</span>
          </Link>
        </div>

        {/* Locations */}
        <Card className="p-3 mb-2">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-green-600" />
                  Pickup location
                </label>
                <Input
                  ref={pickupRef}
                  value={bookingData.pickup}
                  readOnly
                  className="flex-1 bg-gray-50 cursor-not-allowed h-9 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  Drop location
                </label>
                <Input
                  ref={dropRef}
                  value={bookingData.destination}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed h-9 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-1.5">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left">
                    Pickup date & time *
                  </label>
                  <input
                    className="border p-2 rounded w-full text-xs sm:text-sm"
                    type="date"
                    value={bookingData.pickupDate}
                    onChange={(e) =>
                      updateBookingData("pickupDate", e.target.value)
                    }
                  />
                  <input
                    className="border p-2 rounded w-full mt-1 text-xs sm:text-sm"
                    type="time"
                    value={bookingData.pickupTime}
                    onChange={(e) =>
                      updateBookingData("pickupTime", e.target.value)
                    }
                  />
                </div>
                {bookingData.tripType === "roundtrip" && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 text-left">
                      Return date & time *
                    </label>
                    <input
                      className="border p-2 rounded w-full text-xs sm:text-sm"
                      type="date"
                      value={bookingData.returnDate}
                      onChange={(e) =>
                        updateBookingData("returnDate", e.target.value)
                      }
                    />
                    <input
                      className="border p-2 rounded w-full mt-1 text-xs sm:text-sm"
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
                <div className="mt-1.5 text-xs sm:text-sm text-blue-800 text-left">
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
              <div className="text-xs text-red-500 mt-1 text-left">
                Please go back and select valid pickup and drop locations on the
                booking screen.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:items-start">
          <div className="lg:col-span-2 space-y-3">
            {!showBookingForm ? (
              <div className="space-y-3">
                {/* Service pill + distance */}
                <div className="mb-1.5">
                  <div className="inline-flex items-center bg-blue-100 rounded-full px-3 py-1">
                    <span className="text-blue-700 font-medium text-sm">
                      Service: {getServiceDisplayName()}
                    </span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-gray-600">
                  <div className="flex flex-wrap gap-1.5 items-center">
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
                    <div className="text-xs text-red-600 mt-0.5">
                      {distanceError}
                    </div>
                  )}
                </div>

                <div className="text-xl font-bold text-blue-900">
                  {pricesLoading[bookingData.vehicleType]
                    ? "Calculating..."
                    : prices[bookingData.vehicleType]
                    ? prices[bookingData.vehicleType]
                    : ""}
                </div>

                {bookingData.serviceType === "rental" &&
                  bookingData.rentalPlan && (
                    <Card className="p-3 mt-1">
                      <CardContent className="p-0">
                        <h3 className="text-sm sm:text-base font-semibold mb-2 text-blue-600">
                          Actual usage (for extra charges)
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
                              className="h-9 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
                              className="h-9 text-sm"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {bookingData.serviceType === "rental" && (
                  <Card className="p-3">
                    <CardContent className="p-0">
                      <h3 className="text-sm sm:text-base font-semibold mb-2 text-blue-600">
                        Rental plans
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
                        {rentalPlans.map((plan) => (
                          <button
                            key={plan.id}
                            onClick={() =>
                              updateBookingData("rentalPlan", plan.id)
                            }
                            className={`p-2 rounded-lg border-2 text-center text-xs sm:text-sm transition-all ${
                              bookingData.rentalPlan === plan.id
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="font-semibold">{plan.name}</div>
                            <div className="text-gray-600">{plan.duration}</div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Vehicle type – compact layout with price/km ABOVE */}
                <Card className="p-3">
                  <CardContent className="p-0">
                    <h3 className="text-sm sm:text-base font-semibold mb-2 text-blue-600">
                      Vehicle type
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

                        const displayDistance = isLocked
                          ? lockedDistanceKm
                          : distanceKm;

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
                            className={`px-2.5 py-2 rounded-lg border-2 transition-all flex flex-col gap-1 text-left cursor-pointer ${
                              bookingData.vehicleType === vehicle.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            {/* Price & KM above the image */}
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="font-medium">{vehicle.name}</span>
                              <span className="font-semibold text-gray-900">
                                {displayDistance
                                  ? `${displayDistance.toFixed(0)} Km | ${
                                      prices[vehicle.id]
                                        ? prices[vehicle.id].replace("₹", "").trim()
                                        : new Intl.NumberFormat("en-IN", {
                                            maximumFractionDigits: 0,
                                          }).format(vehicle.basePrice)
                                    }`
                                  : prices[vehicle.id] || ""}
                              </span>
                            </div>

                            {/* Image and details section */}
                            <div className="flex items-center gap-2">
                              <img
                                src={vehicle.image || "/placeholder.svg"}
                                alt={vehicle.name}
                                className="w-10 h-8 sm:w-12 sm:h-9 object-fill flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-xs text-gray-600">
                                  {vehicle.capacity}
                                </div>
                              </div>
                              <button
                                type="button"
                                aria-label={`View details for ${vehicle.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInfoVehicleId(vehicle.id);
                                }}
                                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-[10px] font-semibold hover:bg-gray-100 flex-shrink-0"
                              >
                                i
                              </button>
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
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 py-2.5 text-base font-semibold"
                >
                  Book now
                </Button>
              </div>
            ) : (
              <div ref={bookingFormRef} className="space-y-3">
                {inlineMessage && (
                  <div className="mb-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs sm:text-sm text-green-800">
                    {inlineMessage}
                  </div>
                )}

                <div className="mb-2">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5">
                    Complete your {getServiceDisplayName()} booking
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Fill in the details to confirm your booking.
                  </p>
                  {isLocked && (
                    <div className="mt-2 inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-3 py-1 text-xs sm:text-sm text-green-800">
                      <Lock className="w-4 h-4 mr-2" />
                      <span>
                        Your fare is locked at {prices[bookingData.vehicleType]}{" "}
                        for {formatDistance(lockedDistanceKm)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Who booking for – buttons side by side */}
                <Card className="p-3">
                  <CardContent className="p-0">
                    <h3 className="text-sm sm:text-base font-semibold mb-2">
                      Who are you booking for?
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateBookingData("bookingFor", "self")
                        }
                        className={`flex-1 px-2.5 py-2 rounded-lg border-2 flex items-center justify-center gap-1.5 text-xs sm:text-sm ${
                          bookingData.bookingFor === "self"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>For myself</span>
                      </button>
                      <button
                        onClick={() =>
                          updateBookingData("bookingFor", "other")
                        }
                        className={`flex-1 px-2.5 py-2 rounded-lg border-2 flex items-center justify-center gap-1.5 text-xs sm:text-sm ${
                          bookingData.bookingFor === "other"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Other</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Your details – phone logic 10 digit, no leading 0 */}
                <Card className="p-3">
                  <CardContent className="p-0 space-y-2.5">
                    <h3 className="text-sm sm:text-base font-semibold">
                      Your details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Phone number *
                        </label>
                        <Input
                          type="tel"
                          inputMode="numeric"
                          pattern="[6-9][0-9]{9}"
                          placeholder="10-digit mobile number"
                          value={bookingData.customerPhone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 10) {
                              updateBookingData("customerPhone", value);
                            }
                          }}
                          maxLength={10}
                          required
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Email address
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={bookingData.customerEmail}
                        onChange={(e) =>
                          updateBookingData("customerEmail", e.target.value)
                        }
                        className="h-9 text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>

                {bookingData.bookingFor === "other" && (
                  <Card className="p-3">
                    <CardContent className="p-0 space-y-2.5">
                      <h3 className="text-sm sm:text-base font-semibold">
                        Passenger details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
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
                            className="h-9 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Passenger phone *
                          </label>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            pattern="[6-9][0-9]{9}"
                            placeholder="10-digit mobile number"
                            value={bookingData.otherPersonPhone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 10) {
                                updateBookingData("otherPersonPhone", value);
                              }
                            }}
                            maxLength={10}
                            required
                            className="h-9 text-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Coupon – collapsed with arrow */}
                <Card className="p-3">
                  <CardContent className="p-0">
                    <button
                      type="button"
                      onClick={() => setShowCouponInput((p) => !p)}
                      className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold mb-1"
                    >
                      <span>Apply coupon code</span>
                      {showCouponInput ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {showCouponInput && (
                      <>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-1">
                          <Input
                            type="text"
                            placeholder="Enter coupon code"
                            value={bookingData.couponCode}
                            onChange={(e) =>
                              updateBookingData("couponCode", e.target.value)
                            }
                            className="flex-1 h-9 text-sm"
                          />
                          <Button
                            onClick={applyCoupon}
                            variant="outline"
                            className="bg-transparent w-full sm:w-auto h-9 text-sm"
                          >
                            <Tag className="w-4 h-4 mr-1" />
                            Apply
                          </Button>
                        </div>
                        <div className="mt-1 text-[11px] sm:text-xs text-gray-600">
                          Try: FIRST10, SAVE20, WELCOME15
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    onClick={() => setShowBookingForm(false)}
                    variant="outline"
                    className="flex-1 bg-transparent h-10 text-sm"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    className="flex-1 bg-blue-500 text-white hover:bg-blue-600 h-10 text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Confirming..." : "Confirm booking"}
                  </Button>
                </div>
              </div>
            )}

            {/* UPDATED: Info modal with reduced white space */}
                   {/* UPDATED: Info modal with minimal white space */}
            {infoVehicleId && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                  <div className="p-4"> {/* Reduced padding here */}
                    {(() => {
                      const vehicle = allVehicleTypes.find(
                        (v) => v.id === infoVehicleId
                      );
                      const breakdown = vehicle
                        ? fareBreakdowns[vehicle.id]
                        : null;

                      if (!vehicle) return null;

                      // return (
                      //   <>
                      //     <div className="flex items-start justify-between gap-3">
                      //       <div className="min-w-0">
                      //         <h3 className="text-base font-semibold truncate">
                      //           {vehicle.name}
                      //         </h3>
                      //         <p className="text-xs text-gray-600 break-words">
                      //           {vehicle.capacity} •{" "}
                      //           {vehicle.features?.join(" • ")}
                      //         </p>
                      //       </div>
                      //       <button
                      //         type="button"
                      //         onClick={() => setInfoVehicleId(null)}
                      //         className="text-sm text-gray-500 hover:text-gray-800 flex-shrink-0"
                      //       >
                      //         Close
                      //       </button>
                      //     </div>

                      //     {prices[vehicle.id] && (
                      //       <div className="mt-4"> {/* Tightened spacing */}
                      //         <div className="text-xs text-gray-500">
                      //           Estimated fare
                      //         </div>
                      //         <div className="text-xl font-semibold">
                      //           {prices[vehicle.id]}
                      //         </div>
                      //       </div>
                      //     )}

                      //     {breakdown && (
                      //       <div className="mt-4 border-t pt-4"> {/* Reduced top margin */}
                      //         <div className="text-sm font-semibold mb-3">
                      //           Price breakdown
                      //         </div>
                      //         <ul className="text-sm space-y-2">
                      //           {Object.entries(breakdown).map(
                      //             ([key, value]) => (
                      //               <li
                      //                 key={key}
                      //                 className="flex items-center justify-between gap-2"
                      //               >
                      //                 <span className="capitalize text-gray-700 break-words">
                      //                   {key.replace(
                      //                     /([a-z])([A-Z])/g,
                      //                     "$1 $2"
                      //                   )}
                      //                 </span>
                      //                 <span className="font-medium text-gray-900 break-words text-right">
                      //                   {typeof value === "number"
                      //                     ? value.toLocaleString("en-IN", {
                      //                         maximumFractionDigits: 2,
                      //                       })
                      //                     : String(value)}
                      //                 </span>
                      //               </li>
                      //             )
                      //           )}
                      //         </ul>
                      //       </div>
                      //     )}
                      //   </>
                      // );
                   
                      return (
  <>
    {/* Header + Close (fixed in this card) */}
    <div className="flex items-start justify-between gap-3 pb-3 border-b">
      <div className="min-w-0">
        <h3 className="text-base font-semibold truncate">
          {vehicle.name}
        </h3>
        <p className="text-xs text-gray-600 break-words">
          {vehicle.capacity} • {vehicle.features?.join(" • ")}
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

    {/* Scrollable content so Close stays visible on mobile */}
    <div className="mt-3 max-h-64 overflow-y-auto pr-1">
      {prices[vehicle.id] && (
        <div className="mt-1">
          <div className="text-xs text-gray-500">Estimated fare</div>
          <div className="text-xl font-semibold">
            {prices[vehicle.id]}
          </div>
        </div>
      )}

      {breakdown && (
        <div className="mt-4 border-t pt-4">
          <div className="text-sm font-semibold mb-3">
            Price breakdown
          </div>
          <ul className="text-sm space-y-2">
            {Object.entries(breakdown).map(([key, value]) => (
              <li
                key={key}
                className="flex items-center justify-between gap-2"
              >
                <span className="capitalize text-gray-700 break-words">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </span>
                <span className="font-medium text-gray-900 break-words text-right">
                  {typeof value === "number"
                    ? value.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })
                    : String(value)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
);

                   })()}
                  </div>
                </div>
              </div>
            )}
          </div>

          

          <div className="space-y-2 lg:space-y-3">
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