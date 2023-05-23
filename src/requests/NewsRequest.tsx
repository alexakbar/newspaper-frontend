import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export interface SearchNewsParams {
  categories: string[] | null,
  start_date: string | null,
  end_date: string | null,
  sources: string[] | null,
  q: string | null,
} 

export type SearchNewsResponseData = {
  id: number,
  title: string,
  description: string,
  url: string,
  image: string,
  published_at: string,
  author: string | null,
  created_at: string | null,
  updated_at: string | null,
}

export const searchNews = async (data: SearchNewsParams): Promise<ApiResponse<SearchNewsResponseData>> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/search-articles',
    data
  };
  return await apiRequest<SearchNewsResponseData>(config);
};

const NewsRequest = { searchNews };

export default NewsRequest;