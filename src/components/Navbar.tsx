import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/image/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    const nombre = localStorage.getItem('nombre');
    setIsLogged(!!token);
    setIsAdmin(rol === 'admin');
    if (nombre) setNombreUsuario(nombre);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 shadow-sm" style={{ backgroundColor: '#658239' }}>
      <Link
        className="navbar-brand d-flex align-items-center gap-2"
        to="/"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.4rem',
          color: '#ffffff',
          textDecoration: 'none',
        }}
      >
        <img
          src={logo}
          alt="TerraInnova Logo"
          style={{
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            padding: '3px',
          }}
        />
        TerraInnova
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          {!isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/productos">Productos</Link>
              </li>
              
            </>
          )}

          {isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/categorias">Categorías</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/pedidos">Pedidos</Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
                <Link className="nav-link text-white" to="/carrito"><FaShoppingCart size={24} /></Link>
              </li>
          <li className="nav-item dropdown">
            <button
              className="btn nav-link dropdown-toggle d-flex align-items-center gap-2 text-white"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ background: 'none', border: 'none' }}
            >
              <FaUserCircle size={22} />
              {isLogged && (
                <span style={{ fontWeight: 500 }}>
                  {nombreUsuario || 'Usuario'}
                </span>
              )}
            </button>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              {!isLogged ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">Iniciar sesión</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">Registrarse</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/historial">Historial de compras</Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        handleLogout();
                        window.location.reload();
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
