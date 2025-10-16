import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/customer';

const customerService = {
  // Get all customers
  getAllCustomers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getCustomers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Get customer by ID
  getCustomerById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getCustomer/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  // Create new customer
  createCustomer: async (customer) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, customer);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (id, customer) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, customer);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  // Delete customer
  deleteCustomer: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
};

export default customerService;
