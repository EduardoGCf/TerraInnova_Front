import type { Producto } from "./Product";

export interface PedidoItem {
  id: number;
  producto: Producto;
  cantidad: number;
  precio: number;
}
