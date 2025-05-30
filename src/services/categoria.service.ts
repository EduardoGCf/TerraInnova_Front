import axios from "axios";

const API = "http://localhost:3000/categorias";

export const getCategorias = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createCategoria = async (categoria) => {
  const res = await axios.post(API, categoria);
  return res.data;
};

export const updateCategoria = async (id, categoria) => {
  const res = await axios.put(`${API}/${id}`, categoria);
  return res.data;
};

export const deleteCategoria = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
