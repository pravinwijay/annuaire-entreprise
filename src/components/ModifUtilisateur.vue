<template>
    <div class="utilisateur-container">
      <PageHeader title="Modifier l'utilisateur" />
  
      <!-- Liste déroulante pour sélectionner un utilisateur -->
      <div class="form-group">
        <label for="utilisateurSelect">Sélectionner un utilisateur :</label>
        <select id="utilisateurSelect" v-model="selectedUtilisateurId" @change="fetchUtilisateur">
          <option value="">-- Choisir un utilisateur --</option>
          <option v-for="utilisateur in utilisateurs" :key="utilisateur.id" :value="utilisateur.id">
            {{ utilisateur.nom }} {{ utilisateur.prenom }}
          </option>
        </select>
      </div>
  
      <!-- Formulaire de modification d'utilisateur -->
      <form v-if="utilisateur.nom" @submit.prevent="updateUtilisateur">
       
  
        <div class="form-group">
          <label for="utilisateurNom">Nom :</label>
          <input type="text" id="utilisateurNom" v-model="utilisateur.nom" required />
        </div>
  
        <div class="form-group">
          <label for="utilisateurPrenom">Prénom :</label>
          <input type="text" id="utilisateurPrenom" v-model="utilisateur.prenom" required />
        </div>
  
        <div class="form-group">
          <label for="utilisateurEmail">Email :</label>
          <input type="email" id="utilisateurEmail" v-model="utilisateur.email" required />
        </div>
  
        <div class="form-group">
          <label for="utilisateurTelephone">Téléphone :</label>
          <input type="tel" id="utilisateurTelephone" v-model="utilisateur.telephone" required />
        </div>
  
        <button type="submit">Modifier l'utilisateur</button>
      </form>
  
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  import PageHeader from "@/components/PageHeader.vue";
  
  // Liste des utilisateurs (au départ vide, remplie après appel API)
  const utilisateurs = ref([]);
  const selectedUtilisateurId = ref(null); 
  const utilisateur = ref({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    id: null,
  });
  const successMessage = ref("");
  const errorMessage = ref("");
  
  // Fonction pour récupérer la liste des utilisateurs depuis l'API
  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/utilisateurs");
      utilisateurs.value = response.data.member; 
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des utilisateurs.";
    }
  };
  
  // Fonction pour récupérer les détails d'un utilisateur spécifique
  const fetchUtilisateur = async () => {
    if (selectedUtilisateurId.value) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/utilisateurs/${selectedUtilisateurId.value}`);
        utilisateur.value = response.data;  
      } catch (error) {
        errorMessage.value = "Erreur lors du chargement des données de l'utilisateur.";
      }
    }
  };
  
  // Fonction pour modifier l'utilisateur
  const updateUtilisateur = async () => {
    try {
      console.log("Données envoyées à l'API:", {
        nom: utilisateur.value.nom,
        prenom: utilisateur.value.prenom,
        email: utilisateur.value.email,
        telephone: utilisateur.value.telephone,
      });
  
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/utilisateurs/${utilisateur.value.id}`,
        {
          nom: utilisateur.value.nom,
          prenom: utilisateur.value.prenom,
          email: utilisateur.value.email,
          telephone: utilisateur.value.telephone,
        },
        {
          headers: {
            "Content-Type": "application/merge-patch+json",  
          },
        }
      );
  
      if (response.status === 200) {
        successMessage.value = "Utilisateur mis à jour avec succès";
        errorMessage.value = "";  // Réinitialiser le message d'erreur
      } else {
        errorMessage.value = `Erreur lors de la mise à jour de l'utilisateur. Code: ${response.status}`;
        successMessage.value = "";  // Réinitialiser le message de succès
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error.response?.data || error.message);
      errorMessage.value = "Une erreur est survenue lors de la mise à jour de l'utilisateur.";
      successMessage.value = "";  // Réinitialiser le message de succès
    }
  };
  
  // Charger la liste des utilisateurs au démarrage
  fetchUtilisateurs();
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
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
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
  