import React, { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTrip } from "../../context/TripContext";
import { Traveler } from "../../types";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { NearbyPlaces } from "../places/NearbyPlaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function TripForm() {
  const { createTrip } = useTrip();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [newTravelerName, setNewTravelerName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowNearbyPlaces(!!destination.trim());
  }, [destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !destination || travelers.length === 0 || !startDate || !endDate) {
      toast.error("Please fill all the fields and add at least one traveler!");
      return;
    }

    if (startDate > endDate) {
      toast.error("The start date cannot be later than the end date.");
      return;
    }

    setLoading(true);
    try {
      createTrip(name, destination, travelers, startDate, endDate);
      toast.success("Trip created successfully!");
      setTimeout(() => {
        setLoading(false);
        navigate("/trip-details");
      }, 2000);
    } catch {
      toast.error("Failed to create trip. Please try again.");
      setLoading(false);
    }
  };

  const addTraveler = () => {
    if (!newTravelerName.trim()) return;
    setTravelers([...travelers, { id: Date.now().toString(), name: newTravelerName.trim() }]);
    setNewTravelerName("");
  };

  const removeTraveler = (id: string) => {
    setTravelers(travelers.filter((t) => t.id !== id));
  };

  const highlightDates = (date: Date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now ? "text-gray-500 cursor-not-allowed" : "text-yellow-400";
  };

  const isFormValid = name && destination && travelers.length > 0 && startDate && endDate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 px-4 sm:px-6 md:px-8 lg:px-0"
      id="planning"
    >
      <div className="bg-black mt-20 p-6 sm:p-8 rounded-xl max-w-xl mx-auto shadow-lg backdrop-blur-lg bg-opacity-30 border-2 border-yellow-400">
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6 text-center">
          Plan Your Trip
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-400 mb-2">Trip Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black text-white border border-yellow-400 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-lg bg-opacity-30"
              placeholder="Summer Vacation 2024"
            />
          </div>

          <div>
            <label className="block text-yellow-400 mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-black text-white border border-yellow-400 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-lg bg-opacity-30"
              placeholder="Agra, India"
            />
          </div>

          <div>
            <div className="flex gap-4">
              <div className="w-full">
                <label className="block text-yellow-400 mb-1">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Start Date"
                  minDate={new Date()}
                  calendarClassName="bg-black text-yellow-400 rounded-lg shadow-lg"
                  dayClassName={highlightDates}
                  className="w-full bg-black text-white border border-yellow-400 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="w-full">
                <label className="block text-yellow-400 mb-1">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select End Date"
                  minDate={startDate || new Date()}
                  calendarClassName="bg-black text-yellow-400 rounded-lg shadow-lg"
                  dayClassName={highlightDates}
                  className="w-full bg-black text-white border border-yellow-400 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-yellow-400 mb-2">Add Travelers</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTravelerName}
                onChange={(e) => setNewTravelerName(e.target.value)}
                className="flex-1 bg-black text-white border border-yellow-400 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 backdrop-blur-lg bg-opacity-30"
                placeholder="Enter traveler name"
              />
              <button
                type="button"
                onClick={addTraveler}
                className="bg-yellow-400 text-black px-4 rounded-lg hover:bg-yellow-300 transition-all duration-300"
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          {travelers.length > 0 && (
            <div className="space-y-2">
              <label className="block text-yellow-400">Travelers List:</label>
              {travelers.map((traveler) => (
                <div
                  key={traveler.id}
                  className="flex items-center justify-between bg-gray-700 p-3 rounded-lg shadow-md backdrop-blur-lg bg-opacity-40"
                >
                  <span className="text-yellow-400">{traveler.name}</span>
                  <button
                    type="button"
                    onClick={() => removeTraveler(traveler.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full p-4 rounded-lg shadow-md ${
                isFormValid
                  ? "bg-yellow-400 hover:bg-yellow-300"
                  : "bg-yellow-500 bg-opacity-50 cursor-not-allowed"
              } text-black transition-all duration-300`}
              disabled={!isFormValid || loading}
            >
              {loading ? "Creating..." : "Create Trip"}
            </button>
          </div>
        </form>
      </div>

      {showNearbyPlaces && <NearbyPlaces destination={destination} />}
    </motion.div>
  );
}
