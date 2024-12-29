<template>
  <div class="entreprise-container">
    <!-- Navbar -->
    <div class="navbar">
      <button @click="goToRoute('/accueil')">ACCUEIL</button>
      <button class="center" @click="goToRoute('/mes-avis')">MES AVIS</button>
      <button @click="goToRoute('/mon-compte')">MON COMPTE</button>
    </div>

    <!-- Title -->
    <h1>Liste des Entreprises</h1>

    <!-- Table -->
    <table class="enterprise-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>
            Secteur
            <input
              type="text"
              v-model="sectorFilter"
              placeholder="Filtrer"
              class="filter-input"
            />
          </th>
          <th>Adresse</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(enterprise, index) in filteredEnterprises" :key="index">
          <td>{{ enterprise.nom }}</td>
          <td>{{ enterprise.secteur }}</td>
          <td>{{ enterprise.adresse }}</td>
          <td>
            <button @click="goToEntreprise(enterprise.nom)">Détails</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Messages -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Initialiser enterprises comme un tableau vide
const enterprises = ref([]); // Liste des entreprises récupérées depuis l'API
const sectorFilter = ref(""); // Filtre pour le secteur
const errorMessage = ref(""); // Message d'erreur

// Filtrer les entreprises en fonction du filtre
const filteredEnterprises = computed(() =>
  enterprises.value.filter((enterprise) =>
    enterprise.secteur.toLowerCase().includes(sectorFilter.value.toLowerCase())
  )
);

// Navigation
const router = useRouter();
const goToEntreprise = (enterpriseName) => {
  router.push(`/entreprise/${enterpriseName}`);
};

const goToRoute = (route) => {
  router.push(route);
};

// Récupérer les entreprises depuis l'API
const fetchEnterprises = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/entreprises");
    // Corriger l'accès aux données
    enterprises.value = response.data.member || []; // Utilisez le champ correct ici
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des entreprises.";
    enterprises.value = []; // Assurez-vous que enterprises reste un tableau même en cas d'erreur
  }
};

// Charger les données lors du montage du composant
onMounted(fetchEnterprises);
</script>



<style scoped>
/* Container styles */
.entreprise-container {
  background-color: #e7dfd8;
  text-align: center;
  padding-top: 100px; /* Pour éviter le chevauchement avec la navbar fixe */
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #746657;
  font-size: 1.5rem;
  position: fixed; /* Navbar fixe */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.navbar button {
  padding: 10px 20px;
  border: none;
  background-color: transparent; /* Retirer toute couleur de fond */
  color: #e7dfd8;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  outline: none; /* Supprime les styles de focus par défaut */
}

.navbar button:hover {
  color: #ffffff; /* Change uniquement la couleur du texte */
}

.navbar button:active,
.navbar button:focus {
  background-color: transparent; /* Retirer toute couleur de fond au clic ou focus */
  box-shadow: none; /* Supprime toute ombre */
}

/* Title */
h1 {
  color: #746657;
  margin: 40px 0;
}

/* Table Styles */
.enterprise-table {
  margin: 0 auto;
  width: 80%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* Coins arrondis */
  overflow: hidden; /* Empêche le débordement des coins arrondis */
}

.enterprise-table th,
.enterprise-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ccc;
}

.enterprise-table th {
  background-color: #746657;
  color: white;
}

.enterprise-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.enterprise-table tr:hover {
  background-color: #f1f1f1;
}

/* Filter input */
.filter-input {
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  max-width: 150px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Buttons inside the table */
button {
  background-color: #746657;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #746657;
}

/* Error Message */
.error-message {
  color: red;
  margin-top: 20px;
  font-weight: bold;
}
</style>
