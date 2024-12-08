import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { ExpenseForm } from '../ExpenseForm';
import Modal from './Modal';
import { useTrip } from '../../../context/TripContext';
import ExpenseSummary from '../ExpenseSumary';

const ExpenseTracker: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentTrip } = useTrip();

  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-yellow-400">
          Please create a trip first
        </h2>
      </div>
    );
  }

  // Calculate day options based on trip duration
  const startDate = new Date(currentTrip.startDate);
  const endDate = new Date(currentTrip.endDate);
  const tripDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayOptions = Array.from({ length: tripDuration }, (_, i) => `${i + 1}`);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-yellow-400">Calculate Your Expenses</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-300 transition-all duration-200"
          >
            <PlusCircle className="h-5 w-5" />
            Add Expense
          </button>
        </div>

        {/* Expense Summary */}
        <ExpenseSummary />

        {/* Expense Form Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ExpenseForm dayOptions={dayOptions} onSubmit={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default ExpenseTracker;