import axios from "axios";

export const axiosClinet = axios.create({

 baseURL: process.env.NODE_ENV === 'development' ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL,
 withXSRFToken: true,
 withCredentials: true
})