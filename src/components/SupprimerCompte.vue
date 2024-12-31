<template>
  <div class="utilisateur-container">
    <PageHeader title="Supprimer l'utilisateur" />
    <form @submit.prevent="deleteUtilisateur">
      <h2>Choisissez un utilisateur à supprimer :</h2>
      <div class="form-group">
        <label for="utilisateurSelect">Sélectionner un utilisateur :</label>
        <select v-model="selectedUtilisateurId" id="utilisateurSelect">
          <option v-for="utilisateur in utilisateurs" :key="utilisateur.id" :value="utilisateur.id">
            {{ utilisateur.nom }} {{ utilisateur.prenom }}
          </option>
        </select>
      </div>
      <button type="button" @click="confirmDelete">Supprimer l'utilisateur</button>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PageHeader from "@/components/PageHeader.vue";

const utilisateurs = ref([]);
const selectedUtilisateurId = ref(null);
const successMessage = ref("");
const errorMessage = ref("");
const fetchUtilisateurs = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/utilisateurs');
    utilisateurs.value = response.data.member;
  } catch (error) {
    errorMessage.value = "Impossible de récupérer les utilisateurs.";
    successMessage.value = "";
  }
};

const confirmDelete = () => {
  const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
  if (isConfirmed && selectedUtilisateurId.value !== null) {
    deleteUtilisateur();
  }
};

const deleteUtilisateur = async () => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/utilisateurs/${selectedUtilisateurId.value}`);
    if (response.status === 200 || response.status === 202 || response.status === 204) {
      successMessage.value = "L'utilisateur a été supprimé avec succès.";
      errorMessage.value = "";
    } else {
      throw new Error("Erreur lors de la suppression de l'utilisateur.");
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message;
    successMessage.value = "";
  }
};

onMounted(() => {
  fetchUtilisateurs();
});
</script>
  
<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.utilisateur-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  background-color: #f0f0f0;
  padding: 20px;
}

form {
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}

.success-message {
  color: green;
  margin-top: 10px;
  font-weight: bold;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}
</style>
  