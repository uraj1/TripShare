import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const DayWiseExpenseChart = ({ expenses }) => {
  if (!expenses || Object.keys(expenses).length === 0) {
    return (
      <div className="text-center text-gray-400">
        <p>No expenses recorded</p>
      </div>
    );
  }

  const dayWiseExpenses = expenses;
  const lineData = {
    labels: Object.keys(dayWiseExpenses),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(dayWiseExpenses),
        borderColor: '#FFD700', // Golden color for the line
        backgroundColor: 'rgba(255, 215, 0, 0.3)', // Light golden shade for fill
        pointBackgroundColor: '#FFFFFF', // White points
        pointBorderColor: '#FFD700', // Golden border for points
        pointHoverBackgroundColor: '#FFD700',
        pointHoverBorderColor: '#FFFFFF',
        borderWidth: 3, // Increased line width for better visibility
        tension: 0.3, // Slight curve for the line
      },
      {
        // Translucent line for aesthetic effect (more visible)
        label: 'Guideline',
        data: Object.values(dayWiseExpenses),
        borderColor: 'rgba(255, 215, 0, 0.6)', // Increased opacity for better visibility
        backgroundColor: 'rgba(255, 215, 0, 0.3)', // Light translucent shade
        borderWidth: 1.5, // Increase the border width for visibility
        borderDash: [5, 5], // Dashed line
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Remove legend for minimal design
      },
    },
    scales: {
      y: {
        ticks: { color: '#FFFFFF', font: { weight: 'bold' } }, // White text for Y-axis
        grid: { color: '#444444', lineWidth: 0.5 }, // Slightly lighter grid lines for better contrast
      },
      x: {
        ticks: { color: '#FFFFFF', font: { weight: 'bold' } }, // White text for X-axis
        grid: { color: '#444444', lineWidth: 0.5 }, // Lighter grid lines for X-axis
      },
    },
  };

  return (
    <motion.div
      className="p-6 bg-black rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="h-80">
        <Line data={lineData} options={lineChartOptions} />
      </div>
    </motion.div>
  );
};

export default DayWiseExpenseChart;
 