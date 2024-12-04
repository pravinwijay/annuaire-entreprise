<template>
  <div class="accueil-container">
    <!-- Barre de navigation occupant toute la largeur -->
    <div class="navbar">
      <button @click="goToRoute('/liste-entreprises')">Entreprise</button>
      <button class="center" @click="goToRoute('/mes-avis')">Mes Avis</button>
      <button @click="goToRoute('/mon-compte')">Mon compte</button>
    </div>

    <!-- Contenu principal divisé en deux : texte à gauche et image à droite -->
    <div class="main-content">
      <div class="left-side">
        <h1>Bienvenue sur notre site !</h1>
        <p>
          Découvrez nos services et explorez les différentes solutions
          que nous vous proposons. Nous avons tout ce qu'il vous faut pour
          améliorer votre entreprise et optimiser vos processus.
        </p>
      </div>

      <div class="right-side">
        <img
          src="https://www.africatopsuccess.com/wp-content/uploads/2017/01/kaaris-la-tracklist-de-or-noir-reedition-jpg.jpg"
          alt="Image d'accueil"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToRoute = (route) => {
  router.push(route); 
};
</script>

<style scoped>
.accueil-container {
  background-color: #e7dfd8;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #746657;
  width: 100%; 
  box-sizing: border-box;
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
  background-color: transparent;
  color: #e7dfd8;
}

.navbar .center {
  margin-left: auto;
  margin-right: auto;
}

.main-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  box-sizing: border-box;
}

.left-side {
  flex: 1;
  padding-right: 20px;
}

.left-side h1 {
  color: #746657;
  font-size: 36px;
  margin-bottom: 20px;
}

.left-side p {
  font-size: 18px;
  margin-bottom: 30px;
}

.right-side {
  flex: 1;
}

.right-side img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
