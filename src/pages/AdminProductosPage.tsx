import { useEffect, useState } from 'react';
import { getProductos, createProducto, deleteProducto } from '../services/product.service';
import { getCategorias } from '../services/categoria.service';
import type { Producto } from '../models/Product';
import type { Categoria } from '../models/Categoria';

const AdminProductosPage = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [categoriaId, setCategoriaId] = useState<number | ''>('');

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const cargarCategorias = async () => {
    const data = await getCategorias();
    setCategorias(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion || !precio || !categoriaId) return;

    await createProducto({
      nombre,
      descripcion,
      precio,
      categoria: { id: categoriaId as number },
    });

    setNombre('');
    setDescripcion('');
    setPrecio(0);
    setCategoriaId('');
    cargarProductos();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    await deleteProducto(id);
    cargarProductos();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 Administración de Productos</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={categoriaId}
              onChange={(e) => setCategoriaId(Number(e.target.value))}
              required
            >
              <option value="">Categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-primary mt-3" type="submit">Agregar Producto</button>
      </form>

      <ul className="list-group">
        {productos.map((prod) => (
          <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{prod.nombre} - ${prod.precio} - {prod.categoria?.nombre || 'Sin categoría'}</span>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductosPage;
