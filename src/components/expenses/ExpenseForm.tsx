import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { useTrip } from "../../context/TripContext";

interface ExpenseFormProps {
  dayOptions: string[];
  onSubmit?: () => void;
}

const categories = [
  "Transportation",
  "Accommodation",
  "Food & Beverages",
  "Activities",
  "Miscellaneous",
  "Personal Expense",
];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ dayOptions, onSubmit }) => {
  const { addExpense, currentTrip } = useTrip();
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [paidBy, setPaidBy] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !amount || !paidBy || !selectedDay) return;

    const expense = {
      category,
      amount: parseFloat(amount),
      paidBy,
      day: parseInt(selectedDay, 10),
      isPersonal: category === "Personal Expense",
    };

    addExpense(expense);

    // Reset form
    setCategory("");
    setAmount("");
    setPaidBy("");
    setSelectedDay("");

    // Close modal if onSubmit is provided
    onSubmit?.();
  };

  if (!currentTrip) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md mx-auto p-6 bg-black bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl">
        <button
          onClick={onSubmit}
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-all"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
          Add Expense
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-400 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black text-yellow-400 border border-yellow-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-gray-900"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-yellow-400 mb-2">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black text-yellow-400 border border-yellow-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-gray-900"
              placeholder="Enter amount"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-yellow-400 mb-2">Paid By</label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full bg-black text-yellow-400 border border-yellow-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-gray-900"
              required
            >
              <option value="">Select person</option>
              {currentTrip.travelers.map((traveler) => (
                <option key={traveler.id} value={traveler.id}>
                  {traveler.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-yellow-400 mb-2">Day of the Trip</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-black text-yellow-400 border border-yellow-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-gray-900"
              required
            >
              <option value="">Select day</option>
              {dayOptions.map((day) => (
                <option key={day} value={day}>
                  Day {day}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all duration-200"
          >
            <PlusCircle className="h-5 w-5" />
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};
