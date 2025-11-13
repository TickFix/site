import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            TiqFix
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <Link to="/catalog" className="hover:text-blue-200">
                  Catálogo
                </Link>
                <Link to="/tickets" className="hover:text-blue-200">
                  Mis Tickets
                </Link>
                <Link to="/tickets/create" className="hover:text-blue-200">
                  Crear Ticket
                </Link>
                <span className="text-blue-200">
                  {user?.email || 'Usuario'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200">
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};