import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const loginAPI = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    const {
      token,
      email: userEmail,
      role,
      name,
      id_empresa,
      id,
    } = response.data;

    // Guardar token en localStorage
    localStorage.setItem("token", token);

    return {
      success: true,
      user: {
        id,
        name,
        email: userEmail,
        role,
        id_empresa,
      },
      token,
    };
  } catch (error) {
    console.error("Error completo:", error.response); // Para debuggear

    if (error.response) {
      const status = error.response.status;
      // CAMBIO AQUÍ: Primero intentar obtener 'message', luego 'error'
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Error en el servidor";

      if (status === 401) {
        return {
          success: false,
          message: message, // Ahora capturará "El correo no existe en la base de datos"
        };
      } else if (status === 404) {
        return {
          success: false,
          message: message,
        };
      } else if (status === 400) {
        return {
          success: false,
          message: message,
        };
      } else {
        return {
          success: false,
          message: message,
        };
      }
    } else if (error.request) {
      return {
        success: false,
        message: "No se pudo conectar con el servidor",
      };
    } else {
      return {
        success: false,
        message: "Error al realizar la petición",
      };
    }
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logoutAPI = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("permissions-storage");
};

export default axiosInstance;
