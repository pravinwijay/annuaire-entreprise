<script setup>
import { ref, computed } from 'vue';
import Home from './components/TheWelcome.vue';
import Entreprises from './components/Entreprise.vue';
import NotFound from './components/NotFound.vue';

// Définir les routes
const routes = {
  '/': Home,
  '/entreprises': Entreprises,
};

// Détecter la route actuelle (basée sur le hash)
const currentPath = ref(window.location.hash.slice(1) || '/');

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash.slice(1) || '/';
});

// Calculer quel composant afficher en fonction de la route
const currentView = computed(() => {
  return routes[currentPath.value] || NotFound;
});
</script>

<template>
  <header>
    <nav>
      <a href="#/">Home</a> |
      <a href="#/entreprises">Entreprises</a>
    </nav>
  </header>

  <main>
    <!-- Charger dynamiquement le composant correspondant à la route -->
    <component :is="currentView" />
  </main>
</template>

<style scoped>
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a:hover {
  text-decoration: underline;
}
</style>
