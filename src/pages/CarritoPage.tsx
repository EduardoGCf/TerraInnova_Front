import { useEffect, useState } from 'react';
import { crearPedido } from '../services/pedidoService';

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
      .filter((item) => item.cantidad > 0); // por si queda en 0, lo elimina
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
    } else {
        console.log("📌 Usuario autenticado:", usuario);
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

    const pedido = {
      usuario,  // ✅ se agrega el ID del usuario
      total,
      items,
    };

    console.log("✅ Enviando pedido:", pedido);

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
    <div className="container mt-4">
      <h2>🛒 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toFixed(2)}</td>
                  <td>{item.cantidad}</td>
                  <td>${(item.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => aumentarCantidad(item.id)}
                      >
                        ➕
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => disminuirCantidad(item.id)}
                      >
                        ➖
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => eliminarItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-primary mt-3" onClick={hacerPedido}>
            Realizar Pedido
          </button>
        </>
      )}
    </div>
  );
}
