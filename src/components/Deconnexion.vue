<template>
  <div>
    <p>Déconnexion en cours...</p>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {

  localStorage.removeItem('user');

  router.push('/accueil');
};

logout();
window.location.reload();
</script>
  