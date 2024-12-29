<template>
  <div class="mon-compte-container">
    <div class="main-content">

      <div class="profile-card">

        <div class="left-side">
          <img src="https://i.pinimg.com/236x/14/6d/e1/146de169d3133554a6d907b837d31377.jpg" alt="Photo de profil"
            class="profile-image" />
        </div>

        <div class="right-side">
          <h2>{{ user.firstName.toUpperCase() }} {{ user.lastName.toLowerCase() }}</h2>

          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Nom :</label>
              <input type="text" id="firstName" v-model="user.firstName" placeholder="Modifier le nom" />
            </div>
            <div class="form-group">
              <label for="lastName">Prénom :</label>
              <input type="text" id="lastName" v-model="user.lastName" placeholder="Modifier le prénom" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email :</label>
              <input type="email" id="email" v-model="user.email" placeholder="Modifier l'email" />
            </div>
            <div class="form-group">
              <label for="phone">Téléphone :</label>
              <input type="tel" id="phone" v-model="user.phone" placeholder="Modifier le téléphone" />
            </div>
          </div>
          <button class="submit-btn" @click="submitForm">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const user = ref({
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  phone: "123-456-7890",
});

const submitForm = () => {
  alert("Les modifications ont été enregistrées !");
};
</script>

<style scoped>
.mon-compte-container {
  background-color: #e7dfd8;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar button {
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  color: #e7dfd8;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.navbar button:hover {
  color: #ffffff;
}

.navbar .center {
  margin-left: auto;
  margin-right: auto;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-top: 100px;
}

.profile-card {
  display: flex;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
  max-width: 800px;
  align-items: center;
}

.left-side {
  margin-right: 30px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #746657;
  object-fit: cover;
}

.right-side {
  flex: 1;
}

.right-side h2 {
  margin-bottom: 20px;
  color: #746657;
  font-size: 24px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-group input:focus {
  border-color: #746657;
  outline: none;
}

/* Bouton de validation */
.submit-btn {
  background-color: #746657;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #5b5248;
}
</style>
