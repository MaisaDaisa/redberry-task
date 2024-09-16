import axios from 'axios'

// Constants
// please bear in mind this is not a wise way to store sensitive data especially in client side which can be accessed by anyone
export const token = import.meta.env.VITE_TOKEN
export const BaseUrl =
  'https://api.real-estate-manager.redberryinternship.ge/api'

// Axios instance
export const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
})
