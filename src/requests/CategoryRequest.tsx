import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export type GetCategoryResponseData = {
  id: number,
  name: string,
}

export const getCategories = async (): Promise<ApiResponse<GetCategoryResponseData>> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: '/categories',
  };
  return await apiRequest<GetCategoryResponseData>(config);
};

const CategoryRequest = { getCategories };

export default CategoryRequest;