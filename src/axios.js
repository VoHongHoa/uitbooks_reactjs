import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/",
});
//axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
instance.interceptors.response.use((response) => {
  return response.data;
});
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default instance;
