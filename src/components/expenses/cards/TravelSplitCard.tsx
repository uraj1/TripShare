import { FC } from 'react';

interface TravelerSplitCardProps {
  name: string;
  paid: number;
  owes: number;
  personalExpense: number;
  totalExpense: number;
}

const TravelerSplitCard: FC<TravelerSplitCardProps> = ({
  name,
  paid,
  owes,
  personalExpense,
  totalExpense,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h4 className="text-yellow-400 font-semibold mb-2">{name}</h4>
      <div className="space-y-2">
        <p className="text-white">Paid: ₹{paid.toFixed(2)}</p>
        <p className={`text-lg ${owes > 0 ? 'text-red-400' : 'text-green-400'}`}>
          {owes > 0
            ? `Owes: ₹${owes.toFixed(2)}`
            : `Gets back: ₹${Math.abs(owes).toFixed(2)}`}
        </p>
        {personalExpense > 0 && (
          <div className="border-t border-gray-700 pt-2 mt-2">
            <p className="text-yellow-400">Personal Expenses: ₹{personalExpense.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">
              Total (including personal): ₹{totalExpense.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TravelerSplitCard;