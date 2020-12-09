import axios from "axios";
import { setJwtHeader } from "./utils/jwt";

const BACKEND = process.env.REACT_APP_BACKEND_URL;

const BACKEND_URL =
  process.env.NODE_ENV === "production" ? BACKEND : `http://localhost:8080/api`;

const configAxios = (token) => {
  axios.defaults.baseURL = BACKEND_URL;
  setJwtHeader(token);
};

export { BACKEND_URL, configAxios };
