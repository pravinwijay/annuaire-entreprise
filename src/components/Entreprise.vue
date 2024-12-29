<template>
  <div class="entreprise-container">

    <!-- Main Content -->
    <div class="main-content">
      <div class="right-side">
        <h1>{{ entreprise?.nom || 'Entreprise non trouvée' }}</h1>
        <p>{{ entreprise?.description || 'Aucune description disponible.' }}</p>
        <button @click="goToComment" class="submit-avis-btn">Saisir mon commentaire</button>
      </div>
      <div class="left-side">
        <img :src="entreprise?.image || 'https://via.placeholder.com/400x300'" alt="Image de l'entreprise" />
      </div>
    </div>

    <!-- Commentaires Section -->
    <div class="avis-list">
      <h2>Commentaires des utilisateurs</h2>
      <div
        v-for="(comment, index) in commentairesList"
        :key="index"
        class="avis-bubble"
      >
        <strong>{{ comment.utilisateur }} :</strong> {{ comment.commentaire }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

// Variables réactives
const entreprise = ref(null); // Données de l'entreprise sélectionnée
const commentairesList = ref([]); // Liste des commentaires pour l'entreprise
const route = useRoute();
const router = useRouter();

// Récupérer l'ID de l'entreprise depuis les paramètres de la route
const entrepriseId = route.params.entrepriseId;

// Charger les données dynamiquement
const fetchEntreprise = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/entreprises/${entrepriseId}`);
    entreprise.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'entreprise:", error);
    entreprise.value = null;
  }
};

const fetchCommentaires = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/commentaires");
    // Filtrer les commentaires pour l'entreprise en question
    const allCommentaires = response.data.member;
    commentairesList.value = await Promise.all(
      allCommentaires
        .filter((comment) => comment.entreprise === `/api/entreprises/${entrepriseId}`)
        .map(async (comment) => {
          // Récupérer le nom de l'utilisateur pour chaque commentaire
          const userResponse = await axios.get(`http://127.0.0.1:8000${comment.utilisateur}`);
          return {
            utilisateur: userResponse.data.nom || "Utilisateur inconnu",
            commentaire: comment.commentaire,
          };
        })
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    commentairesList.value = [];
  }
};

// Naviguer vers une autre page
const goToRoute = (route) => {
  router.push(route);
};

// Naviguer vers la page pour ajouter un commentaire
const goToComment = () => {
  router.push({ path: "/commentaires", query: { entreprise: entrepriseId } });
};

// Charger les données au montage du composant
onMounted(async () => {
  await fetchEntreprise();
  await fetchCommentaires();
});
</script>

<style scoped>
.entreprise-container {
  background-color: #e7dfd8;
}

/* Navbar styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #746657;
}

/* Main content styles */
.main-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px;
}

/* Left side styles */
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

/* Button styles */
.submit-avis-btn {
  background-color: #42b983;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: auto;
  cursor: pointer;
}

.submit-avis-btn:hover {
  background-color: #358b5c;
}

/* Right side styles */
.right-side {
  max-width: 45%;
}

.right-side img {
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
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
