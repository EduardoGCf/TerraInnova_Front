import axios from "axios";

const API = "http://localhost:3000/productos";

export const getProductos = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createProducto = async (producto) => {
  const res = await axios.post(API, producto);
  return res.data;
};

export const updateProducto = async (id, producto) => {
  const res = await axios.put(`${API}/${id}`, producto);
  return res.data;
};

export const deleteProducto = async (id: number) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadImagenProducto = async (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axios.post(`${API}/${id}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
