import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.1.109:3000', // URL de base de l'API
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default apiClient;
