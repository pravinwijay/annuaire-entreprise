<template>
  <div class="avis-container">
    <PageHeader title="Avis" />

    <h2>Avis pour {{ entrepriseName }}</h2>

    <ul>
      <li v-for="(avis, index) in filteredAvisList" :key="index">
        <strong>{{ avis.user }} :</strong> {{ avis.text }}
      </li>
    </ul>

    <div>
      <input v-model="newAvis" placeholder="Écrire un avis" />
      <button @click="submitAvis">Envoyer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";

const allAvis = ref([
  { entreprise: "Entreprise A", user: "Alice", text: "Excellente entreprise !" },
  { entreprise: "Entreprise A", user: "Bob", text: "Très satisfait des services." },
  { entreprise: "Entreprise B", user: "Charlie", text: "Bon service client." },
]);

const route = useRoute();
const entrepriseName = route.query.entreprise;

const filteredAvisList = computed(() =>
  allAvis.value.filter((avis) => avis.entreprise === entrepriseName)
);

const newAvis = ref("");

const submitAvis = () => {
  if (newAvis.value) {
    allAvis.value.push({
      entreprise: entrepriseName,
      user: "Utilisateur Anonyme", 
      text: newAvis.value,
    });
    newAvis.value = ""; 
  }
};
</script>

<style scoped>
.avis-container {
  padding: 20px;
  background-color: #e7dfd8;
}

input {
  padding: 8px 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
