import apiClient from "../../http_common";
import { IUser, IUpdatePass } from '../types';

// Define IErrorResponse interface

// Define IResponse interface
interface IResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any; // You can define the type of headers according to your needs
  // Add more properties if needed
}

// Define IErrorResponse interface
interface IErrorResponse {
  message: string;
}
// const API_BASE = '/api';
const RES = 'users';

const getUser = async (id: string | number): Promise<IUser> => {
  try {
    const response = await apiClient.get<IUser>(`${RES}/${id}`);
    return response.data;
  } catch (error) {
    console.error('getUser error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to fetch user';
    throw new Error(errorMessage);
  }
};

const create = async (data: IUser): Promise<IUser> => {
  try {
    const response = await apiClient.post<IUser>(`${RES}/merchant`, data);
    return response.data;
  } catch (error) {
    const errorMessage = (error as IErrorResponse).message || 'Failed to create user';
    throw new Error(errorMessage);
  }
};

const update = async (data: any): Promise<IUser> => {
  try {
 
    const response = await apiClient.put<IUser>(`${RES}/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('update error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to update user';
    throw new Error(errorMessage);
  }
};

const checkEmail = async (email:  string ): Promise<boolean> => {
  try {
    const response = await apiClient.post<boolean>(`${RES}/email`, email);
    return response.data;
  } catch (error) {
    console.error('checkEmail error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to check email';
    throw new Error(errorMessage);
  }
};

// ... Other functions follow the same pattern

export const UserService = {
  getUser,
  create,
  update,
  checkEmail,
};
