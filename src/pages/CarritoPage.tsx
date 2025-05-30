import { useEffect, useState } from 'react';
import { crearPedido } from '../services/pedidoService';
import logo from '../assets/image/logo.png';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { FaShoppingCart } from "react-icons/fa";

interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('carrito') || '[]');
    const normalizado = stored.map((item: any) => ({
      id: item.id,
      nombre: item.nombre,
      precio: Number(item.precio),
      cantidad: Number(item.cantidad),
    }));
    setCarrito(normalizado);
    calcularTotal(normalizado);
  }, []);

  const calcularTotal = (items: ItemCarrito[]) => {
    const suma = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(suma);
  };

  const eliminarItem = (id: number) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    setCarrito(nuevo);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
    calcularTotal(nuevo);
  };

  const aumentarCantidad = (id: number) => {
    const nuevo = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevo);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
    calcularTotal(nuevo);
  };

  const disminuirCantidad = (id: number) => {
    const nuevo = carrito
      .map((item) =>
        item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevo);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
    calcularTotal(nuevo);
  };

  const hacerPedido = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem('carrito') || '[]');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const usuario = user?.sub;

      if (!usuario) {
        alert('Usuario no autenticado.');
        return;
      }

      if (stored.length === 0) {
        alert('El carrito está vacío.');
        return;
      }

      const total = stored.reduce(
        (acc: number, item: any) => acc + Number(item.precio) * item.cantidad,
        0
      );

      const items = stored.map((item: any) => ({
        producto: item.id,
        cantidad: item.cantidad,
        precio: Number(item.precio),
      }));

      const pedido = { usuario, total, items };

      await crearPedido(pedido);

      alert('Pedido realizado con éxito');
      localStorage.removeItem('carrito');
      window.location.reload();
    } catch (error) {
      console.error('❌ Error al hacer pedido:', error);
      alert('Ocurrió un error al hacer el pedido');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4"> <FaShoppingCart size={24} /> Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="text-center">No hay productos en el carrito.</p>
      ) : (
        <>
          <div className="list-group">
            {carrito.map((item) => (
              <div key={item.id} className="list-group-item mb-3 rounded shadow-sm d-flex p-3 align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
                <img
                  src={`http://localhost:3000/uploads/productos/${item.id}.jpg`}
                  alt={item.nombre}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = logo;
                  }}
                  className="rounded"
                  style={{ width: '120px', height: '120px', objectFit: 'cover', marginRight: '20px' }}
                />

                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.nombre}</h5>
                  <p className="mb-1">Precio unitario: <strong>${item.precio.toFixed(2)}</strong></p>
                  <div className="d-flex align-items-center mt-2">
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => aumentarCantidad(item.id)}>
                    <FaPlus />
                  </button>
                  <span className="mx-2">{item.cantidad}</span>
                  <button className="btn btn-sm btn-outline-secondary me-3" onClick={() => disminuirCantidad(item.id)}>
                    <FaMinus />
                  </button>
                  </div>
                </div>

                <div className="text-end">
                  <h6 className="text-muted mb-0">Subtotal:</h6>
                  <h5 className="text-dark">${(item.precio * item.cantidad).toFixed(2)}</h5>
                  <button className="btn btn-sm btn-outline-danger mt-2 d-flex align-items-center gap-2" onClick={() => eliminarItem(item.id)}>
  <FaTrashAlt />
  Eliminar
</button>

                </div>
              </div>
            ))}
          </div>

          {/* TOTAL Y BOTÓN */}
          <div className="d-flex justify-content-between align-items-center mt-4 p-3 rounded shadow" style={{ backgroundColor: '#e8f5e9' }}>
            <button className="btn btn-success px-4 py-2" onClick={hacerPedido}>
              Hacer pedido
            </button>
            <h4 className="mb-0">TOTAL: ${total.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
}
