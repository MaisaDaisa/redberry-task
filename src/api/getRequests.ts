import { axiosInstance } from '@/api/apiConstants';
import { region, cityGet } from "./apiTypes";


export const getRequest = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const getRegions = async (): Promise<region[]> => {
  return getRequest('/regions');
};

export const getCities = async (): Promise<cityGet[]> => {
  return getRequest('/cities');
};

export const getAgents = async () => {
  return getRequest('/agents');
};

export const getAllListings = async () => {
  return getRequest('/real-estates');
}

export const getListingById= async (id: string) => {
  return getRequest(`/real-estates/${id}`);
}

