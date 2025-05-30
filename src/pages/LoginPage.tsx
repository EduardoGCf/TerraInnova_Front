import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Función para decodificar el token JWT
function decodificarToken(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error('Error al decodificar token:', e);
    return null;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const token = res.data.access_token;
      localStorage.setItem('token', token);

      const userData = decodificarToken(token);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('Usuario autenticado:', userData);
      } else {
        console.warn('No se pudo decodificar el token');
      }
      navigate('/');
      window.location.reload(); // Recargar la página para actualizar el estado de autenticación
      
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">🔐 Iniciar Sesión</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
