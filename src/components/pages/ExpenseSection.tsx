import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

import { ExpenseCharts } from '../expenses/ExpenseCharts';
import ExpenseSummary from '../expenses/ExpenseSumary';
import DayWiseExpenseChart from '../expenses/DayWiseChartExpense';

interface ExpenseSectionProps {
  onAddExpense: () => void;
  onDayWiseExpenses: (data: { [key: string]: number }) => void;
  showCharts: boolean;
  onToggleCharts: () => void;
  dayWiseExpenses: { [key: string]: number };
}

export const ExpenseSection: React.FC<ExpenseSectionProps> = ({
  onAddExpense,
  onDayWiseExpenses,
  showCharts,
  onToggleCharts,
  dayWiseExpenses,
}) => (
  <div className="space-y-8">
    <div className="glass-card p-8 rounded-3xl">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-4">
          Expense Management
        </h3>
        <p className="text-gray-400 mb-6">
          Keep track of your spending with our intuitive expense tracker
        </p>
        <button
          onClick={onAddExpense}
          className="btn-primary"
        >
          <PlusCircle className="h-5 w-5" />
          Add Expense
        </button>
      </div>
    </div>

    <div className="glass-card p-8 rounded-3xl">
      <ExpenseSummary onDayWiseExpenses={onDayWiseExpenses} />
    </div>

    <div className="glass-card p-8 rounded-3xl">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-8">
        Expense Analytics
      </h2>
      <div className="h-[400px] mb-8 overflow-hidden rounded-xl">
        <DayWiseExpenseChart expenses={dayWiseExpenses} />
      </div>

      <div className="text-center">
        <button
          onClick={onToggleCharts}
          className="btn-secondary"
        >
          {showCharts ? 'Hide Detailed Analytics' : 'View Detailed Analytics'}
        </button>
      </div>

      {showCharts && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <ExpenseCharts />
        </motion.div>
      )}
    </div>
  </div>
);