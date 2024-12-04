<template>
    <div class="mes-avis-container">
      <PageHeader title="Mes Avis" />
      <div class="avis-list">
        <div
          v-for="(avis, index) in userAvis"
          :key="index"
          class="avis-bubble"
        >
          <h3>{{ avis.entreprise }}</h3>
          <p>{{ avis.text }}</p>
          <small>— {{ avis.date }}</small>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "@/components/PageHeader.vue";
  import { ref } from "vue";
  
  // Données fictives pour les avis de l'utilisateur
  const userAvis = ref([
    { entreprise: "Entreprise A", text: "Excellent service !", date: "2024-12-01" },
    { entreprise: "Entreprise B", text: "Bonne expérience globale.", date: "2024-11-20" },
    { entreprise: "Entreprise C", text: "Quelques problèmes mineurs, mais satisfaisant.", date: "2024-11-10" },
  ]);
  </script>
  
  <style scoped>
  .mes-avis-container {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .avis-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .avis-bubble {
    padding: 15px;
    background-color: #e7dfd8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .avis-bubble h3 {
    margin: 0 0 5px;
    color: #746657;
  }
  
  .avis-bubble p {
    margin: 0 0 10px;
  }
  
  .avis-bubble small {
    color: #888;
  }
  </style>
  