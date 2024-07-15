import { ICard, IUpdatePass } from '../types';
import http from "../../http_common";

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
const RES = 'card';

const getCard = async (): Promise<any> => {
  try {
    const response = await http.get<any>(`${RES}`);
    return response.data;
  } catch (error) {
    console.error('getCard error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to fetch Card';
    throw new Error(errorMessage);
  }
};
const getCardByUserId = async (user:number): Promise<any> => {
  try {
    const response = await http.get<any>(`${RES}/user/${user}`);
    return response.data;
  } catch (error) {
    console.error('getCard error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to fetch Card';
    throw new Error(errorMessage);
  }
};
const create = async (data: ICard): Promise<ICard> => {
  try {
    const response = await http.post<ICard>(`${RES}/merchant`, data);
    return response.data;
  } catch (error) {
    console.error('create error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to create Card';
    throw new Error(errorMessage);
  }
};

const update = async (data: any): Promise<ICard> => {
  try {
    const response = await http.put<ICard>(`${RES}/${data.id}`, data);
    return response.data;
  } catch (error) {
    console.error('update error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to update Card';
    throw new Error(errorMessage);
  }
};

const checkEmail = async (email:  string ): Promise<boolean> => {
  try {
    const response = await http.post<boolean>(`${RES}/email`, email);
    return response.data;
  } catch (error) {
    console.error('checkEmail error:', error);
    const errorMessage = (error as IErrorResponse).message || 'Failed to check email';
    throw new Error(errorMessage);
  }
};

// ... Other functions follow the same pattern

export const CardService = {
  getCard,
  create,
  getCardByUserId,
  update,
  checkEmail,
};
