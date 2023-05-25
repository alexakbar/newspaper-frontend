import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export interface SetPersonalizeParams {
  categories: string[] | null;
  preferred_sources: string[] | null;
  authors: string[] | null;
}

export type PersonalizeResponseData = {
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

export const setPersonalized = async (
  data: SetPersonalizeParams
): Promise<ApiResponse<PersonalizeResponseData>> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/set-personalize",
    data,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  return await apiRequest<PersonalizeResponseData>(config);
};

const SetPersonalizeRequest = { setPersonalized };

export default SetPersonalizeRequest;
