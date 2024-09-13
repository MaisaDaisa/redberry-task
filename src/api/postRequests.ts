import { axiosInstance } from "@/api/apiConstants";
import { agentPost } from "@/api/apiTypes";


export const postRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postAgents = async (data: any) => {
  return postRequest('/agents', data);
};

export const postListings = async (data: any) => {
  return postRequest('/listings', data);
};