import axios from "axios";
import { region, city } from "./apiTypes";

const token = import.meta.env.VITE_TOKEN;

const BaseUrl = 'https://api.real-estate-manager.redberryinternship.ge/api';

export const getRequest = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const getRequestWithToken = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data with token:", error);
    throw error;
  }
};


export const getRegions = async (): Promise<region[]> => {
  return getRequest(BaseUrl + '/regions');
};

export const getCities = async (): Promise<city[]> => {
  return getRequest(BaseUrl + '/cities');
};

