import axios from "axios";
import { setJwtHeader } from "./utils/jwt";

const BACKEND_URL = `http://localhost:8080/api`;

const configAxios = (token) => {
  axios.defaults.baseURL = BACKEND_URL;
  setJwtHeader(token);
};

export { BACKEND_URL, configAxios };
