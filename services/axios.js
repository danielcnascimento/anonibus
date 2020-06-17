import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-anonibusav2-7b640.cloudfunctions.net',
});

export default api;
