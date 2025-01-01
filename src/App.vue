<template>
  <div>
    <div class="navbar">
    
      <template v-if="isAuthenticated && isAdmin">
      
        <div class="dropdown">
          <button @click="toggleMenu('entreprise')">Entreprise</button>
          <div v-if="openMenu === 'entreprise'" class="dropdown-menu">
            <router-link to="/liste-entreprises">
              <button>Les entreprises</button>
            </router-link>
            <router-link to="/new-entreprise">
              <button>Ajouter une entreprise</button>
            </router-link>
            <router-link to="/modification/:id">
              <button>Modifier une entreprise</button>
            </router-link>
            <router-link to="/suppression/:id">
              <button>Supprimer une entreprise</button>
            </router-link>
          </div>
        </div>

    
        <div class="dropdown">
          <button @click="toggleMenu('utilisateur')">Utilisateur</button>
          <div v-if="openMenu === 'utilisateur'" class="dropdown-menu">
            <router-link to="/liste-utilisateurs">
              <button>Liste des utilisateurs</button>
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
          </div>
        </div>
        <div class="dropdown">
          <button @click="toggleMenu('avis')">Avis</button>
          <div v-if="openMenu === 'avis'" class="dropdown-menu">
            <router-link to="/liste-avis">
              <button>Liste des avis</button>
            </router-link>
          </div>
        </div>
        <router-link to="/deconnexion">
          <button>Déconnexion</button>
        </router-link>
      </template>

      <template v-else-if="isAuthenticated">
        <router-link to="/liste-entreprises">
              <button>Les entreprises</button>
            </router-link>
        <router-link to="/mes-avis">
          <button>Mes avis</button>
        </router-link>
        <router-link to="/mon-compte">
          <button>Mon compte</button>
        </router-link>
        <router-link to="/deconnexion">
          <button>Déconnexion</button>
        </router-link>
      </template>

      <template v-else>
 
        <router-link to="/login">
          <button>Login</button>
        </router-link>
        <router-link to="/inscription">
          <button>Inscription</button>
        </router-link>
      </template>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";


const isAuthenticated = ref(false);
const isAdmin = ref(false);
const openMenu = ref(null);


const initUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    isAuthenticated.value = true;
    isAdmin.value = user.role === "admin"; 
  } else {
    isAuthenticated.value = false;
    isAdmin.value = false;
  }
};


const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu;
};


initUser();
</script>

<style scoped>

.navbar {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  background-color: #746657;
  padding: 10px;
}


.navbar button {
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  color: #e7dfd8;
  font-size: 16px;
  cursor: pointer;
}

.navbar button:hover {
  color: #ffffff;
}


.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  background-color: #746657;
  border: 1px solid #e7dfd8;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.dropdown-menu button {
  background-color: transparent;
  border: none;
  color: #e7dfd8;
  font-size: 14px;
  cursor: pointer;
}

.dropdown-menu button:hover {
  color: #ffffff;
}
</style>
