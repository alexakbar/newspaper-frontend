import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export interface SearchNewsParams {
  categories: string[] | null;
  start_date: string | null;
  end_date: string | null;
  sources: string[] | null;
  q: string | null;
}

export type SearchNewsResponseData = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  published_at: string;
  author: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export const searchNews = async (
  data: SearchNewsParams
): Promise<ApiResponse<SearchNewsResponseData>> => {
  // if has a token
  var headers = {};
  var url = "/search-articles-guest";
  const token = sessionStorage.getItem("token");
  if (token) {
    headers = {
      Authorization: "Bearer " + token,
    };
    url = "/search-articles";
  }
  const config: AxiosRequestConfig = {
    method: "POST",
    url: url,
    headers: {
      ...headers,
    },
    data,
  };
  return await apiRequest<SearchNewsResponseData>(config);
};

const NewsRequest = { searchNews };

export default NewsRequest;
