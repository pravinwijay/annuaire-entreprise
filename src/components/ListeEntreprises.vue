<template>
  <div class="entreprise-container">
    <PageHeader title="Liste des Entreprises" />

    <!-- Tableau des entreprises -->
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
          <th>En savoir plus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entreprise, index) in filteredEnterprises" :key="index">
          <td>{{ entreprise.name }}</td>
          <td>{{ entreprise.sector }}</td>
          <td>{{ entreprise.city }}</td>
          <td>
            <button @click="goToEntreprise(entreprise.name)">Voir l'entreprise</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Données fictives pour les entreprises
const enterprises = ref([
  { name: "Entreprise A", sector: "Technologie", city: "Paris" },
  { name: "Entreprise B", sector: "Finance", city: "Lyon" },
  { name: "Entreprise C", sector: "Santé", city: "Marseille" },
  { name: "Entreprise D", sector: "Éducation", city: "Toulouse" },
]);

const sectorFilter = ref("");

const filteredEnterprises = computed(() =>
  enterprises.value.filter((enterprise) =>
    enterprise.sector.toLowerCase().includes(sectorFilter.value.toLowerCase())
  )
);

const router = useRouter();

const goToEntreprise = (entrepriseName) => {
  router.push({ path: `/entreprise/${entrepriseName}` }); // Redirige vers la page Entreprise avec le nom en paramètre
};
</script>

<style scoped>
.entreprise-container {
  padding: 20px;
  background-color: #e7dfd8;
}

.enterprise-table {
  width: 100%;
  border-collapse: collapse;
  margin: auto;
}

.enterprise-table th,
.enterprise-table td {
  border: 1px solid #746657;
  padding: 12px;
  text-align: left;
}

.enterprise-table th {
  background-color: #746657;
  color: #e7dfd8;
  position: relative;
}

.enterprise-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.filter-input {
  margin-top: 5px;
  width: 90%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
}

button {
  padding: 8px 12px;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #36a378;
}
</style>
