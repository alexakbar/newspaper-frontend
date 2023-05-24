import { AxiosRequestConfig } from "axios";
import { ApiResponse, apiRequest } from "./ApiRequest";

export type GetSourceResponseData = {
  id: string;
  name: string;
};

const getSources = async (): Promise<ApiResponse<GetSourceResponseData>> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/sources",
  };
  return await apiRequest<GetSourceResponseData>(config);
};

const SourceRequest = { getSources };

export default SourceRequest;
