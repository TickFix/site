import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Bienvenido, {user?.email?.split('@')[0] || 'Usuario'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card - Crear Ticket */}
          <Link
            to="/tickets/create"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Crear Ticket</h3>
            <p className="text-gray-600">Reporta un problema o solicita soporte</p>
          </Link>

          {/* Card - Gestionar Catálogo */}
          <Link
            to="/catalog"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Gestionar Catálogo</h3>
            <p className="text-gray-600">Administra categorías y subcategorías</p>
          </Link>

          {/* Card - Ver Estadísticas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Estadísticas</h3>
            <p className="text-gray-600">Próximamente disponible</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">
            Sistema de Gestión de Tickets
          </h2>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Crea y gestiona tickets de soporte</li>
            <li>✓ Administra el catálogo de categorías</li>
            <li>✓ Sube evidencias y archivos adjuntos</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};