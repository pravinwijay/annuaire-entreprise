<template>
  <div class="avis-container">
    <PageHeader title="Avis" />

    <!-- Afficher le nom de l'entreprise -->
    <h2>Avis pour {{ entreprise.nom }}</h2>

    <ul>
      <li v-for="(avis, index) in filteredAvisList" :key="index">
        <strong>{{ avis.user }} :</strong> {{ avis.text }}
      </li>
    </ul>

    <div>
      <input v-model="newAvis" placeholder="Écrire un avis" />
      <button @click="submitAvis">Envoyer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import PageHeader from "@/components/PageHeader.vue";

const entreprise = ref({});

const route = useRoute();
const entrepriseId = route.params.id;

const commentairesList = ref([]);

const newAvis = ref("");

const user = JSON.parse(localStorage.getItem('user'));

const fetchEntreprise = async () => {
  try {
    console.log(`Fetching entreprise with ID: ${entrepriseId}`);
    const response = await axios.get(`http://127.0.0.1:8000/api/entreprises/${entrepriseId}`);
    entreprise.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de l'entreprise:", error);
    entreprise.value = null;
  }
};

const fetchCommentaires = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/commentaires?entreprise_id=${entrepriseId}`);
    commentairesList.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    commentairesList.value = [];
  }
};

onMounted(async () => {
  await fetchEntreprise();
  await fetchCommentaires();
});

const submitAvis = async () => {
  if (newAvis.value && user) {
    try {
      const utilisateurUrl = `/api/utilisateurs/${user.id}`;
      const entrepriseUrl = `/api/entreprises/${entrepriseId}`;

      const response = await axios.post("http://127.0.0.1:8000/api/commentaires", {
        utilisateur: utilisateurUrl,
        entreprise: entrepriseUrl,
        commentaire: newAvis.value,
      }, {
        headers: {
          "Content-Type": "application/ld+json",
        },
      });

      if (response.status === 201) {
        successMessage.value = "Avis ajouté avec succès.";
        newAvis.value = "";
      } else {
        throw new Error("Erreur lors de l'ajout de l'avis.");
      }
    } catch (error) {
      errorMessage.value = error.response?.data?.message || error.message;
      successMessage.value = "";
    }
  } else {
    alert("Veuillez vous connecter pour laisser un avis.");
  }
};

const filteredAvisList = computed(() =>
  commentairesList.value.filter((avis) => avis.entreprise === entreprise.value.nom)
);
</script>

<style scoped>
.avis-container {
  padding: 20px;
  background-color: #e7dfd8;
}

input {
  padding: 8px 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

.pageHeader {
  margin-bottom: 50px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

button:hover {
  background-color: #36a378;
}
</style>
