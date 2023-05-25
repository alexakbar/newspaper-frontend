import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  c_password: string;
}

export type RegisterResponseData = {
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

export const doRegister = async (
  data: RegisterParams
): Promise<ApiResponse<RegisterResponseData>> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/register",
    data,
  };
  return await apiRequest<RegisterResponseData>(config);
};

const RegisterRequest = { doRegister };

export default RegisterRequest;
