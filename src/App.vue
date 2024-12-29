<template>
  <div>
    <div class="navbar">
      <router-link to="/">
        <button>Accueil</button>
      </router-link>

      <router-link to="/liste-entreprises">
        <button>Les entreprises</button>
      </router-link>

      <router-link to="/new-entreprise">
        <button>Ajouter une entreprise</button>
      </router-link>

      <router-link to="/liste-entreprises">
        <button>Modifier une entreprise</button>
      </router-link>

      <router-link to="/suppression">
        <button>Supprimer une entreprise</button>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 10px;
    background-color: #746657;
  }

  .navbar button {
    padding: 10px 20px;
    border: none;
    background-color: transparent; 
    color: #e7dfd8; 
    font-size: 16px;
    cursor: pointer; 
    transition: none; 
  }
  .navbar button:hover {
    background-color: transparent; 
    color: #e7dfd8; 
  }
</style>
