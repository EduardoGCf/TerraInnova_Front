import type { Categoria } from "./Categoria";

// src/models/Product.ts
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: Categoria;
}
