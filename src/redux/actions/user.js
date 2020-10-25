import api from "axios";
import { setJwtHeader } from "../../utils/jwt";

const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

const login = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data } = await api.post("/auth", formData);
      dispatch(setUser({ ...data }));
      history.push("/");
    } catch (err) {}
  };
};

const logout = (history) => {
  return async (dispatch) => {
    localStorage.removeItem("jwt");
    setJwtHeader(false);
    dispatch(setUser({}));
    history.push("/");
  };
};

export { login, logout, setUser };
