import axios from "axios";
import KeycloakService from "../services/KeycloakService";

const _axiosClient = axios.create({
  baseURL: "https://client-api.firstjob.space",
});

_axiosClient.interceptors.request.use(
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

export default _axiosClient;