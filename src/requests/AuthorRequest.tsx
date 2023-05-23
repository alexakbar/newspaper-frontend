import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export type GetAuthorResponseData = {
  id: number,
  name: string,
}

const getAuthors = async (): Promise<ApiResponse<GetAuthorResponseData>> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: '/authors',
  };
  return await apiRequest<GetAuthorResponseData>(config);
};

const AuthorRequest = { getAuthors };

export default AuthorRequest;