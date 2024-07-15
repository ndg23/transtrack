// Rewardervice.ts

import apiClient from "../../http_common";


// Define interface for Reward data
interface Reward {
  id: number;
  // Add other properties of Reward interface here
}
interface UserReward{
    id:number;
    user:any
}
// Base URL of your backend API
const BASE_URL = 'apiClients://example.com/api';

// Function to fetch Reward from the backend
export const fetchReward = async (): Promise<Reward[]> => {
  try {
    // Make a GET request to fetch Reward
    const response = await apiClient.get<Reward[]>(`/reward`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching Reward:', error);
    throw new Error('Failed to fetch Reward');
  }
};
// Function to fetch Reward from the backend
export const claimReward = async ({rewardId,userId}): Promise<Reward[]> => {
  try {
    // Make a GET request to fetch Reward
    const response = await apiClient.post<Reward[]>(`/reward/claim`,{rewardId,userId});
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching Reward:', error);
    throw new Error('Failed to fetch Reward');
  }
};
// Function to fetch Reward from the backend
export const fetchRewardByUser = async (id:number): Promise<UserReward[]> => {
    try {
      // Make a GET request to fetch Reward
      const response = await apiClient.get<UserReward[]>(`user-reward/${id}/reward`);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Error fetching Reward:', error);
      throw new Error('Failed to fetch Reward');
    }
  };
// Function to add a new Reward
export const addReward = async (newReward: Reward): Promise<Reward> => {
  try {
    // Make a POST request to add a new Reward
    const response = await apiClient.post<Reward>(`/reward`, newReward);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error adding Reward:', error);
    throw new Error('Failed to add Reward');
  }
};

// Function to update an existing Reward
export const updateReward = async (updatedReward: Reward): Promise<Reward> => {
  try {
    // Make a PUT request to update the Reward
    const response = await apiClient.put<Reward>(
      `/reward/${updatedReward.id}`,
      updatedReward
    );
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error updating Reward:', error);
    throw new Error('Failed to update Reward');
  }
};

// Function to delete a Reward
export const deleteReward = async (RewardId: number): Promise<void> => {
  try {
    // Make a DELETE request to delete the Reward
    await apiClient.delete(`/reward/${RewardId}`);
  } catch (error) {
    // Handle errors
    console.error('Error deleting Reward:', error);
    throw new Error('Failed to delete Reward');
  }
};
