import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://v1.jinrishici.com",
});

// request config
axiosInstance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// response config
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
