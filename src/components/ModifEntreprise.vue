<template>
    <div class="entreprise-container">
      <PageHeader title="Modifier l'entreprise" />
  
      <!-- Liste déroulante pour sélectionner une entreprise -->
      <div class="form-group">
        <label for="entrepriseSelect">Sélectionner une entreprise :</label>
        <select id="entrepriseSelect" v-model="selectedEntrepriseId" @change="fetchEntreprise">
          <option value="">-- Choisir une entreprise --</option>
          <option v-for="entreprise in entreprises" :key="entreprise.id" :value="entreprise.id">
            {{ entreprise.nom }}
          </option>
        </select>
      </div>
  
      <!-- Formulaire de modification d'entreprise -->
      <form v-if="entreprise.nom" @submit.prevent="updateEntreprise">
        <h2>Modifier l'entreprise : {{ entreprise.nom }}</h2>
  
        <div class="form-group">
          <label for="entrepriseNom">Nom de l'entreprise :</label>
          <input type="text" id="entrepriseNom" v-model="entreprise.nom" required />
        </div>
  
        <div class="form-group">
          <label for="entrepriseAdresse">Adresse :</label>
          <input type="text" id="entrepriseAdresse" v-model="entreprise.adresse" required />
        </div>
  
        <div class="form-group">
          <label for="secteur">Secteur :</label>
          <input type="text" id="secteur" v-model="entreprise.secteur" required />
        </div>
  
        <div class="form-group">
          <label for="contact">Contact :</label>
          <input type="text" id="contact" v-model="entreprise.contact" required />
        </div>
  
        <div class="form-group">
          <label for="nbEmployes">Nombre d'employés :</label>
          <input type="number" id="nbEmployes" v-model="entreprise.nb_employe" required />
        </div>

        <button type="submit">Modifier l'entreprise</button>
      </form>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>


<script setup>
import { ref } from "vue";
import axios from "axios";
import PageHeader from "@/components/PageHeader.vue";

// Liste des entreprises (au départ vide, remplie après appel API)
const entreprises = ref([]);
const selectedEntrepriseId = ref(null);  
const entreprise = ref({
  nom: "",
  adresse: "",
  secteur: "",     
  contact: "",     
  nb_employe: 0,   
  id: null
});
const successMessage = ref("");
const errorMessage = ref("");

// Fonction pour récupérer la liste des entreprises depuis l'API
const fetchEntreprises = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/entreprises");
    entreprises.value = response.data.member;  // Remplir la liste avec les entreprises
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des entreprises.";
  }
};

// Fonction pour récupérer les détails d'une entreprise spécifique
const fetchEntreprise = async () => {
  if (selectedEntrepriseId.value) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/entreprises/${selectedEntrepriseId.value}`);
      entreprise.value = response.data;  // Remplir le formulaire avec les données de l'entreprise sélectionnée
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des données de l'entreprise.";
    }
  }
};

// Fonction pour modifier l'entreprise
const updateEntreprise = async () => {
  try {
    console.log("Données envoyées à l'API:", {
      nom: entreprise.value.nom,
      adresse: entreprise.value.adresse,
      secteur: entreprise.value.secteur,
      contact: entreprise.value.contact,
      nb_employe: entreprise.value.nb_employe,
    });

    const response = await axios.patch(
      `http://127.0.0.1:8000/api/entreprises/${entreprise.value.id}`,
      {
        nom: entreprise.value.nom,
        adresse: entreprise.value.adresse,
        secteur: entreprise.value.secteur,
        contact: entreprise.value.contact,
        nb_employe: entreprise.value.nb_employe,
      },
      {
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Entreprise mise à jour avec succès");
    } else {
      console.error("Erreur lors de la mise à jour de l'entreprise. Code:", response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'entreprise", error.response?.data || error.message);
  }
};




// Charger la liste des entreprises au démarrage
fetchEntreprises();
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
  