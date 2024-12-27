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
      <div class="left-side">
        <h1>{{ entreprise.name }}</h1>
        <p>{{ entreprise.description }}</p>
      </div>
      <div class="right-side">
        <img :src="entreprise.image" alt="Image de l'entreprise" />
      </div>
    </div>
<<<<<<< HEAD
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
  
=======
    <div class="center-button">
      <button @click="goToAvis" class="submit-avis-btn">Saisir mon avis</button>
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
  { 
    name: "Entreprise A", 
    sector: "Technologie", 
    city: "Paris", 
    image: "https://www.webstickersmuraux.com/fr/img/asfs140-jpg/folder/products-listado-merchant/autocollants-apple-logo.jpg", 
    description: "Une entreprise spécialisée en technologie." 
  },
  { 
    name: "Entreprise B", 
    sector: "Finance", 
    city: "Lyon", 
    image: "https://i0.wp.com/www.flore-du-web.com/wp-content/uploads/2023/04/logo-apple-variante-4.jpg?resize=800%2C533&ssl=1", 
    description: "Une entreprise spécialisée en finance." 
  },
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
</script>

<style scoped>
.entreprise-container {
  background-color: #e7dfd8;
}

/* Navbar */
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
  align-items: center;
  padding: 50px;
}

/* Left side: Text */
.left-side {
  flex: 1;
  text-align: center;
}

/* Right side: Image */
.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
}

.right-side img {
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

/* Center button */
.center-button {
  text-align: center;
  margin-top: 20px;
}

/* Button styles */
.submit-avis-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 20px; /* Padding peut être ajusté pour la hauteur et largeur */
  border-radius: 5px;
  cursor: pointer;
  width: 20%;  /* Réduit la largeur du bouton à 20% de la largeur de son conteneur */
  margin: 0 auto; /* Centrer le bouton horizontalement */
}

.submit-avis-btn:hover {
  background-color: #358b5c;
}


/* Avis list */
.avis-list {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}

.avis-list h2 {
  text-align: center;
  color: #746657;
}

.avis-bubble {
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
>>>>>>> ac273cf69f16507f0ccd28b1bb22929090345165
