<template>
  <div class="entreprise-container">
    <h1>Liste des Entreprises</h1>
    <table class="enterprise-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>
            Secteur
            <input type="text" v-model="sectorFilter" placeholder="Filtrer" class="filter-input" />
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
            <button @click="goToEntreprise(enterprise.id)">Détails</button>

          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const enterprises = ref([]);
const sectorFilter = ref("");
const errorMessage = ref("");

const filteredEnterprises = computed(() =>
  enterprises.value.filter((enterprise) =>
    enterprise.secteur.toLowerCase().includes(sectorFilter.value.toLowerCase())
  )
);

const router = useRouter();
const goToEntreprise = (enterpriseId) => {
  router.push(`/entreprise/${enterpriseId}`);
};




const fetchEnterprises = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/entreprises");
    enterprises.value = response.data.member || [];
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des entreprises.";
    enterprises.value = [];
  }
};
onMounted(fetchEnterprises);
</script>

<style scoped>
.entreprise-container {
  background-color: #e7dfd8;
  text-align: center;
  padding-top: 100px;
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
  outline: none;
}

.navbar button:hover {
  color: #ffffff;
}

.navbar button:active,
.navbar button:focus {
  background-color: transparent;
  box-shadow: none;
}

h1 {
  color: #746657;
  margin: 40px 0;
}

.enterprise-table {
  margin: 0 auto;
  width: 80%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
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

.filter-input {
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  max-width: 150px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

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

.error-message {
  color: red;
  margin-top: 20px;
  font-weight: bold;
}
</style>
