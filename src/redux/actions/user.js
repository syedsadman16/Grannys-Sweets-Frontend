import api from "axios";
import { setJwtHeader } from "../../utils/jwt";

const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

const resetUser = () => {
  return {
    type: "RESET_USER",
  };
};

const login = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data, headers } = await api.post("/auth", formData);
      localStorage.setItem("jwt", headers.authorization);
      localStorage.setItem("userId", data.id);
      dispatch(
        setUser({
          id: data.id,
          username: data.username,
          role: data.role,
          closed: data.closed,
          verified: data.verified,
        })
      );
      history.push("/");
    } catch (err) {
      throw err;
    }
  };
};

const getUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await api.get(`/users/${id}`);
      dispatch(
        setUser({
          id: data.id,
          username: data.username,
          role: data.role,
          closed: data.closed,
          verified: data.verified,
        })
      );
    } catch (err) {}
  };
};

const logout = (history) => {
  return async (dispatch) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    setJwtHeader(false);
    dispatch(resetUser());
    history.push("/");
  };
};

export { login, logout, setUser, getUser };
