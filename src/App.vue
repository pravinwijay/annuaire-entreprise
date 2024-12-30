<template>
  <div>
    <div class="navbar">
      <!-- Lien Accueil (accessible pour tous) -->
      <router-link to="/accueil">
        <button>Accueil</button>
      </router-link>

      <!-- Lien Liste des entreprises (accessible pour tous) -->
      <router-link to="/liste-entreprises">
        <button>Les entreprises</button>
      </router-link>

      <!-- Si l'utilisateur est connecté, afficher ces options -->
      <template v-if="isAuthenticated">
        <router-link to="/mes-avis">
          <button>Mes avis</button>
        </router-link>

        <router-link to="/mon-compte">
          <button>Mon compte</button>
        </router-link>

        <!-- Si l'utilisateur est un admin, afficher les pages réservées aux admins -->
        <template v-if="isAdmin">
          <router-link to="/new-entreprise">
            <button>Ajouter une entreprise</button>
          </router-link>

          <router-link to="/modification/:id">
            <button>Modifier une entreprise</button>
          </router-link>

          <router-link to="/suppression/:id">
            <button>Supprimer une entreprise</button>
          </router-link>

          <router-link to="/suppression-compte/:id">
            <button>Supprimer un compte</button>
          </router-link>

          <router-link to="/new-compte">
            <button>Créer un compte admin</button>
          </router-link>
        </template>

        <!-- Bouton de déconnexion pour tous les utilisateurs connectés -->
        <router-link to="/deconnexion">
          <button>Déconnexion</button>
        </router-link>
      </template>

      <!-- Si l'utilisateur n'est pas connecté, afficher les options suivantes -->
      <template v-else>
        <router-link to="/login">
          <button>Login</button>
        </router-link>
      </template>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

// Variables pour gérer l'état de l'utilisateur
const isAuthenticated = ref(false);
const isAdmin = ref(false);

// Fonction pour initialiser l'état de l'utilisateur depuis le localStorage
const initUser = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur depuis le localStorage
  if (user) {
    isAuthenticated.value = true; // L'utilisateur est connecté
    isAdmin.value = user.role === 'admin'; // Vérifier si l'utilisateur est admin
  } else {
    isAuthenticated.value = false; // L'utilisateur n'est pas connecté
    isAdmin.value = false; // Par défaut, pas admin
  }
};

// Surveiller les changements de localStorage et mettre à jour l'état de la navbar
watchEffect(() => {
  initUser();
});
</script>

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
