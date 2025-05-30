
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Categoria {
  id: number;
  nombre: string;
}

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState('');

  const cargarCategorias = async () => {
    const res = await api.get('/categorias');
    setCategorias(res.data);
  };

  const crearCategoria = async () => {
    if (!nombre.trim()) return;
    await api.post('/categorias', { nombre });
    setNombre('');
    cargarCategorias();
  };

  const eliminarCategoria = async (id: number) => {
    if (confirm('¿Eliminar esta categoría?')) {
      await api.delete(`/categorias/${id}`);
      cargarCategorias();
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div className="container mt-4">
      <h2>📂 Gestión de Categorías</h2>

      <div className="input-group my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button className="btn btn-success" onClick={crearCategoria}>
          Agregar
        </button>
      </div>

      <ul className="list-group">
        {categorias.map((cat) => (
          <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center">
            {cat.nombre}
            <button className="btn btn-danger btn-sm" onClick={() => eliminarCategoria(cat.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
