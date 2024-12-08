import { FC } from 'react';

interface DayWiseExpensesProps {
  expenses: { [key: string]: number };
}

const DayWiseExpenses: FC<DayWiseExpensesProps> = ({ expenses }) => {
  const hasExpenses = Object.keys(expenses).length > 0;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Day-wise Expenses</h3>
      {hasExpenses ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(expenses).map(([day, amount]) => (
            <div key={day} className="bg-gray-900 rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold mb-2">{day}</h4>
              <p className="text-white text-2xl">₹{amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <p>No expenses recorded yet.</p>
        </div>
      )}
    </div>
  );
};

export default DayWiseExpenses;
