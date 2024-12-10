<template>
  <footer>
    <p>Sígueme en mis redes sociales:</p>
    <div class="social-media">
      <a
        href="https://github.com/lucasmr19"
        target="_blank"
        aria-label="GitHub"
      >
        <i class="fab fa-github"></i>
      </a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
    </div>
    <p>&copy; 2024 Lucas Miralles Ruiz - Todos los derechos reservados</p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");

footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  font-family: "Poppins", sans-serif; /* Aplicar fuente Poppins */
  position: relative; /* Posición relativa para asegurar el ancho completo */
  width: 273.6%; /* Asegura que el footer ocupe todo el ancho de la ventana */
  bottom: 0; /* Posicionar al final de la página */
  margin-left: -270px;
}

.social-media {
  margin: 10px 0;
}

.social-media a {
  color: white;
  margin: 0 10px;
  font-size: 50px;
}
</style>
