import axios from 'axios';

// Configuración de la instancia de Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de peticiones - AGREGAR TOKEN AUTOMÁTICAMENTE
api.interceptors.request.use(
    (config) => {
        // Obtener token del localStorage
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('No hay token en localStorage');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuestas
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejar errores de autenticación
        if (error.response?.status === 401) {
            // Limpiar localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Solo redirigir si NO estás en login
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default api;