import {Router, Routes, Route } from 'react-router-dom';
import ProductosPage from './pages/ProductosPage';
import CarritoPage from './pages/CarritoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HistorialPedidosPage from './pages/HistorialPedidosPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminPedidosPage from './pages/AdminPedidosPage';
import AdminCategoriasPage from './pages/AdminCategoriasPage';
import AdminProductosPage from './pages/AdminProductosPage';
import Navbar from './components/Navbar';
import Footer2 from './components/Footer2';
import HomePage from './pages/HomePage';
import {BrowserRouter} from 'react-router-dom';
function App() {
  return (
    
    <BrowserRouter>
      
      <Navbar />

        <Routes>
          {/* Cliente */}
          
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/historial" element={<HistorialPedidosPage />} />


          {/* Admin */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/pedidos" element={<AdminPedidosPage />} />
          <Route path="/admin/categorias" element={<AdminCategoriasPage />} />
          <Route path="/admin/productos" element={<AdminProductosPage />} />
        </Routes>

        <Footer2 />
    </BrowserRouter>
  );
}

export default App;
