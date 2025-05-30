import type { Producto } from "../models/Product";

export const getCart = (): Producto[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const addToCart = (producto: Producto) => {
  const cart = getCart();
  cart.push(producto);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
