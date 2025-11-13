import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const ticketService = {
  async getTickets(userEmail) {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.tickets}/?user_email=${userEmail}`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al obtener tickets'
      };
    }
  },

  async createTicket(ticketData, userEmail) {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.tickets}/?user_email=${userEmail}`,
        ticketData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al crear ticket'
      };
    }
  },

  async uploadFile(file, userEmail) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${API_ENDPOINTS.ticketUpload}?user_email=${userEmail}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Error al subir archivo'
      };
    }
  }
};