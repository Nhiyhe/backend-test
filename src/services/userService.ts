import { ApiError } from "../client/apiError";
import { ApiClient } from "../client/types";

type UserData = {
  name: string;
  email: string;
};

const USER_URL = "/api/1/users/";

const createUserService = (apiClient: ApiClient) => {
  const getAll = async (): Promise<UserData | null> => {
    try {
      return await apiClient.get(`${USER_URL}`);
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (userId: string): Promise<UserData | null> => {
    try {
      return await apiClient.get(`${USER_URL}${userId}`);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        console.warn(`User with ID ${userId} not found.`);
        return null;
      }
      throw error;
    }
  };

  const createUser = async (data: UserData): Promise<UserData> => {
    try {
      return await apiClient.post(`${USER_URL}`, data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Failed to create user: ${error.message}`);
      }
      throw error;
    }
  };

  const updateUser = async (
    userId: string,
    data: UserData
  ): Promise<UserData> => {
    try {
      return await apiClient.put(`${USER_URL}${userId}`, data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Failed to update user: ${error.message}`);
      }
      throw error;
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    try {
      await apiClient.delete(`${USER_URL}${userId}`);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        console.warn(`User with ID ${userId} not found, unable to delete.`);
      } else if (error instanceof ApiError) {
        console.error(`Failed to delete user: ${error.message}`);
      }
      throw error;
    }
  };

  return {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAll,
  };
};

export { createUserService, UserData };
