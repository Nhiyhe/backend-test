import { ApiError } from "../client/apiError";
import { ApiClient } from "../client/types";

type ParcData = {
  name: string;
  description: string;
};

const PARC_URL = "/api/1/parcs/";

const createParcService = (apiClient: ApiClient) => {
  const getAll = async (): Promise<ParcData | null> => {
    try {
      return await apiClient.get(`${PARC_URL}`);
    } catch (error) {
      throw error;
    }
  };

  const getParc = async (parcId: string): Promise<ParcData | null> => {
    try {
      return await apiClient.get(`${PARC_URL}${parcId}`);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        console.warn(`Parc with ID ${parcId} not found.`);
        return null;
      }
      throw error;
    }
  };

  const createParc = async (data: ParcData): Promise<ParcData> => {
    try {
      return await apiClient.post(`${PARC_URL}`, data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Failed to create park: ${error.message}`);
      }
      throw error;
    }
  };

  const updateParc = async (
    parcId: string,
    data: ParcData
  ): Promise<ParcData> => {
    try {
      return await apiClient.put(`${PARC_URL}${parcId}`, data);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Failed to update parc: ${error.message}`);
      }
      throw error;
    }
  };

  const deleteParc = async (parcId: string): Promise<void> => {
    try {
      await apiClient.delete(`${PARC_URL}${parcId}`);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        console.warn(`Parc with ID ${parcId} not found, unable to delete.`);
      } else if (error instanceof ApiError) {
        console.error(`Failed to delete parc: ${error.message}`);
      }
      throw error;
    }
  };

  return {
    getParc,
    createParc,
    updateParc,
    deleteParc,
    getAll,
  };
};

export { createParcService, ParcData };
