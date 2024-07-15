// TransactionService.ts

import axios from 'axios'; // You might need to install axios if you haven't already (npm install axios)

// Define interface for transaction data
interface Transaction {
  id: number;
  // Add other properties of Transaction interface here
}

// Base URL of your backend API
const BASE_URL = 'https://example.com/api';

// Function to fetch transactions from the backend
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    // Make a GET request to fetch transactions
    const response = await axios.get<Transaction[]>(`${BASE_URL}/transactions`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
};

// Function to add a new transaction
export const addTransaction = async (newTransaction: Transaction): Promise<Transaction> => {
  try {
    // Make a POST request to add a new transaction
    const response = await axios.post<Transaction>(`${BASE_URL}/transactions`, newTransaction);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error adding transaction:', error);
    throw new Error('Failed to add transaction');
  }
};

// Function to update an existing transaction
export const updateTransaction = async (updatedTransaction: Transaction): Promise<Transaction> => {
  try {
    // Make a PUT request to update the transaction
    const response = await axios.put<Transaction>(
      `${BASE_URL}/transactions/${updatedTransaction.id}`,
      updatedTransaction
    );
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
};

// Function to delete a transaction
export const deleteTransaction = async (transactionId: number): Promise<void> => {
  try {
    // Make a DELETE request to delete the transaction
    await axios.delete(`${BASE_URL}/transactions/${transactionId}`);
  } catch (error) {
    // Handle errors
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
};
