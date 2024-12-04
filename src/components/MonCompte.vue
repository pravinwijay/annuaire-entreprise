<template>
  <div class="mon-compte-container">
    <div class="navbar">
      <button @click="goToRoute('/accueil')">ACCUEIL</button>
      <button class="center" @click="goToRoute('/mes-avis')">MES AVIS</button>
      <button @click="goToRoute('/liste-entreprises')">ENTREPRISE</button>
    </div>
    <div class="main-content">
      <!-- Contenu dans un grand carré -->
      <div class="profile-card">
        <!-- Photo de profil dans un rond -->
        <div class="left-side">
          <img src="https://via.placeholder.com/150" alt="Photo de profil" class="profile-image" />
        </div>
        <div class="right-side">
          <!-- Affichage du nom et prénom -->
          <h2>{{ user.firstName.toUpperCase() }} {{ user.lastName.toLowerCase() }}</h2>
          
          <!-- Formulaire pour modifier les informations -->
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
          
          <!-- Bouton valider -->
          <button class="submit-btn" @click="submitForm">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Données fictives de l'utilisateur
const user = ref({
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  phone: "123-456-7890",
});

const router = useRouter();

const goToRoute = (route) => {
  router.push(route);
};

// Fonction de validation du formulaire
const submitForm = () => {
  alert("Les modifications ont été enregistrées !");
};
</script>

<style scoped>
.mon-compte-container {
  background-color: #e7dfd8;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #746657;
}

.main-content {
  display: flex;
  justify-content: center;
  padding: 50px;
}

/* Profil dans un grand carré avec fond #e7dfd8 */
.profile-card {
  display: flex;
  background-color: #e7dfd8; /* Couleur de fond demandée */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  max-width: 1000px;
}

.left-side {
  margin-right: 30px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Photo de profil dans un rond */
}

.right-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-side h2 {
  margin: 0 0 20px 0;
  color: #746657;
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
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-group input:focus {
  border-color: #42b983;
  outline: none;
}

/* Bouton valider */
.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #358b5c;
}

/* Navbar button styles */
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
</style>
