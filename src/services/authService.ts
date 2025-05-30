import axios from "axios";

const API = "http://localhost:3000/auth";

export const login = async (credenciales) => {
  const res = await axios.post(`${API}/login`, credenciales);
  return res.data;
};

export const register = async (datos) => {
  const res = await axios.post(`${API}/register`, datos);
  return res.data;
};
