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
          <th>Ville</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(enterprise, index) in filteredEnterprises" :key="index">
          <td>{{ enterprise.name }}</td>
          <td>{{ enterprise.sector }}</td>
          <td>{{ enterprise.city }}</td>
          <td>
            <button @click="goToEntreprise(enterprise.name)">Détails</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Mock data
const enterprises = ref([
  { name: "Entreprise A", sector: "Technologie", city: "Paris" },
  { name: "Entreprise B", sector: "Finance", city: "Lyon" },
]);

const sectorFilter = ref("");

const filteredEnterprises = computed(() =>
  enterprises.value.filter((enterprise) =>
    enterprise.sector.toLowerCase().includes(sectorFilter.value.toLowerCase())
  )
);

const router = useRouter();

const goToEntreprise = (enterpriseName) => {
  router.push(`/entreprise/${enterpriseName}`);
};

const goToRoute = (route) => {
  router.push(route);
};
</script>

<style scoped>
.entreprise-container {
  background-color: #e7dfd8;
  text-align: center;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #746657;
  font-size: 1.5rem;
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
}

.navbar button:hover {
  color: #ffffff;
}

.navbar .center {
  margin-left: auto;
  margin-right: auto;
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
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #358b5c;
}
</style>
