import axios from "axios";
import { setJwtHeader } from "./utils/jwt";

const BACKEND_URL = `https://online-restaurant-system.herokuapp.com/api`;

const configAxios = (token) => {
  axios.defaults.baseURL = BACKEND_URL;
  setJwtHeader(token);
};

export { BACKEND_URL, configAxios };
