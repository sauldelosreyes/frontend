<template>
  <div class="project">
    <h3>{{ title }}</h3>
    <img :src="image" alt="Project Image" class="project-image" />
    <p>{{ description }}</p>
    <button @click="openUrl(url)">Ver código en GitHub</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    image: String,
    description: String,
    url: String,
  },
  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.project-image {
  max-width: 90%;
  height: auto;
  margin: 20px auto 50px auto;
  display: block;
  border-radius: 10px; /* Solo la imagen tendrá bordes redondeados */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil solo en la imagen */
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

button {
  padding: 8px 16px;
  background-color: #7615de;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #23e6ed;
}
</style>
