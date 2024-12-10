import axios from 'axios';

// Crear una instancia de Axios
const instance = axios.create({
  baseURL: 'https://backend-r7cy.onrender.com', // Cambia esto a la URL de tu backend
  timeout: 1000, // Tiempo de espera para las solicitudes en milisegundos
});

// Interceptor para incluir el token en las cabeceras
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtiene el token del localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Agrega el token a las cabeceras
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Exportar la instancia para usarla en otros componentes
export default instance;
