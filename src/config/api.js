// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

export const API_ENDPOINTS = {
  // Auth Service (port 8001)
  login: `${API_BASE_URL}:8001/auth/login`,
  register: `${API_BASE_URL}:8001/auth/register`,
  
  // Catalog Service (port 8002)
  categories: `${API_BASE_URL}:8002/catalog/categories`,
  
  // Ticket Service (port 8003)
  tickets: `${API_BASE_URL}:8003/tickets`,
  ticketUpload: `${API_BASE_URL}:8003/tickets/upload`,
};

// For production (API Gateway), the endpoints will be:
// login: `${API_BASE_URL}/auth/login`
// categories: `${API_BASE_URL}/catalog/categories`
// tickets: `${API_BASE_URL}/tickets`