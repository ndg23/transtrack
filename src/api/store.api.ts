// storeervice.ts

import apiClient from "../../http_common";


// Define interface for Store data
interface Store {
  id: number;
  // Add other properties of Store interface here
}

// Base URL of your backend API
const BASE_URL = 'apiClients://example.com/api';

// Function to fetch store from the backend
export const fetchstore = async (): Promise<Store[]> => {
  try {
    // Make a GET request to fetch store
    const response = await apiClient.get<Store[]>(`/store`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching store:', error);
    throw new Error('Failed to fetch store');
  }
};

// Function to add a new Store
export const addStore = async (newStore: Store): Promise<Store> => {
  try {
    // Make a POST request to add a new Store
    const response = await apiClient.post<Store>(`/store`, newStore);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error adding Store:', error);
    throw new Error('Failed to add Store');
  }
};

// Function to update an existing Store
export const updateStore = async (updatedStore: Store): Promise<Store> => {
  try {
    // Make a PUT request to update the Store
    const response = await apiClient.put<Store>(
      `/store/${updatedStore.id}`,
      updatedStore
    );
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error updating Store:', error);
    throw new Error('Failed to update Store');
  }
};

// Function to delete a Store
export const deleteStore = async (storeId: number): Promise<void> => {
  try {
    // Make a DELETE request to delete the Store
    await apiClient.delete(`/store/${storeId}`);
  } catch (error) {
    // Handle errors
    console.error('Error deleting Store:', error);
    throw new Error('Failed to delete Store');
  }
};
