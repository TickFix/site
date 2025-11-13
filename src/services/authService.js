import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
  async register(userData) {
    try {
      const response = await axios.post(API_ENDPOINTS.register, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al registrar usuario'
      };
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post(API_ENDPOINTS.login, credentials);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Credenciales inválidas'
      };
    }
  }
};