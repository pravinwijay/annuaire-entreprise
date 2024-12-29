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

const userAvis = ref([]);
const utilisateurId = "/api/utilisateurs/4";

const fetchUserAvis = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/commentaires");
    const commentaires = response.data.member;
    const userComments = commentaires.filter(comment => comment.utilisateur === utilisateurId);

    userAvis.value = await Promise.all(
      userComments.map(async (comment) => {
        const utilisateurResponse = await axios.get(`http://127.0.0.1:8000${comment.utilisateur}`);
        const entrepriseResponse = await axios.get(`http://127.0.0.1:8000${comment.entreprise}`);

        return {
          entreprise: entrepriseResponse.data.nom,
          text: comment.commentaire,
          date: comment.date,
          utilisateurNom: utilisateurResponse.data.nom,
        };
      })
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
  }
};

onMounted(() => {
  fetchUserAvis();
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
  margin-top: 30px;
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
