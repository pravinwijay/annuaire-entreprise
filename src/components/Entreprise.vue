<template>
  <div class="entreprise-container">
    <!-- Main Content -->
    <div class="main-content">
      <div class="right-side">
        <h1>{{ entreprise?.nom || 'Entreprise non trouvée' }}</h1>
        <p>Secteur: {{ entreprise?.secteur || 'Aucune description disponible.' }}</p>
        <button @click="goToComment" class="submit-avis-btn">Saisir mon commentaire</button>
      </div>
   
    </div>

    <div class="avis-list">
      <h2>Commentaires des utilisateurs</h2>
      <div v-for="(comment, index) in commentairesList" :key="index" class="avis-bubble">
        <strong>{{ comment.utilisateur }} :</strong> {{ comment.commentaire }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const entreprise = ref(null);
const commentairesList = ref([]);
const route = useRoute();
const router = useRouter();

// Récupérer l'ID de l'entreprise depuis les query parameters (pas params)
const entrepriseId = route.params.entrepriseId; // Récupérer l'ID de l'entreprise depuis l'URL
// Utilisez route.query pour récupérer l'ID

// Fonction pour récupérer les données de l'entreprise
const fetchEntreprise = async () => {
  try {
    console.log(`Fetching entreprise with ID: ${entrepriseId}`);
    const response = await axios.get(`http://127.0.0.1:8000/api/entreprises/${entrepriseId}`);
    console.log("Réponse de l'entreprise : ", response.data); // Ajoutez cette ligne pour déboguer
    entreprise.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'entreprise:", error);
    entreprise.value = null;
  }
};



// Fonction pour récupérer les commentaires associés à l'entreprise
const fetchCommentaires = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/commentaires");
    const allCommentaires = response.data.member;
    commentairesList.value = await Promise.all(
      allCommentaires
        .filter((comment) => comment.entreprise === `/api/entreprises/${entrepriseId}`)
        .map(async (comment) => {
          const userId = comment.utilisateur;
          try {
            const userResponse = await axios.get(`http://127.0.0.1:8000${comment.utilisateur}`);
            return {
              utilisateur: userResponse.data.nom || "Utilisateur inconnu",
              commentaire: comment.commentaire,
            };
          } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
            return {
              utilisateur: "Utilisateur inconnu",
              commentaire: comment.commentaire,
            };
          }
        })
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    commentairesList.value = [];
  }
};

// Naviguer vers la page des avis en passant l'ID de l'entreprise dans les query parameters
// Naviguer vers la page pour ajouter un commentaire
const goToComment = () => {
  if (entreprise.value && entreprise.value.id) {
    // Vérifiez que l'ID de l'entreprise est disponible avant de faire la redirection
    router.push({ path: `/avis/${entreprise.value.id}` });
  } else {
    console.error("L'ID de l'entreprise est introuvable.");
  }
};


// Charger les données de l'entreprise et les commentaires lors du montage du composant
onMounted(async () => {
  await fetchEntreprise();
  await fetchCommentaires();
});
</script>

<style scoped>
.entreprise-container {
  background-color: #e7dfd8;
  margin-top: 100px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #746657;
}
.main-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px;
}

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
.right-side {
  max-width: 45%;
}
.right-side img {
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
}
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
