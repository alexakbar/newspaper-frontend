import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export interface LoginParams {
  email: string;
  password: string;
}

export type LoginResponseData = {
  id: number;
  username: string;
  email: string;
  preferred_sources: string;
  categories: string;
  authors: string;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export const doLogin = async (
  data: LoginParams
): Promise<ApiResponse<LoginResponseData>> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/login",
    data,
  };
  return await apiRequest<LoginResponseData>(config);
};

const LoginRequest = { doLogin };

export default LoginRequest;
