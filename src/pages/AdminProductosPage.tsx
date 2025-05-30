import { useEffect, useState } from 'react';
import { getProductos, createProducto, deleteProducto, uploadImagenProducto } from '../services/product.service';
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
  const [imagen, setImagen] = useState<File | null>(null);

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
    try {
      if (!nombre || !descripcion || !precio || !categoriaId) return;

      // 1. Crear el producto
      const nuevo = await createProducto({
        nombre,
        descripcion,
        precio,
        categoria: { id: categoriaId as number },
      });

      // 2. Subir la imagen si existe
      if (imagen) {
        await uploadImagenProducto(nuevo.id, imagen);
      }

      alert('Producto creado con imagen');
      setNombre('');
      setDescripcion('');
      setPrecio(0);
      setCategoriaId('');
      setImagen(null);
      cargarProductos();
    } catch (error) {
      console.error('Error al crear producto o subir imagen:', error);
      alert('Ocurrió un error al crear el producto');
    }
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

        <div className="row mt-3">
          <div className="col-md-6">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImagen(e.target.files?.[0] || null)}
            />
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary w-100" type="submit">Agregar Producto</button>
          </div>
        </div>
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
