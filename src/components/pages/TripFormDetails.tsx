
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import { useState, useEffect } from 'react';

import { ExpenseForm } from '../expenses/ExpenseForm';
import Modal from '../expenses/ExpenseTracker/Modal';
import '../../index.css'
import { TripHeader } from './TripHeader';
import { ExpenseSection } from './ExpenseSection';

function TripManager() {
  const { currentTrip } = useTrip();
  const navigate = useNavigate();
  const [tripDuration, setTripDuration] = useState({
    fromDate: "N/A",
    toDate: "N/A",
    days: 0,
  });
  const [dayOptions, setDayOptions] = useState<string[]>([]);
  const [dayWiseExpenses, setDayWiseExpenses] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  const calculateTripDuration = () => {
    if (!currentTrip?.startDate || !currentTrip?.endDate)
      return { fromDate: "N/A", toDate: "N/A", days: 0 };

    const startDate = new Date(currentTrip.startDate);
    const endDate = new Date(currentTrip.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return {
      fromDate: startDate.toLocaleDateString(),
      toDate: endDate.toLocaleDateString(),
      days,
    };
  };

  useEffect(() => {
    if (!currentTrip) {
      navigate("/");
      return;
    }

    const newDuration = calculateTripDuration();
    setTripDuration(newDuration);
    const daysArray = Array.from({ length: newDuration.days }, (_, i) => (i + 1).toString());
    setDayOptions(daysArray);
  }, [currentTrip, navigate]);

  return (
    <div className="min-h-screen relative">
      <div className="parallax-bg" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
          {currentTrip ? (
            <>
              <TripHeader
                name={currentTrip.name}
                destination={currentTrip.destination}
                duration={tripDuration}
              />
              
              <ExpenseSection
                onAddExpense={() => setIsModalOpen(true)}
                onDayWiseExpenses={setDayWiseExpenses}
                showCharts={showCharts}
                onToggleCharts={() => setShowCharts(!showCharts)}
                dayWiseExpenses={dayWiseExpenses}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center glass-card p-8 rounded-3xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                No active trip found
              </h2>
              <p className="text-gray-400">
                Please create a trip to start tracking your expenses
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ExpenseForm
          dayOptions={dayOptions}
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default TripManager;