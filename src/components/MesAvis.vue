<template>
    <div class="mes-avis-container">
      <div class="navbar">
        <button @click="goToRoute('/accueil')">ACCUEIL</button>
        <button class="center" @click="goToRoute('/liste-entreprises')">ENTREPRISE</button>
        <button @click="goToRoute('/mon-compte')">MON COMPTE</button>
      </div>
      <div class="main-content">
        <div>
          <h1 class="title">MES AVIS</h1> <!-- Ajout de la classe "title" pour le style -->
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
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  // Données fictives pour les avis de l'utilisateur
  const userAvis = ref([
    { entreprise: "Entreprise A", text: "Excellent service !", date: "2024-12-01" },
    { entreprise: "Entreprise B", text: "Bonne expérience globale.", date: "2024-11-20" },
    { entreprise: "Entreprise C", text: "Quelques problèmes mineurs, mais satisfaisant.", date: "2024-11-10" },
  ]);
  
  const router = useRouter();
  
  const goToRoute = (route) => {
    router.push(route);
  };
  </script>
  
  <style scoped>
  .mes-avis-container {
    background-color: #e7dfd8;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #746657;
  }
  
  /* Titre Mes Avis */
  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 30px;
    color: #746657; /* Couleur pour le titre */
  }
  
  /* Liste des avis */
  .avis-list {
    padding: 20px;
    margin-top: 20px;
  }
  
  .avis-bubble {
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }
  
  .avis-bubble h3 {
    margin: 0;
    color: #746657;
  }
  
  .avis-bubble p {
    margin: 5px 0;
  }
  
  .avis-bubble small {
    color: #888;
  }
  </style>
  