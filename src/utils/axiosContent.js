import axios from "axios";
import KeycloakService from "../services/KeycloakService";

const _axiosContent = axios.create({
  baseURL: "https://content-api.firstjob.space",
});

_axiosContent.interceptors.request.use(
  async (config) => {
    if (KeycloakService.isLoggedIn()) {
      const token = await KeycloakService.getToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default _axiosContent;
