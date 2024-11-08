import axios, { AxiosResponse } from "axios";
import { ApiClient } from "./types";
import { ApiError } from "./apiError";

const createApiClient = (baseURL: string): ApiClient => {
  const handleRequest = async <T>(
    request: Promise<AxiosResponse<T>>
  ): Promise<T> => {
    try {
      const response = await request;
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;
        const message =
          error.response.data?.message ||
          "An error occurred while fetching data";
        throw new ApiError(statusCode, message);
      } else {
        throw new Error("Failed to fetch data from API");
      }
    }
  };

  return {
    get: async <T>(url: string) =>
      handleRequest(axios.get<T>(`${baseURL}${url}`)),
    post: async <T>(url: string, data: unknown) =>
      handleRequest(axios.post<T>(`${baseURL}${url}`, data)),
    put: async <T>(url: string, data: unknown) =>
      handleRequest(axios.put<T>(`${baseURL}${url}`, data)),
    delete: async <T>(url: string) =>
      handleRequest(axios.delete<T>(`${baseURL}${url}`)),
  };
};

export { createApiClient };
