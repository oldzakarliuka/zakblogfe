import axios from "axios";
import TokenService from "./storage.service";

export default ({ requiresAuth = false } = {}) => {
  const options = {};
  options.baseURL = "https://whyzakblog.herokuapp.com/v1";

  if (requiresAuth) {
    options.headers.Authorization = TokenService.getToken();
  }
  const instance = axios.create(options);

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
