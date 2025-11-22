import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import logo from '../assets/logo.png';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authService.login(formData);

    if (result.success) {
      login(result.data.access_token, { email: formData.email });
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0F1C2E]">
      <div className="bg-[#1A2332] p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="TiqFix Logo" 
            className="h-20 w-auto"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Iniciar 
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#0F1C2E] border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E88E5] text-white py-2 rounded hover:bg-[#1976D2] disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-[#1E88E5] hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};