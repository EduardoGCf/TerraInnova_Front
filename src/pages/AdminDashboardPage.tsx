import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function AdminDashboardPage() {
  const [resumen, setResumen] = useState<any>({});

  useEffect(() => {
    const fetchResumen = async () => {
      const productos = await api.get('/productos');
      const categorias = await api.get('/categorias');
      const pedidos = await api.get('/pedidos');
      setResumen({
        totalProductos: productos.data.length,
        totalCategorias: categorias.data.length,
        totalPedidos: pedidos.data.length,
      });
    };
    fetchResumen();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📊 Panel Administrativo</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text display-6">{resumen.totalProductos}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Categorías</h5>
              <p className="card-text display-6">{resumen.totalCategorias}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pedidos</h5>
              <p className="card-text display-6">{resumen.totalPedidos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
