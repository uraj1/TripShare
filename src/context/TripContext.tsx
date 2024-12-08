import React, { createContext, useContext, useState } from "react";
import { Trip, Expense, Traveler } from "../types";

interface TripContextType {
  currentTrip: Trip | null;
  createTrip: (
    name: string,
    destination: string,
    travelers: Traveler[],
    startDate: Date,
    endDate: Date
  ) => void;
  addExpense: (expense: Omit<Expense, "id" | "date">) => void;
  calculateSplit: () => {
    total: number;
    sharedTotal: number;
    perPerson: number;
    individualSplits: {
      [key: string]: {
        paid: number;
        owes: number;
        personalExpense: number;
      };
    };
  };
}

const TripContext = createContext<TripContextType | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  const createTrip = (
    name: string,
    destination: string,
    travelers: Traveler[],
    startDate: Date,
    endDate: Date
  ) => {
    setCurrentTrip({
      id: Date.now().toString(),
      name,
      destination,
      travelers,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      expenses: [],
    });
  };

  const addExpense = (expense: Omit<Expense, "id" | "date">) => {
    if (!currentTrip) return;

    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setCurrentTrip({
      ...currentTrip,
      expenses: [...currentTrip.expenses, newExpense],
    });
  };

  const calculateSplit = () => {
    if (!currentTrip) {
      return {
        total: 0,
        sharedTotal: 0,
        perPerson: 0,
        individualSplits: {},
      };
    }

    // Calculate shared and personal expenses separately
    const { sharedExpenses, personalExpenses } = currentTrip.expenses.reduce(
      (acc, expense) => {
        if (expense.isPersonal) {
          acc.personalExpenses.push(expense);
        } else {
          acc.sharedExpenses.push(expense);
        }
        return acc;
      },
      { sharedExpenses: [] as Expense[], personalExpenses: [] as Expense[] }
    );

    // Calculate totals
    const sharedTotal = sharedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const personalTotal = personalExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const total = sharedTotal + personalTotal;
    const perPerson = sharedTotal / currentTrip.travelers.length;

    // Initialize splits with shared expenses
    const individualSplits = currentTrip.travelers.reduce((acc, traveler) => {
      const paidShared = sharedExpenses
        .filter((expense) => expense.paidBy === traveler.id)
        .reduce((sum, expense) => sum + expense.amount, 0);

      const personalExpenseAmount = personalExpenses
        .filter((expense) => expense.paidBy === traveler.id)
        .reduce((sum, expense) => sum + expense.amount, 0);

      acc[traveler.id] = {
        paid: paidShared,
        owes: perPerson - paidShared,
        personalExpense: personalExpenseAmount,
      };

      return acc;
    }, {} as { [key: string]: { paid: number; owes: number; personalExpense: number } });

    return {
      total,
      sharedTotal,
      perPerson,
      individualSplits,
    };
  };

  return (
    <TripContext.Provider
      value={{ currentTrip, createTrip, addExpense, calculateSplit }}
    >
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};