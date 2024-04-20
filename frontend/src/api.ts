import axios from "axios";

export const instance = axios.create({
  //   withCredentials: true,
  baseURL: "http://localhost:3000/api/v1",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
