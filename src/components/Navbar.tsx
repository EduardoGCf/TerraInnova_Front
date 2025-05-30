import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    setIsLogged(!!token);
    setIsAdmin(rol === 'admin');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">🌱 TerraInnova</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          {/* CLIENTE */}
          {!isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">Carrito</Link>
              </li>
              {isLogged && (
                <li className="nav-item">
                  <Link className="nav-link" to="/historial">Mis pedidos</Link>
                </li>
              )}
            </>
          )}

          {/* ADMIN */}
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/categorias">Categorías</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/pedidos">Pedidos</Link>
              </li>
            </>
          )}

          {/* BOTONES EXTRAS PARA PRUEBA MANUAL (aunque no seas admin o logueado) */}
          <li className="nav-item">
            <Link className="nav-link" to="/carrito">[TEST] Carrito</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/historial">[TEST] Historial</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">[TEST] Admin Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos">[TEST] Admin Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/categorias">[TEST] Admin Categorías</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/pedidos">[TEST] Admin Pedidos</Link>
          </li>
        </ul>

        <ul className="navbar-nav">
          {isLogged ? (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
