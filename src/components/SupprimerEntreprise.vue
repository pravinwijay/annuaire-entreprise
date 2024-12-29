<template>
    <div class="entreprise-container">
      <PageHeader title="Supprimer l'entreprise" />
  
      <!-- Formulaire de suppression d'entreprise -->
      <form @submit.prevent="deleteEntreprise">
        <h2>Êtes-vous sûr de vouloir supprimer cette entreprise ?</h2>
  
        <!-- Liste déroulante pour choisir une entreprise -->
        <div class="form-group">
          <label for="entrepriseSelect">Choisissez une entreprise :</label>
          <select id="entrepriseSelect" v-model="selectedEntrepriseId" @change="getEntrepriseDetails">
            <option value="" disabled selected>-- Sélectionnez une entreprise --</option>
            <option v-for="entreprise in entreprises" :key="entreprise.id" :value="entreprise.id">
              {{ entreprise.nom }}
            </option>
          </select>
        </div>
  
        <!-- Affichage des détails de l'entreprise sélectionnée -->
        <div v-if="entreprise.nom" class="form-group">
          <label for="entrepriseNom">Nom de l'entreprise :</label>
          <input
            type="text"
            id="entrepriseNom"
            v-model="entreprise.nom"
            disabled
          />
        </div>
  
        <!-- Bouton pour soumettre la demande de suppression -->
        <button type="button" @click="confirmDelete" :disabled="!entreprise.id">Supprimer l'entreprise</button>
      </form>
  
      <!-- Message de succès -->
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <!-- Message d'erreur -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "@/components/PageHeader.vue";
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  // Liste des entreprises récupérée depuis l'API
  const entreprises = ref([]);
  const entreprise = ref({
    nom: "",
    id: null,
  });
  const selectedEntrepriseId = ref(null);
  const successMessage = ref("");
  const errorMessage = ref("");
  
  // Fonction pour récupérer la liste des entreprises
  const fetchEntreprises = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/entreprises");
      entreprises.value = response.data; // Mettre à jour la liste des entreprises
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
      errorMessage.value = "Impossible de récupérer la liste des entreprises.";
    }
  };
  
  // Fonction pour récupérer les détails de l'entreprise sélectionnée
  const getEntrepriseDetails = async () => {
    if (selectedEntrepriseId.value) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/entreprises/${selectedEntrepriseId.value}`);
        entreprise.value = response.data; // Mettre à jour les détails de l'entreprise
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'entreprise :", error);
        errorMessage.value = "Impossible de récupérer les informations de l'entreprise.";
      }
    }
  };
  
  // Fonction pour confirmer la suppression de l'entreprise
  const confirmDelete = () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette entreprise ?");
    if (isConfirmed) {
      deleteEntreprise(); // Appeler la fonction de suppression si confirmé
    }
  };
  
  // Fonction pour supprimer l'entreprise
  const deleteEntreprise = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/entreprises/${entreprise.value.id}`);
      if (response.status === 200) {
        successMessage.value = "L'entreprise a été supprimée avec succès.";
        errorMessage.value = "";
        // Réinitialiser les données après la suppression
        entreprise.value = { nom: "", id: null };
        selectedEntrepriseId.value = null;
        fetchEntreprises(); // Récupérer à nouveau la liste des entreprises
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
  