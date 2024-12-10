<template>
    <div>
      <h1>Mis Proyectos</h1>
      <ProjectForm @project-added="fetchProjects" />
      <div v-if="editingProject">
        <EditProject :project="editingProject" @project-updated="fetchProjects" @close="editingProject = null" />
      </div>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <h3>{{ project.nombre }}</h3>
          <button @click="openEditProject(project)">Editar</button>
          <button @click="deleteProject(project.id)">Eliminar</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import ProjectForm from './ProjectForm.vue';
  import EditProject from './EditProject.vue';
  import axios from '../axios';
  
  export default {
    components: {
      ProjectForm,
      EditProject,
    },
    data() {
      return {
        projects: [],
        editingProject: null,
      };
    },
    methods: {
      async fetchProjects() {
        try {
          const response = await axios.get('/projects');
          this.projects = response.data;
        } catch (error) {
          console.error('Error al obtener proyectos:', error);
        }
      },
      openEditProject(project) {
        this.editingProject = project; // Establece el proyecto que se va a editar
      },
      async deleteProject(id) {
        try {
          await axios.delete(`/projects/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          this.fetchProjects(); // Refresca la lista de proyectos
        } catch (error) {
          console.error('Error al eliminar el proyecto:', error);
        }
      },
    },
    created() {
      this.fetchProjects();
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el componente Projects */
  </style>
  