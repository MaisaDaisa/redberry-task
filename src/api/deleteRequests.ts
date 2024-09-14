import { axiosInstance } from '@/api/apiConstants';


export const deleteRequest = async (url: string) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteListing = async (id: string) => {
  return deleteRequest(`/real-estates/${id}`);
};