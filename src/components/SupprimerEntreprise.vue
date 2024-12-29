<template>
    <div class="entreprise-container">
      <PageHeader title="Supprimer l'entreprise" />
  
      <!-- Liste déroulante pour sélectionner une entreprise -->
      <form @submit.prevent="deleteEntreprise">
        <h2>Choisissez une entreprise à supprimer :</h2>
  
        <!-- Liste déroulante -->
        <div class="form-group">
          <label for="entrepriseSelect">Sélectionner une entreprise :</label>
          <select v-model="selectedEntrepriseId" id="entrepriseSelect">
            <option v-for="entreprise in entreprises" :key="entreprise.id" :value="entreprise.id">
              {{ entreprise.nom }}
            </option>
          </select>
        </div>
  
        <!-- Bouton pour soumettre la demande de suppression -->
        <button type="button" @click="confirmDelete">Supprimer l'entreprise</button>
      </form>
  
      <!-- Message de succès -->
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <!-- Message d'erreur -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PageHeader from "@/components/PageHeader.vue"; // Composant PageHeader

// Liste des entreprises et l'entreprise sélectionnée
const entreprises = ref([]);
const selectedEntrepriseId = ref(null); // ID de l'entreprise sélectionnée

// Message de succès et d'erreur
const successMessage = ref("");
const errorMessage = ref("");

// Récupérer la liste des entreprises depuis l'API
const fetchEntreprises = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/entreprises');
    // Extraire le tableau des entreprises depuis la propriété 'member'
    entreprises.value = response.data.member; // Ici, nous accédons à 'member' pour récupérer le tableau des entreprises
  } catch (error) {
    errorMessage.value = "Impossible de récupérer les entreprises.";
    successMessage.value = "";
  }
};

// Fonction pour confirmer la suppression
const confirmDelete = () => {
  const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?");
  if (isConfirmed && selectedEntrepriseId.value !== null) {
    deleteEntreprise();
  }
};

// Fonction pour supprimer l'entreprise
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

// Charger la liste des entreprises lors du montage du composant
onMounted(() => {
  fetchEntreprises();
});
</script>

  
  
  <style scoped>
  /* Style global pour le body */
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
  