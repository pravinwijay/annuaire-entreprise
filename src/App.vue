<template>
  <div>
    <!-- La vue de la route actuelle sera rendue ici -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Fonction pour naviguer vers une route spécifique
const goToRoute = (route) => {
  router.push(route);  // Utilisation de router.push pour rediriger vers la route
};
</script>

<style scoped>
/* Style de la barre de navigation */
.navbar {
  display: flex;
  justify-content: space-between; /* Espace entre les éléments */
  align-items: center; /* Aligner verticalement les éléments */
  padding: 10px;
  background-color: #746657; /* Couleur de fond de la navbar */
}

/* Style des boutons dans la barre de navigation */
.navbar button {
  padding: 10px 20px; /* Espacement interne des boutons */
  border: none; /* Retirer les bordures des boutons */
  background-color: transparent; /* Pas de fond pour les boutons */
  color: #e7dfd8; /* Couleur du texte des boutons */
  font-size: 16px; /* Taille du texte */
  cursor: pointer; /* Curseur en forme de main */
  transition: none; /* Pas d'animation */
}

/* Style au survol des boutons */
.navbar button:hover {
  background-color: transparent; /* Pas de changement de fond au survol */
  color: #e7dfd8; /* Garder la couleur du texte inchangée au survol */
}
</style>
