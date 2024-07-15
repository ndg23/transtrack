// Offerervice.ts

import apiClient from "../../http_common";


// Define interface for Offer data
interface Offer {
  id: number;
  // Add other properties of Offer interface here
}

// Base URL of your backend API
const BASE_URL = 'apiClients://example.com/api';

// Function to fetch Offer from the backend
export const fetchOffer = async (): Promise<Offer[]> => {
  try {
    // Make a GET request to fetch Offer
    const response = await apiClient.get<Offer[]>(`/offer`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching Offer:', error);
    throw new Error('Failed to fetch Offer');
  }
};

// Function to add a new Offer
export const addOffer = async (newOffer: Offer): Promise<Offer> => {
  try {
    // Make a POST request to add a new Offer
    const response = await apiClient.post<Offer>(`/Offer`, newOffer);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error adding Offer:', error);
    throw new Error('Failed to add Offer');
  }
};

// Function to update an existing Offer
export const updateOffer = async (updatedOffer: Offer): Promise<Offer> => {
  try {
    // Make a PUT request to update the Offer
    const response = await apiClient.put<Offer>(
      `/Offer/${updatedOffer.id}`,
      updatedOffer
    );
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error updating Offer:', error);
    throw new Error('Failed to update Offer');
  }
};

// Function to delete a Offer
export const deleteOffer = async (OfferId: number): Promise<void> => {
  try {
    // Make a DELETE request to delete the Offer
    await apiClient.delete(`/Offer/${OfferId}`);
  } catch (error) {
    // Handle errors
    console.error('Error deleting Offer:', error);
    throw new Error('Failed to delete Offer');
  }
};
