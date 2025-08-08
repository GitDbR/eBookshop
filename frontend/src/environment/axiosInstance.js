import axios from 'axios';
import { getToken } from '../utils/common';

const instance = axios.create({
    // baseURL: 'http://localhost:4000'
    baseURL: 'https://ebookshop-backend.onrender.com'
    
});

instance.interceptors.request.use((config) => {
    const token = getToken();
    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
})

export default instance;