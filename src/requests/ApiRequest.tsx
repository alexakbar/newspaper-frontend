import { AxiosRequestConfig } from 'axios';
import api from 'src/api';

export interface ApiResponse<T> {
  data?: T | T[] | any,
  message: string,
  success: boolean,
}

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};