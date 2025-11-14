import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-[#1A2332] to-[#1E88E5] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <Link 
            to={isAuthenticated ? "/dashboard" : "/"} 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="TiqFix" className="h-10 w-auto" />
            <span className="text-white text-2xl font-bold">TiqFix</span>
          </Link>

          {/* Menu de navegación */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-200 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/catalog"
                  className="text-white hover:text-gray-200 transition-colors font-medium"
                >
                  Catálogo
                </Link>
                <Link
                  to="/tickets"
                  className="text-white hover:text-gray-200 transition-colors font-medium"
                >
                  Mis Tickets
                </Link>
                <Link
                  to="/tickets/create"
                  className="text-white hover:text-gray-200 transition-colors font-medium"
                >
                  Crear Ticket
                </Link>

                {/* Usuario y logout */}
                <div className="flex items-center gap-4 ml-6 border-l border-white/30 pl-6">
                  <span className="text-white font-medium">
                    {user?.email || 'Usuario'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition-colors font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded transition-colors font-medium"
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