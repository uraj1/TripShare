import React from 'react';
import { motion } from 'framer-motion';
import { LocateFixedIcon, Plane } from 'lucide-react';

interface TripHeaderProps {
  name: string;
  destination: string;
  duration: {
    fromDate: string;
    toDate: string;
    days: number;
  };
}
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const TripHeader: React.FC<TripHeaderProps> = ({ name, destination, duration }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="mb-6 mt-16"
  >
    <div className="glass-card p-6 rounded-3xl border border-yellow-400/30">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="relative">
          <div className="absolute bg-yellow-400"></div>
          <Plane className="h-12 w-12 text-yellow-400 relative" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          {name}
        </h1>
        <div className="flex items-center gap-3">
          <LocateFixedIcon className="h-6 w-6 text-yellow-400" />
          <p className="text-2xl text-white/90">{destination}</p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-yellow-400/80 text-sm uppercase tracking-wider">Duration</p>
          <p className="text-white text-xl font-medium">
            {duration.days} {duration.days === 1 ? "Day" : "Days"}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-yellow-400/80 text-sm uppercase tracking-wider">From</p>
          <p className="text-white text-xl font-medium">{formatDate(duration.fromDate)}</p>
        </div>
        <div className="stat-card">
          <p className="text-yellow-400/80 text-sm uppercase tracking-wider">To</p>
          <p className="text-white text-xl font-medium">{formatDate(duration.toDate)}</p>
        </div>
      </div>
    </div>
  </motion.div>
);