<template>
  <div>
    <p>Déconnexion en cours...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {

  localStorage.removeItem('user');


  router.push('/accueil');
  

  setTimeout(() => {
    window.location.reload();
  }, 100); 
};


onMounted(() => {
  logout();
});
</script>
