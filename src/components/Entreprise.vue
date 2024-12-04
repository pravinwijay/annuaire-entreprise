<template>
    <div class="entreprise-details-container">
      <PageHeader :title="entreprise.name" />
  
      <div class="main-content">
        <div class="left-side">
          <img :src="entreprise.image" alt="Image de l'entreprise" />
        </div>
  
        <div class="right-side">
          <p>{{ entreprise.description }}</p>
        </div>
      </div>
  
      <div class="avis-section">
        <button @click="goToAvis">Saisir mon avis</button>
  
        <h2>Avis des utilisateurs</h2>
        <ul>
          <li v-for="(avis, index) in filteredAvisList" :key="index">
            <strong>{{ avis.user }} :</strong> {{ avis.text }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "@/components/PageHeader.vue";
  import { ref, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const enterprises = [
    { name: "Entreprise A", sector: "Technologie", city: "Paris", image: "https://via.placeholder.com/400x300", description: "Une entreprise spécialisée en technologie." },
    { name: "Entreprise B", sector: "Finance", city: "Lyon", image: "https://via.placeholder.com/400x300", description: "Une entreprise spécialisée en finance." },
    { name: "Entreprise C", sector: "Santé", city: "Marseille", image: "https://via.placeholder.com/400x300", description: "Une entreprise dans le domaine de la santé." },
    { name: "Entreprise D", sector: "Éducation", city: "Toulouse", image: "https://via.placeholder.com/400x300", description: "Une entreprise dans l'éducation." },
  ];
  
  const route = useRoute();
  const entrepriseName = route.params.entrepriseName;
  
  const entreprise = computed(() =>
    enterprises.find((entreprise) => entreprise.name === entrepriseName) || {}
  );
  
  const allAvis = ref([
    { entreprise: "Entreprise A", user: "Alice", text: "Excellente entreprise !" },
    { entreprise: "Entreprise A", user: "Bob", text: "Très satisfait des services." },
    { entreprise: "Entreprise B", user: "Charlie", text: "Bon service client." },
  ]);
  
  const filteredAvisList = computed(() =>
    allAvis.value.filter((avis) => avis.entreprise === entrepriseName)
  );
  
  const router = useRouter();
  
  const goToAvis = () => {
    router.push({ path: "/avis", query: { entreprise: entrepriseName } });
  };
  </script>
  
  <style scoped>
  .entreprise-details-container {
    padding: 20px;
    background-color: #e7dfd8;
  }
  
  .main-content {
    display: flex;
    justify-content: space-between;
  }
  
  .left-side img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    background-color: #42b983;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #358b5c;
  }
  </style>
  