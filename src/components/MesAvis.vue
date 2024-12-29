<template>
  <div class="mes-avis-container">
    <div class="navbar">
      <button @click="goToRoute('/accueil')">ACCUEIL</button>
      <button class="center" @click="goToRoute('/liste-entreprises')">ENTREPRISE</button>
      <button @click="goToRoute('/mon-compte')">MON COMPTE</button>
    </div>
    <div class="main-content">
      <h1 class="title">MES AVIS</h1>
      
      <div class="avis-list">
        <div v-if="userAvis.length === 0" class="no-avis">
          Vous n'avez encore laissé aucun avis.
        </div>
        
        <!-- Affichage des avis de l'utilisateur -->
        <div
          v-for="(avis, index) in userAvis"
          :key="index"
          class="avis-bubble"
        >
          <h3>{{ avis.entreprise }}</h3>
          <p>{{ avis.text }}</p>
          <small>— {{ avis.utilisateurNom }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

// Variables pour stocker les données
const userAvis = ref([]);  // Stocke les avis de l'utilisateur
const utilisateurId = "/api/utilisateurs/4";  // L'ID de l'utilisateur connecté (à adapter)

// Fonction pour naviguer entre les routes
const goToRoute = (route) => {
  router.push(route);
};

// Fonction pour récupérer les avis de l'utilisateur
const fetchUserAvis = async () => {
  try {
    // Récupérer tous les commentaires
    const response = await axios.get("http://127.0.0.1:8000/api/commentaires");
    const commentaires = response.data.member;
    
    // Filtrer les commentaires de l'utilisateur spécifique
    const userComments = commentaires.filter(comment => comment.utilisateur === utilisateurId);

    // Récupérer les informations de chaque entreprise associée à l'avis
    userAvis.value = await Promise.all(
      userComments.map(async (comment) => {
        // Récupérer le nom de l'utilisateur qui a écrit l'avis
        const utilisateurResponse = await axios.get(`http://127.0.0.1:8000${comment.utilisateur}`);
        
        // Récupérer les informations de l'entreprise
        const entrepriseResponse = await axios.get(`http://127.0.0.1:8000${comment.entreprise}`);
        
        return {
          entreprise: entrepriseResponse.data.nom,
          text: comment.commentaire,
          date: comment.date,
          utilisateurNom: utilisateurResponse.data.nom, // Ajout du nom de l'utilisateur
        };
      })
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
  }
};

// Charger les données dès que le composant est monté
onMounted(() => {
  fetchUserAvis();
});
</script>

<style scoped>
.mes-avis-container {
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

.navbar button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.navbar button:hover {
  text-decoration: underline;
}

/* Titre Mes Avis */
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 30px;
  color: #746657;
}

/* Liste des avis */
.avis-list {
  padding: 20px;
  margin-top: 20px;
}

.no-avis {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
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
