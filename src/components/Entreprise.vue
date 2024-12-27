<template>
    <div class="entreprise-container">
      <!-- Navbar -->
      <div class="navbar">
        <button @click="goToRoute('/liste-entreprises')">ENTREPRISE</button>
        <button class="center" @click="goToRoute('/mes-avis')">MES AVIS</button>
        <button @click="goToRoute('/mon-compte')">MON COMPTE</button>
      </div>
  
      <!-- Main Content -->
      <div class="main-content">
        <div class="right-side">
          <h1>{{ entreprise.name }}</h1>
          <p>{{ entreprise.description }}</p>
          <button @click="goToAvis" class="submit-avis-btn">Saisir mon avis</button>
        </div>
        <div class="left-side">
          <img :src="entreprise.image" alt="Image de l'entreprise" />
        </div>
      </div>
  
      <!-- Avis Section -->
      <div class="avis-list">
        <h2>Avis des utilisateurs</h2>
        <div
          v-for="(avis, index) in filteredAvisList"
          :key="index"
          class="avis-bubble"
        >
          <strong>{{ avis.user }} :</strong> {{ avis.text }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from "vue-router";
  import { ref, computed } from "vue";
  
  // Mock data
  const enterprises = [
    { name: "Entreprise A", sector: "Technologie", city: "Paris", image: "https://via.placeholder.com/400x300", description: "Une entreprise spécialisée en technologie." },
    { name: "Entreprise B", sector: "Finance", city: "Lyon", image: "https://via.placeholder.com/400x300", description: "Une entreprise spécialisée en finance." },
    { name: "Entreprise C", sector: "Santé", city: "Marseille", image: "https://via.placeholder.com/400x300", description: "Une entreprise dans le domaine de la santé." },
    { name: "Entreprise D", sector: "Éducation", city: "Toulouse", image: "https://via.placeholder.com/400x300", description: "Une entreprise dans l'éducation." },
  ];
  
  const route = useRoute();
  const router = useRouter();
  
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
  
  const goToAvis = () => {
    router.push({ path: "/avis", query: { entreprise: entrepriseName } });
  };
  
  const goToRoute = (route) => {
    router.push(route);
  };

  // Fonction de création de compte

  </script>
  
  <style scoped>
  .entreprise-container {
    background-color: #e7dfd8;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #746657;
  }
  
  /* Main content */
  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 50px;
  }
  
  /* Left side content with text */
  .left-side {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  /* Title and description styles */
  .left-side h1 {
    color: #746657;
    margin-bottom: 20px;
  }
  
  /* Button styles for "Saisir mon avis" */
  .submit-avis-btn {
    background-color: #42b983;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-top: auto; /* Pushes the button to the bottom of its container */
    cursor: pointer;
  }
  
  .submit-avis-btn:hover {
    background-color: #358b5c;
  }
  
  /* Right side content with image */
  .right-side {
    max-width: 45%;
  }
  
  .right-side img {
    max-width: 100%;
    border-radius: 8px;
    object-fit: cover; /* Ensures the image fits nicely */
  }
  
  /* Avis list styles */
  .avis-list {
    padding: 20px;
    margin: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .avis-list h2 {
    color: #746657;
    margin-bottom: 15px;
  }
  
  .avis-bubble {
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }
  
  </style>
  