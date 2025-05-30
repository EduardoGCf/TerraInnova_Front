// src/services/pedidoService.ts

import axios from "axios";

const API_URL = "http://localhost:3000/pedidos";

const getTokenConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getPedidosAdmin = async () => {
  const config = getTokenConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Crear un nuevo pedido
export const crearPedido = async (pedido: {
  usuarioId: number; // ✅ asegúrate de incluirlo si el backend lo necesita
  total: number;
  items: { producto: number; cantidad: number; precio: number }[];
}) => {
  const config = getTokenConfig();
  const response = await axios.post(API_URL, pedido, config);
  return response.data;
};

// Obtener pedidos por usuario
export const getPedidosUsuario = async (usuarioId: number) => {
  const config = getTokenConfig();
  const response = await axios.get(`${API_URL}/usuario/${usuarioId}`, config);
  return response.data;
};

// Obtener todos los pedidos (admin)
export const getTodosLosPedidos = async () => {
  const config = getTokenConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};
export const cambiarEstadoPedido = async (id: number, nuevoEstado: string) => {
  const config = getTokenConfig();
  const response = await axios.put(
    `${API_URL}/${id}`,
    { estado: nuevoEstado },
    config
  );
  return response.data;
};
