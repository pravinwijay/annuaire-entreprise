<template>
  <div class="mon-compte-container">
    <PageHeader title="Mon Compte" />

    <!-- Section Profil -->
    <div class="main-content">
      <div class="left-side">
        <img
          src="https://via.placeholder.com/150"
          alt="Photo de profil"
          class="profile-picture"
        />
      </div>
      <div class="right-side">
        <div class="user-info">
          <h2>{{ user.firstName }} {{ user.lastName }}</h2>
          <p>Email: {{ user.email }}</p>
        </div>
      </div>
    </div>

    <!-- Section Modifier les informations -->
    <div class="edit-section">
      <h2>Modifier mes informations</h2>
      <form @submit.prevent="updateUserInfo">
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            v-model="editableUser.firstName"
            placeholder="Modifier le prénom"
          />
        </div>

        <div class="form-group">
          <label for="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            v-model="editableUser.lastName"
            placeholder="Modifier le nom"
          />
        </div>

        <div class="form-group">
          <label for="email">Adresse Email</label>
          <input
            type="email"
            id="email"
            v-model="editableUser.email"
            placeholder="Modifier l'adresse e-mail"
          />
        </div>

        <div class="form-group">
          <label for="phone">Téléphone</label>
          <input
            type="tel"
            id="phone"
            v-model="editableUser.phone"
            placeholder="Modifier le téléphone"
          />
        </div>

        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { ref } from "vue";

// Données utilisateur fictives
const user = ref({
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@example.com",
  phone: "0123456789",
});

const editableUser = ref({ ...user.value });

// Fonction pour mettre à jour les informations utilisateur
const updateUserInfo = () => {
  user.value = { ...editableUser.value };
  alert("Informations mises à jour avec succès !");
};
</script>

<style scoped>
.mon-compte-container {
  padding: 20px;
  background-color: #e7dfd8;
}

.main-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.left-side {
  flex: 1;
}

.right-side {
  flex: 2;
  margin-left: 20px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info h2 {
  margin: 0;
  color: #746657;
}

.user-info p {
  color: #666;
}

.edit-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.edit-section h2 {
  margin-bottom: 15px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: bold;
}

button:hover {
  background-color: #358b5c;
}
</style>
