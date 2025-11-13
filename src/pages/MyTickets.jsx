import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { ticketService } from '../services/ticketService';

export const MyTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTickets();
  }, [user]);

  const loadTickets = async () => {
    setLoading(true);
    setError('');
    
    const result = await ticketService.getTickets(user.email);
    
    if (result.success) {
      setTickets(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mis Tickets</h1>
          <Link
            to="/tickets/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear Nuevo Ticket
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tickets List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Lista de Tickets</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-4">Cargando tickets...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-600 mb-4">
                  No tienes tickets creados todavía
                </p>
                <Link
                  to="/tickets/create"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Crear mi primer ticket
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Ticket #{ticket.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {ticket.category} - {ticket.subcategory}
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        Abierto
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{ticket.description}</p>
                    {ticket.attachment_key && (
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                        Archivo adjunto: {ticket.attachment_key.split('/').pop()}
                      </div>
                    )}
                    <p className="text-sm text-gray-500">
                      Creado: {new Date(ticket.created_at).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {tickets.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total de Tickets</p>
              <p className="text-2xl font-bold text-gray-800">{tickets.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Tickets Abiertos</p>
              <p className="text-2xl font-bold text-blue-600">{tickets.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Con Archivos</p>
              <p className="text-2xl font-bold text-green-600">
                {tickets.filter(t => t.attachment_key).length}
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};