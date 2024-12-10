<template>
  <header>
    <div class="header-left">
      <img src="@/assets/saul.png" alt="Logo del sitio" class="logo" />
    </div>
    <nav class="header-right">
      <button @click="scrollToSection('sobre-mí')">Sobre Mí</button>
      <button @click="scrollToSection('proyectos')">Proyectos</button>
      <button class="contact-button" @click="scrollToSection('Contáctame')">
        Contáctame
      </button>

      <!-- Icono de lupa y campo de búsqueda -->
      <div class="search-container">
        <img
          src="@/assets/lupa.png"
          alt="Buscar"
          class="search-icon"
          @click="toggleSearch"
        />
        <input
          v-if="showSearch"
          type="text"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          placeholder="Buscar..."
          class="search-input"
          ref="searchInput"
        />
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // Para almacenar la consulta de búsqueda
      showSearch: false, // Controla cuándo mostrar el input de búsqueda
    };
  },
  methods: {
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    },
    handleSearch() {
      const query = this.searchQuery.trim().toLowerCase();

      // Buscar dentro de las secciones
      const sections = document.querySelectorAll(".contenido-seccion");
      sections.forEach((section) => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query)) {
          section.style.display = "block"; // Muestra la sección si coincide
          section.style.backgroundColor = "#ffff99"; // Resalta las coincidencias
        } else {
          section.style.display = "none"; // Oculta la sección si no coincide
        }
      });

      // Buscar dentro de los elementos individuales de "Proyectos"
      const projectItems = document.querySelectorAll(".proyecto-item");
      projectItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "block"; // Muestra los proyectos que coincidan
          item.style.backgroundColor = "#ffff99"; // Resalta las coincidencias
        } else {
          item.style.display = "none"; // Oculta los que no coincidan
        }
      });

      // Si la consulta de búsqueda está vacía, muestra todo de nuevo
      if (!query) {
        sections.forEach((section) => {
          section.style.display = "block";
          section.style.backgroundColor = "";
        });
        projectItems.forEach((item) => {
          item.style.display = "block";
          item.style.backgroundColor = "";
        });
      }
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus(); // Focaliza el input al hacer clic en la lupa
        });
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: #000000;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 30px 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: background-color 0.3s ease-in-out;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 120px;
  height: auto;
  margin-right: 20px;
}

.header-right {
  display: flex;
  gap: 20px;
  margin-right: 50px;
}

.header-right button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
}

.header-right button:hover {
  background-color: white;
  color: #1b0860;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.contact-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #7615de, #23e6ed);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.contact-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.contact-button:active {
  transform: scale(1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Contenedor del buscador */
.search-container {
  display: flex;
  align-items: center;
  position: relative;
}

.search-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 30px;
}

.search-input {
  margin-left: 10px; /* Ajusta según sea necesario */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 200px; /* Aumenta el ancho si es necesario */
  display: block; /* Asegúrate de que esté visible */
}

.search-input[v-show="true"] {
  display: block;
  opacity: 1;
}

.contenido-item {
  transition: background-color 0.3s ease;
}
</style>
