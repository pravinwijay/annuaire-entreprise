<template>
    <div>
      <p>Déconnexion en cours...</p>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Fonction pour gérer la déconnexion
  const logout = () => {
    // Supprimer les données de l'utilisateur du localStorage
    localStorage.removeItem('user');
  
    // Rediriger vers la page d'accueil après la déconnexion
    router.push('/accueil');
  };
  
  logout();
  window.location.reload();
  </script>
  