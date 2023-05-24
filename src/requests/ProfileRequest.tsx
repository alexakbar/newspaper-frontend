import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export type ProfileResponseData = {
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

export const getProfile = async (): Promise<
  ApiResponse<ProfileResponseData>
> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/user",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  return await apiRequest<ProfileResponseData>(config);
};

const ProfileRequest = { getProfile };

export default ProfileRequest;
