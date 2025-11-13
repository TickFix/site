import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const catalogService = {
  async getCategories() {
    try {
      const response = await axios.get(API_ENDPOINTS.categories);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener categorías'
      };
    }
  },

  async createCategory(categoryData) {
    try {
      const response = await axios.post(API_ENDPOINTS.categories, categoryData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al crear categoría'
      };
    }
  }
};