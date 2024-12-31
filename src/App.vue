<template>
  <div>
    <div class="navbar">
      <router-link to="/accueil">
        <button>Accueil</button>
      </router-link>

      <router-link to="/liste-entreprises">
        <button>Les entreprises</button>
      </router-link>

      <template v-if="isAuthenticated">
        <router-link to="/mes-avis">
          <button>Mes avis</button>
        </router-link>

        <router-link to="/mon-compte">
          <button>Mon compte</button>
        </router-link>

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

          <router-link to="/new-compte">
            <button>Ajouter un utilisateur</button>
          </router-link>

          <router-link to="/modificationUtilisateur/:id">
            <button>Modifier un utilisateur</button>
          </router-link>

          <router-link to="/suppression-compte/:id">
            <button>Supprimer un utilisateur</button>
          </router-link>

          
        </template>

        <router-link to="/deconnexion">
          <button>Déconnexion</button>
        </router-link>
      </template>

      <template v-else>
        <router-link to="/login">
          <button>Login</button>
        </router-link>
      </template>
    </div>

    <router-view></router-view>
  </div>
</template>

<script
const isAuthenticated = ref(false);
const isAdmin = ref(false);

const initUser = () => {
  const user = JSON.parse(localStorage.getItem('user')); 
  if (user) {
    isAuthenticated.value = true;
    isAdmin.value = user.role === 'admin'; 
  } else {
    isAuthenticated.value = false; 
    isAdmin.value = false; 
  }
};

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

<script setup>
import { ref, watchEffect } from 'vue';

const isAuthenticated = ref(false);
const isAdmin = ref(false);

const initUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    isAuthenticated.value = true;
    isAdmin.value = user.role === 'admin';
  } else {
    isAuthenticated.value = false;
    isAdmin.value = false;
  }
};
watchEffect(() => {
  initUser();
});
</script>