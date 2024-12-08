import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface ExpensesProps {
  expenses: Record<string, number>;
}

const DayWiseExpenseChart: React.FC<ExpensesProps> = ({ expenses }) => {
  const hasExpenses = expenses && Object.keys(expenses).length > 0;

  const dummyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
    datasets: [
      {
        label: 'Dummy Expenses',
        data: [], 
        borderColor: '#808080',
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#808080',
        borderWidth: 3,
        tension: 0.3,
      },
    ],
  };

  const lineData = hasExpenses
    ? {
        labels: Object.keys(expenses),
        datasets: [
          {
            label: 'Expenses',
            data: Object.values(expenses),
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.3)',
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#FFD700',
            pointHoverBackgroundColor: '#FFD700',
            pointHoverBorderColor: '#FFFFFF',
            borderWidth: 3,
            tension: 0.3,
          },
          {
            label: 'Guideline',
            data: Object.values(expenses),
            borderColor: 'rgba(255, 215, 0, 0.6)',
            backgroundColor: 'rgba(255, 215, 0, 0.3)',
            borderWidth: 1.5,
            borderDash: [5, 5],
            tension: 0.3,
          },
        ],
      }
    : dummyData;

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: hasExpenses,
      },
    },
    scales: {
      y: {
        ticks: { color: '#FFFFFF', font: { weight: 'bold' } },
        grid: { color: '#444444', lineWidth: 0.5 },
      },
      x: {
        ticks: { color: '#FFFFFF', font: { weight: 'bold' } },
        grid: { color: '#444444', lineWidth: 0.5 },
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
        {!hasExpenses && (
          <div className="text-center text-gray-400 mt-4">
            <p>No expenses recorded yet!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DayWiseExpenseChart;
