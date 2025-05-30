
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', {
        nombre,
        email,
        password,
        direccion,
      });
      navigate('/login');
    } catch (err) {
      setError('No se pudo registrar');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">📝 Crear Cuenta</h3>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label>Dirección (opcional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-center">
                  <button type="submit" className="btn btn-success">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
