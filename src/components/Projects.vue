<template>
  <section class="projects-section contenido-seccion">
    <h1 class="projects-title">Mis Proyectos</h1>

    <!-- Menú de Proyectos -->
    <div v-if="isAuthenticated">
      <button @click="showAddProjectForm = true">Añadir Proyecto</button>
      <h2>Lista de Proyectos</h2>
    </div>

    <!-- Formulario de Añadir Proyecto -->
    <div v-if="showAddProjectForm" class="project-form">
      <h2>Añadir Proyecto</h2>
      <input v-model="newProject.nombre" placeholder="Nombre del Proyecto" />
      <textarea v-model="newProject.descripcion" placeholder="Descripción"></textarea>
      <input v-model="newProject.enlace" placeholder="Enlace" />
      <label class="image-upload-label">Suba una imagen (.jpg/.png)</label>
      <input type="file" @change="handleImageUpload" />
      <button @click="handleAddProject">Añadir Proyecto</button>
      <div v-if="error" class="error-message">{{ error }}</div>
      <button @click="resetForm">Cancelar</button>
    </div>

    <!-- Formulario de Editar Proyecto -->
    <div v-if="editingProject" class="project-form editing">
      <h2>Editar Proyecto</h2>
      <input v-model="newProject.nombre" placeholder="Nombre del Proyecto" />
      <textarea v-model="newProject.descripcion" placeholder="Descripción"></textarea>
      <input v-model="newProject.enlace" placeholder="Enlace" />
      <label class="image-upload-label">Suba una imagen (.jpg/.png)</label>
      <input type="file" @change="handleImageUpload" />
      <button @click="handleEditProject">Actualizar Proyecto</button>
      <div v-if="error" class="error-message">{{ error }}</div>
      <button @click="resetForm">Cancelar</button>
    </div>

    <div v-if="loading">Cargando proyectos...</div>
    <div v-if="error">{{ error }}</div>
    <div v-for="project in projects" :key="project.id" class="project-item">
      <h3>{{ project.nombre }}</h3>
      <img v-if="project.imagen" :src="`https://backend-r7cy.onrender.com/uploads/${project.imagen}`" alt="Imagen del proyecto" class="project-image" />
      <p>{{ project.descripcion }}</p>
      <div v-if="project.enlace">
        <strong>Enlace:</strong> <a :href="project.enlace" target="_blank">{{ project.enlace }}</a>
      </div>
      <button v-if="isAuthenticated" @click="editProject(project)">Editar Proyecto</button>
      <button v-if="isAuthenticated" @click="deleteProject(project.id)" style="margin-left: 8px;">Eliminar Proyecto</button>
    </div> <!-- Cerrando div de project-item -->
  </section>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      projects: [],
      newProject: {
        nombre: '',
        descripcion: '',
        enlace: '',
        imagen: null,
      },
      loading: true,
      error: null,
      editingProject: null, // Cambiado a null por defecto
      showAddProjectForm: false, // Estado para mostrar el formulario de añadir
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token'); // Verifica si hay un token
    },
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
    async handleAddProject() {
      try {
        const formData = new FormData();
        formData.append('nombre', this.newProject.nombre);
        formData.append('descripcion', this.newProject.descripcion);
        formData.append('enlace', this.newProject.enlace);
        if (this.newProject.imagen) {
          formData.append('imagen', this.newProject.imagen);
        }
        const response = await axios.post('/projects', formData);
        this.projects.push(response.data);
        this.resetForm();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.error = 'Necesitas estar autenticado para añadir proyectos.'; // Mensaje específico para autenticación
        } else {
          this.error = error.response ? error.response.data.error : 'Error al añadir el proyecto.';
        }
        console.error('Error al añadir el proyecto:', error);
      }
    },
    handleImageUpload(event) {
      this.newProject.imagen = event.target.files[0];
    },
    async deleteProject(id) {
      try {
        await axios.delete(`/projects/${id}`);
        this.projects = this.projects.filter(project => project.id !== id);
      } catch (error) {
        this.error = error.response ? error.response.data.error : 'Error al eliminar el proyecto.';
        console.error('Error al eliminar el proyecto:', error);
      }
    },
    editProject(project) {
      this.editingProject = project; // Guardamos el proyecto completo
      this.newProject = { ...project }; // Cargar los datos del proyecto en el formulario
    },
    async handleEditProject() {
      this.error = null; // Limpiar el mensaje de error
      try {
        const formData = new FormData();
        formData.append('nombre', this.newProject.nombre);
        formData.append('descripcion', this.newProject.descripcion);
        formData.append('enlace', this.newProject.enlace);
        if (this.newProject.imagen) {
          formData.append('imagen', this.newProject.imagen);
        }
        const response = await axios.put(`/projects/${this.editingProject.id}`, formData); // Actualiza el proyecto
        this.projects = this.projects.map(project =>
          project.id === this.editingProject.id ? response.data : project // Actualizar el proyecto con la respuesta
        );
        this.resetForm(); // Resetea los campos del formulario y cierra la sección de edición
      } catch (error) {
        this.error = error.response ? error.response.data.error : 'Error al actualizar el proyecto.';
        console.error('Error al actualizar el proyecto:', error);
      }
    },
    resetForm() {
      this.newProject = {
        nombre: '',
        descripcion: '',
        enlace: '',
        imagen: null,
      };
      this.editingProject = null; // Resetea el estado de edición
      this.showAddProjectForm = false; // Resetea la visualización del formulario de añadir
    },
  },
};
</script>


<style scoped>
.projects-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white; /* Fondo blanco para la sección */
  padding: 35px;
  border-radius: 10px;
  width: 168%; /* Ocupará más del 100% del contenedor padre */
  max-width: 1800px; /* Ancho máximo para la sección */
  margin-left: 75px; /* Añade margen izquierdo para moverlo a la derecha */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif; /* Fuente */
}

.projects {
  padding: 20px; /* Espaciado interno */
}

.projects-title {
  font-size: 2.5rem; /* Tamaño del título */
  font-weight: 600; /* Negrita para el título */
  margin-bottom: 15px; /* Espacio entre el título y el contenido */
}

.project-form {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9; /* Fondo más suave para el formulario */
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.project-form.editing {
  background-color: #e0f7fa; /* Cambia el color de fondo al editar */
}

h2 {
  margin-bottom: 10px; /* Espacio entre el subtítulo y su contenido */
}

input, textarea {
  width: calc(100% - 20px); /* Ajusta el ancho para incluir padding */
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif; /* Asegura que las cajas tengan la misma fuente */
  background-color: #f9f9f9; /* Fondo suave para las cajas */
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /* Sombra suave para las cajas */
}

.image-upload-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 5px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Color de fondo del botón */
  color: white; /* Color del texto del botón */
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3; /* Color de fondo al pasar el ratón */
}

.project-item {
  padding: 15px;
  margin: 10px 0;
  background-color: #ffffff; /* Fondo blanco para los proyectos */
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%; /* Ocupará el ancho completo */
}

.project-image {
  max-width: 100%; /* Imagen responsiva */
  height: auto; /* Mantener la proporción */
}

.project-actions {
  display: flex;
  justify-content: space-between; /* Separar los botones de editar y eliminar */
  margin-top: 10px;
}

.error-message {
  color: red; /* Color de texto para mensajes de error */
  font-size: 0.9rem; /* Tamaño de texto para mensajes de error */
}
</style>
