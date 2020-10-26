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
      const { data, headers } = await api.post("/auth", formData);
      console.log(localStorage.jwt, data);
      localStorage.setItem("jwt", headers.authorization);
      dispatch(
        setUser({
          id: data.id,
          username: data.username,
          role: data.role,
          closed: data.closed,
        })
      );
      history.push("/");
    } catch (err) {
      throw err;
    }
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
