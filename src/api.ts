import axios from 'axios';

const api = axios.create({
    // baseURL: "http://localhost:8000"
    baseURL: "https://inksearchapi.duckdns.org"
});

export default api;
