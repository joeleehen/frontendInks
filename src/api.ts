import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:8000"
    baseURL: "http://18.190.95.191:80"
});

export default api;
