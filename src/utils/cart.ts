// utils/cart.ts
export const addToCart = (producto) => {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const index = carrito.findIndex((p) => p.id === producto.id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

export const getCartItems = () =>
  JSON.parse(localStorage.getItem("carrito") || "[]");

export const clearCart = () => localStorage.removeItem("carrito");
