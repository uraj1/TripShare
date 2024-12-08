import { FC } from 'react';

interface ExpenseCardProps {
  title: string;
  amount: number;
  className?: string;
  subtitle?: string;
  isNegative?: boolean;
}

const ExpenseCard: FC<ExpenseCardProps> = ({ title, amount, className = '', subtitle, isNegative }) => {
  return (
    <div className={`bg-gray-900 rounded-lg p-6 ${className}`}>
      <p className="text-yellow-400 text-lg font-semibold">{title}</p>
      <p className={`text-3xl font-bold ${isNegative ? 'text-red-400' : 'text-white'}`}>
        ₹{amount.toFixed(2)}
      </p>
      {subtitle && <p className="text-gray-400 text-sm mt-2">{subtitle}</p>}
    </div>
  );
}

export default ExpenseCard;