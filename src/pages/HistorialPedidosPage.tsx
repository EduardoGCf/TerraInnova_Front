// src/pages/HistorialPedidosPage.tsx

import { useEffect, useState } from 'react';
import { getPedidosUsuario } from '../services/pedidoService';

interface Pedido {
  id: number;
  estado: string;
  fecha: string;
  total: number;
}

const HistorialPedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');

        console.log('📌 Usuario cargado:', user);
        console.log('🔐 Token cargado:', token);

        if (!user?.sub) {
          console.error(' ID de usuario no encontrado');
          return;
        }

        if (!token) {
          console.error('❌ Token no encontrado en localStorage');
          return;
        }

        const data = await getPedidosUsuario(user.sub);

        // Normalizamos el total por si viene como string o null
        const pedidosNormalizados = data.map((p: any) => ({
          ...p,
          total: Number(p.total),
        }));

        setPedidos(pedidosNormalizados);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📜 Historial de Pedidos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{new Date(pedido.fecha).toLocaleString()}</td>
                <td>{pedido.estado}</td>
                <td>${Number(pedido.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialPedidosPage;
