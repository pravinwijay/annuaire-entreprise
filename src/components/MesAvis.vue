<template>
  <div class="mes-avis-container">
    <div class="main-content">
      <h1 class="title">MES AVIS</h1>

      <div class="avis-list">
        <div v-if="userAvis.length === 0" class="no-avis">
          Vous n'avez encore laissé aucun avis.
        </div>

        <div v-for="(avis, index) in userAvis" :key="index" class="avis-bubble">
          <h3>{{ avis.entreprise }}</h3>
          <p>{{ avis.text }}</p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Récupérer l'utilisateur actuellement connecté depuis le localstorage (c'est pas bien)
const user = JSON.parse(localStorage.getItem('user')); 
const utilisateurId = user ? user.id : null;  

const userAvis = ref([]);

const fetchUserAvis = async () => {
  if (!utilisateurId) {
    console.error("Utilisateur non connecté ou ID manquant");
    return;
  }

  try {
    // Récupérer tous les commentaires
    const response = await axios.get("http://127.0.0.1:8000/api/commentaires");

    if (response.data && response.data.member) {
      const commentaires = response.data.member;

      // Filtrer les commentaires de l'utilisateur actuel en comparant avec l'URL complète
      const userComments = commentaires.filter(comment => {
        return comment.utilisateur === `/api/utilisateurs/${utilisateurId}`;
      });

      if (userComments.length > 0) {
        // Récupérer les détails de chaque commentaire
        userAvis.value = await Promise.all(
          userComments.map(async (comment) => {
            // Récupérer l'utilisateur qui a laissé le commentaire
            const utilisateurResponse = await axios.get(comment.utilisateur);
            // Récupérer l'ID de l'entreprise liée au commentaire
            const entrepriseId = comment.entreprise.split("/").pop(); // Extraire l'ID de l'entreprise de l'URL

            // Faire une requête pour récupérer le nom de l'entreprise
            const entrepriseResponse = await axios.get(`http://127.0.0.1:8000/api/entreprises/${entrepriseId}`);

            return {
              entreprise: entrepriseResponse.data.nom,  
              text: comment.commentaire,  
              date: comment.date,  
              utilisateurNom: utilisateurResponse.data.nom,  
            };
          })
        );
      } else {
        console.log("Aucun avis trouvé pour cet utilisateur");
      }
    } else {
      console.error("Erreur dans la réponse de l'API pour les commentaires");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
  }
};

onMounted(() => {
  // Vérifiez si l'utilisateur est connecté et récupérez ses avis
  if (utilisateurId) {
    fetchUserAvis();
  } else {
    console.log("Utilisateur non connecté, redirection vers la page de connexion.");
    router.push('/login'); // Redirige vers la page de connexion si aucun utilisateur connecté
  }
});
</script>

<style scoped>
.mes-avis-container {
  background-color: #e7dfd8;
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

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 100px;
  color: #746657;
}

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
