import { useEffect, useState } from 'react';
import { getProductos } from '../services/product.service';
import type { Producto } from '../models/Product';

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const agregarAlCarrito = (producto: Producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');

    const existente = carritoActual.find((item: any) => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));
  };

  return (
    <div className="container mt-4">
      <h2>🛍️ Productos disponibles</h2>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text">Precio: ${producto.precio}</p>
                <button className="btn btn-success" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
