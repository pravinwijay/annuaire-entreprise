<template>
  <div class="entreprise-container">
    <PageHeader title="Supprimer l'entreprise" />
    <form @submit.prevent="deleteEntreprise">
      <h2>Choisissez une entreprise à supprimer :</h2>
      <div class="form-group">
        <label for="entrepriseSelect">Sélectionner une entreprise :</label>
        <select v-model="selectedEntrepriseId" id="entrepriseSelect">
          <option v-for="entreprise in entreprises" :key="entreprise.id" :value="entreprise.id">
            {{ entreprise.nom }}
          </option>
        </select>
      </div>

      <button type="button" @click="confirmDelete">Supprimer l'entreprise</button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
  
  
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PageHeader from "@/components/PageHeader.vue";

const entreprises = ref([]);
const selectedEntrepriseId = ref(null);
const successMessage = ref("");
const errorMessage = ref("");


const fetchEntreprises = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/entreprises');
    entreprises.value = response.data.member;
  } catch (error) {
    errorMessage.value = "Impossible de récupérer les entreprises.";
    successMessage.value = "";
  }
};

const confirmDelete = () => {
  const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?");
  if (isConfirmed && selectedEntrepriseId.value !== null) {
    deleteEntreprise();
  }
};

const deleteEntreprise = async () => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/entreprises/${selectedEntrepriseId.value}`);
    if (response.status === 200 || response.status === 202 || response.status === 204) {
      successMessage.value = "L'entreprise a été supprimée avec succès.";
      errorMessage.value = "";
    } else {
      throw new Error("Erreur lors de la suppression de l'entreprise.");
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message;
    successMessage.value = "";
  }
};

onMounted(() => {
  fetchEntreprises();
});
</script>

  
  
<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.entreprise-container {
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
  