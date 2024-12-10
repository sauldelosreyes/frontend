<template>
  <section class="contact-section contenido-seccion">
    <h1 class="contact-title">Contáctame</h1>
    <div class="contact-container">
      <div class="contact-form">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="form.nombre" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="mensaje">Mensaje:</label>
            <textarea id="mensaje" v-model="form.mensaje" required></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div class="contact-info">
        <img src="@/assets/ubicacion.png" alt="Ubicación" class="map-image" />
        <div class="info">
          <ul>
            <li>
              <i class="fa-solid fa-location-dot"></i> Madrid 28049, Escuela Politécnica Superior UAM
            </li>
            <li>
              <i class="fa-solid fa-phone"></i> Teléfono: +34 6*** ***
            </li>
            <li>
              <i class="fa-solid fa-envelope"></i> Email: tu_nombre@example.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nombre: "",
        email: "",
        mensaje: "",
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Formulario enviado", this.form);
      alert("Mensaje enviado con éxito!");
    },
  },
};
</script>

<style scoped>
.contact-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 35px;
  border-radius: 10px;
  width: 168%;
  max-width: 1800px;
  margin-left: 75px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.contact-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.contact-form {
  flex: 1;
  margin-right: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input, textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  background-color: #f9f9f9;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #7615de;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #6a14c2;
}

.contact-info {
  flex: 1;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.map-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 15px;
}

.info ul {
  list-style-type: none;
  padding: 0;
}

.info li {
  margin-bottom: 10px;
  font-size: 1rem;
}

.info i {
  margin-right: 5px;
}
</style>
