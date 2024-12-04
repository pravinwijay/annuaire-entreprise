<template>
  <div class="accueil-container">
    <div class="navbar">
      <button @click="goToRoute('/liste-entreprises')">ENTREPRISE</button>
      <button class="center" @click="goToRoute('/mes-avis')">MES AVIS</button>
      <button @click="goToRoute('/mon-compte')">MON COMPTE</button>
    </div>
    <div class="main-content">
      <div class="left-side">
        <h1>Bienvenue sur notre site !</h1>
        <p>
          Découvrez nos services et explorez les différentes solutions que
          nous vous proposons. Nous avons tout ce qu'il vous faut pour
          améliorer votre entreprise et optimiser vos processus.
        </p>
      </div>
      <div class="right-side">
        <img
          src="https://ceoworld.biz/wp-content/uploads/2019/06/Apple.jpg"
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
