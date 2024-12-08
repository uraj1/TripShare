import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useTrip } from '../../context/TripContext';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export function ExpenseCharts({ expenses }: { expenses: any }) {
  const { currentTrip, calculateSplit } = useTrip();

  if (!currentTrip) return null;

 
  const { individualSplits } = calculateSplit();


  const categoryTotals = React.useMemo(() => {
    return currentTrip.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [currentTrip.expenses]);


  const barData = React.useMemo(() => {
    return {
      labels: currentTrip.travelers.map((t) => t.name),
      datasets: [
        {
          label: 'Amount Paid',
          data: currentTrip.travelers.map((t) => individualSplits[t.id].paid),
          backgroundColor: 'rgba(251, 191, 36, 0.8)',
          borderColor: '#000',
          borderWidth: 2,
        },
        {
          label: 'Amount Owed',
          data: currentTrip.travelers.map((t) => Math.max(individualSplits[t.id].owes, 0)),
          backgroundColor: 'rgba(180, 83, 9, 0.8)',
          borderColor: '#000',
          borderWidth: 2,
        },
      ],
    };
  }, [currentTrip.travelers, individualSplits]);

  const pieData = React.useMemo(() => {
    return {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            'rgba(251, 191, 36, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(217, 119, 6, 0.8)',
            'rgba(180, 83, 9, 0.8)',
            'rgba(146, 64, 14, 0.8)',
          ],
          borderColor: '#000',
          borderWidth: 2,
        },
      ],
    };
  }, [categoryTotals]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#FCD34D',
          font: { size: 12, weight: 'bold', family: 'system-ui' },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#FCD34D',
        bodyColor: '#fff',
        borderColor: '#F59E0B',
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(251, 191, 36, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#FCD34D',
          font: { weight: 'bold' },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#FCD34D',
          font: { weight: 'bold' },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* Pie Chart */}
      <div className="glass-card p-6 rounded-3xl">
        <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6">
          Expenses by Category
        </h3>
        <div className="h-[300px] relative">
          <Pie data={pieData} options={commonOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass-card p-6 rounded-3xl">
        <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6">
          Individual Expenses
        </h3>
        <div className="h-[300px] relative">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </motion.div>
  );
}
