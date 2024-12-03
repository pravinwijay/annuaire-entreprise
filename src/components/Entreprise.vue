<script setup>
import { ref } from 'vue';

const entreprises = ref([
  { id: 1, nom: 'Entreprise 1', secteur: 'IT' },
  { id: 2, nom: 'Entreprise 2', secteur: 'Finance' },
]);
</script>

<template>
  <div>
    <h1>Liste des entreprises</h1>
    <ul>
      <li v-for="entreprise in entreprises" :key="entreprise.id">
        {{ entreprise.nom }} - Secteur : {{ entreprise.secteur }}
      </li>
    </ul>
  </div>
</template>
