import { useEffect, useState } from 'react';
import { getPedidosAdmin, cambiarEstadoPedido } from '../services/pedidoService';

interface PedidoItem {
  id: number;
  producto: {
    nombre: string;
  };
  cantidad: number;
  precio: number;
}

interface Pedido {
  id: number;
  total: number | string | null;
  estado: string;
  fecha: string;
  usuario?: {
    nombre: string;
    email: string;
  };
  items: PedidoItem[];
}

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [error, setError] = useState('');

  const fetchPedidos = async () => {
    try {
      const data = await getPedidosAdmin();
      setPedidos(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los pedidos.');
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const toggleEstado = async (id: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'pendiente' ? 'completo' : 'pendiente';
    try {
      await cambiarEstadoPedido(id, nuevoEstado);
      fetchPedidos(); // Actualiza la lista después del cambio
    } catch (err) {
      console.error('Error al cambiar estado del pedido:', err);
      alert('No se pudo actualizar el estado del pedido');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📦 Todos los Pedidos (Admin)</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.usuario?.nombre || 'Desconocido'}</td>
                  <td>{pedido.usuario?.email || 'Desconocido'}</td>
                  <td>${Number(pedido.total || 0).toFixed(2)}</td>
                  <td>{pedido.estado}</td>
                  <td>{new Date(pedido.fecha).toLocaleString()}</td>
                  <td>
                    <ul>
                      {pedido.items?.map((item) => (
                        <li key={item.id}>
                          {item.producto?.nombre || 'Producto'} - {item.cantidad} x ${Number(item.precio || 0).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${pedido.estado === 'pendiente' ? 'btn-success' : 'btn-secondary'}`}
                      onClick={() => toggleEstado(pedido.id, pedido.estado)}
                    >
                      Cambiar a {pedido.estado === 'pendiente' ? 'completo' : 'pendiente'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
