<template>
    <div class="login-container">
      <div class="login-form">
        <h2>Iniciar Sesión</h2>
        <input v-model="username" placeholder="Usuario" class="input-field" />
        <input v-model="password" type="password" placeholder="Contraseña" class="input-field" />
        <button @click="login" class="login-button">Iniciar Sesión</button>
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div> <!-- Mensaje de éxito -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null,
        successMessage: null, // Nueva propiedad para el mensaje de éxito
      };
    },
    methods: {
      async login() {
        this.error = null; // Reinicia el error
        this.successMessage = null; // Reinicia el mensaje de éxito
        try {
          const response = await axios.post('/login', {
            username: this.username,
            password: this.password,
          });
          // Almacena el token en localStorage
          localStorage.setItem('token', response.data.token);
          this.successMessage = '¡Inicio de sesión exitoso!'; // Establece el mensaje de éxito
        } catch (error) {
          // Manejo de errores
          if (error.response) {
            this.error = error.response.data.error || 'Error de autenticación';
          } else if (error.request) {
            this.error = 'No se recibió respuesta del servidor';
          } else {
            this.error = 'Error al realizar la solicitud: ' + error.message;
          }
          console.error('Error en el inicio de sesión:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    margin-left: 185px;
    width: 100%; /* Ancho total */
    margin-top: 100px; /* Ajusta el espacio superior */
    margin-bottom: -80px;
  }
  
  .login-form {
    display: flex; /* Utiliza flexbox para centrar elementos */
    flex-direction: column; /* Coloca elementos en columna */
    justify-content: center; /* Centra verticalmente */
    align-items: center; /* Centra horizontalmente */
    background-color: white; /* Fondo blanco para el formulario */
    padding: 35px; /* Espaciado interno */
    border-radius: 10px; /* Bordes redondeados */
    max-width: 800px; /* Establece un ancho máximo para el formulario */
    width: 200%; /* Ancho completo */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para el formulario */
    font-family: "Poppins", sans-serif; /* Fuente */
  }
  
  h2 {
    text-align: center; /* Centra el título */
    font-weight: bold; /* Aplica negrita al título */
  }
  
  .input-field {
    width: 100%; /* Ancho completo */
    padding: 10px; /* Espaciado interno */
    margin: 10px 0; /* Espaciado entre campos */
    border: 1px solid #ccc; /* Borde */
    border-radius: 4px; /* Bordes redondeados */
  }
  
  .login-button {
    width: 100%; /* Que ocupe el ancho completo */
    padding: 10px; /* Espaciado interno */
    background-color: #7615de; /* Color de fondo */
    color: white; /* Color del texto */
    border: none; /* Sin borde */
    border-radius: 4px; /* Bordes redondeados */
    cursor: pointer; /* Cambia el cursor al pasar por encima */
  }
  
  .login-button:hover {
    background-color: #6a14c2; /* Color de fondo al pasar el ratón */
  }
  
  .error-message {
    color: red; /* Color para el mensaje de error */
    text-align: center; /* Centra el mensaje de error */
    margin-top: 10px; /* Espacio arriba del mensaje */
  }
  
  .success-message {
    color: green; /* Color para el mensaje de éxito */
    text-align: center; /* Centra el mensaje de éxito */
    margin-top: 10px; /* Espacio arriba del mensaje */
  }
  </style>
  