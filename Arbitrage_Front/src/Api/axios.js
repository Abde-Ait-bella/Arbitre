import axios from "axios";

export const axiosClinet = axios.create({
 baseURL: import.meta.env.VITE_BACKEND_URL,
 withXSRFToken: true,
 withCredentials: true
})