// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

// Detect if running locally or in production
const isLocal = API_BASE_URL.includes('localhost');

export const API_ENDPOINTS = {
  // Auth Service
  login: isLocal 
    ? `${API_BASE_URL}:8001/auth/login`
    : `${API_BASE_URL}/auth/login`,
  register: isLocal 
    ? `${API_BASE_URL}:8001/auth/register`
    : `${API_BASE_URL}/auth/register`,
  
  // Catalog Service
  categories: isLocal 
    ? `${API_BASE_URL}:8002/catalog/categories`
    : `${API_BASE_URL}/catalog/categories`,
  
  // Ticket Service
  tickets: isLocal 
    ? `${API_BASE_URL}:8003/tickets`
    : `${API_BASE_URL}/tickets`,
  ticketUpload: isLocal 
    ? `${API_BASE_URL}:8003/tickets/upload`
    : `${API_BASE_URL}/tickets/upload`,
};

// Log for debugging (remove in production if needed)
console.log('API Base URL:', API_BASE_URL);
console.log('Environment:', isLocal ? 'Development' : 'Production');