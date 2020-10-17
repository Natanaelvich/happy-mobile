import axios from 'axios';

const api = axios.create({
  baseURL: __DEV__ ? 'http://10.0.3.2:3334' : 'https://api.happy.mundotech.dev',
});

export default api;
