<template>
  <div>
    <Header />
    <Login @login="handleLogin" /> <!-- Componente de Login aquí -->
    <main>
      <AboutMe />
      <div class="projects-container">
        <Projects @delete-project="deleteProject" />
      </div>
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AboutMe from "./components/AboutMe.vue";
import Projects from "./components/Projects.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";
import Login from "./components/Login.vue"; // Corrección en la importación
import axios from './axios';
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  components: {
    Header,
    Login, // Asegúrate de que Login esté correctamente importado
    AboutMe,
    Projects,
    Contact,
    Footer,
  },
  data() {
    return {
      projects: [],
      loading: true,
      error: null,
    };
  },
  async mounted() {
    await this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      this.loading = true;
      try {
        const response = await axios.get('/projects');
        this.projects = response.data;
      } catch (error) {
        this.error = error.response ? error.response.data.error : 'Error al obtener los proyectos.';
        console.error('Error al obtener los proyectos:', error);
      } finally {
        this.loading = false;
      }
    },
    async deleteProject(id) {
      try {
        await axios.delete(`/projects/${id}`);
        this.projects = this.projects.filter(project => project.id !== id);
      } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
      }
    },
    handleLogin(credentials) {
      // Implementar lógica para manejar el inicio de sesión y almacenar el token
      // Almacenar el token en localStorage
      localStorage.setItem('token', 'your_token_here'); // Reemplaza con el token real que recibas del backend
    },
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

main {
  padding-top: 80px;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: #efe8d1;
  color: #333;
}

section {
  padding: 40px;
  margin: 30px auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out;
  max-width: 800px;
  width: 90%;
}

section:hover {
  transform: translateY(-5px);
}

.projects-container {
  margin: 20px 0;
}
</style>
