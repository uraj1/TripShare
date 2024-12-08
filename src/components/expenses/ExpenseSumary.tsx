
import { useTrip } from "../../context/TripContext";
import { useState, useEffect } from "react";
import ExpenseCard from "./cards/ExpenseCard";
import DayWiseExpenses from "./cards/DayWiseExpense";
import TravelerSplitCard from "./cards/TravelSplitCard";


const ExpenseSummary = ({ onDayWiseExpenses }: { onDayWiseExpenses: (expenses: { [key: string]: number }) => void }) => {
  const { calculateSplit, currentTrip } = useTrip();

  if (!currentTrip || !currentTrip.travelers || !currentTrip.expenses) {
    return (
      <div className="text-center text-yellow-400">
        <h2 className="text-2xl font-bold">No trip or expense data available.</h2>
      </div>
    );
  }

  const [dayWiseExpenses, setDayWiseExpenses] = useState<{ [key: string]: number }>({});

  const { total, sharedTotal, perPerson, individualSplits } = calculateSplit();

  useEffect(() => {
    const getDayWiseExpenses = () => {
      const expenses: { [key: string]: number } = {};

      currentTrip.expenses.forEach((expense) => {
        if (!expense.isPersonal) {
          const formattedDay = `Day ${expense.day}`;
          if (!expenses[formattedDay]) {
            expenses[formattedDay] = 0;
          }
          expenses[formattedDay] += expense.amount;
        }
      });

      return expenses;
    };

    const dayWise = getDayWiseExpenses();
    setDayWiseExpenses(dayWise);
    onDayWiseExpenses(dayWise); // Pass the calculated dayWiseExpenses to the parent (TripManager)
  }, [currentTrip.expenses, onDayWiseExpenses]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExpenseCard title="Total Expenses" amount={total} subtitle="Including personal expenses" />
        <ExpenseCard title="Shared Expenses" amount={sharedTotal} subtitle="Split between members" />
        <ExpenseCard title="Per Person Share" amount={perPerson} subtitle="From shared expenses" />
      </div>

      {/* Pass dayWiseExpenses to DayWiseExpenses component */}
      <DayWiseExpenses expenses={dayWiseExpenses} />

      <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Individual Splits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTrip.travelers.map((traveler) => {
            const split = individualSplits[traveler.id];
            return (
              <TravelerSplitCard
                key={traveler.id}
                name={traveler.name}
                paid={split.paid}
                owes={split.owes}
                personalExpense={split.personalExpense}
                totalExpense={split.paid + split.personalExpense}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
