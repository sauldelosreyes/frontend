<template>
  <section id="sobre-mí" class="sobre-mí contenido-seccion">
    <h1>Sobre Mí</h1>
    <p>
      <span class="gradient-text">Científico e Ingeniero de Datos</span>
      <img
        src="@/assets/spain.png"
        alt="Bandera de España"
        class="small-flag"
      />
      apasionado por el análisis de datos y la inteligencia artificial. Con
      experiencia en la optimización de algoritmos y machine learning, me dedico
      a transformar datos en soluciones innovadoras.
    </p>
  </section>
</template>

<script>
export default {
  name: "AboutMe",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");

.sobre-mí {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 35px;
  border-radius: 10px;
  width: 168%; /* Ocupará más del 100% del contenedor padre */
  max-width: 1800px;
  margin-left: 75px; /* Añade margen izquierdo para moverlo a la derecha */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
}

#sobre-mí h1 {
  font-size: 2.5rem;
  font-weight: 600; /* Negrita para el título */
  color: #333;
  margin-bottom: 5px; /* Ajustado para mejorar el espacio entre el título y el párrafo */
  text-align: left;
  width: 100%;
}

.sobre-mí p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.5;
  text-align: left;
  max-width: 100%; /* Ajustado para que el texto ocupe todo el ancho disponible */
  margin: 20px 0;
}

.gradient-text {
  background: linear-gradient(90deg, #6a11cb, #23e6ed, #d51fb3);
  background-size: 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradient-animation 8s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.small-flag {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  vertical-align: middle;
}
</style>
