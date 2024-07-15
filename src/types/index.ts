
// Define export TypeScript export types for the models
export type Store = {
    _id?: number;
    name: string;
    phone?: string;
    address: string;
    description?:string;
    // is_pinned?: boolean; // Uncomment if needed
  };
  
  export type User = {
    _id: number;
    firstName: string;
    phone: string;
    role: string;
    lastName: string;
    email: string;
  };
  
  export type Card = {
    _id: number;
    card_number: string;
    points: number;
    card_status: boolean;
    status: boolean;
  };
  
  export type Transaction = {
    _id: number;
    totalItems: number;
    amount: number;
  };
  