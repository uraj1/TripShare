export interface Traveler {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  paidBy: string; 
  day: string;
  isPersonal: boolean;
}


export interface Trip {
  id: string;
  name: string;
  destination: string;
  expenses: Expense[];
  travelers: Traveler[];
  startDate: string; 
  endDate: string;  
}

export interface Place {
  id: string;
  name: string;
  image: string;
  rating: number;
  description: string;
  distance: string;
  address: string;
}