<template>
    <div class="accueil-container">
      <!-- Barre de navigation -->
      <div class="navbar">
        <button @click="goToRoute('/entreprise')">Entreprise</button>
        <button class="center" @click="goToRoute('/avis')">Avis</button>
        <button @click="goToRoute('/mon-compte')">Mon compte</button>
      </div>
  
      <!-- Contenu principal -->
      <div class="main-content">
        <!-- Division en deux sections : texte à gauche, image à droite -->
        <div class="content-wrapper">
          <div class="text-section">
            <h1>Bienvenue sur notre site!</h1>
            <p>
              Découvrez nos services et ce que nous avons à offrir. Nous vous proposons
              une variété de solutions adaptées à vos besoins. Explorez nos services pour en savoir plus!
            </p>
          </div>
  
          <div class="image-section">
            <img src="https://www.africatopsuccess.com/wp-content/uploads/2017/01/kaaris-la-tracklist-de-or-noir-reedition-jpg.jpg" alt="Image d'accueil" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Importation de l'instance de router pour la navigation
  import { useRouter } from 'vue-router';
  
  // Initialisation du router
  const router = useRouter();
  
  // Fonction pour naviguer vers la route
  const goToRoute = (route) => {
    router.push(route);  // Utilisation de router.push pour rediriger vers la route spécifiée
  };
  </script>
  
  <style scoped>
  /* Style global de la page */
  .accueil-container {
    background-color: #e7dfd8; /* Couleur de fond de la page */
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  
  body {
    margin: 0;
  }
  
  /* Style de la barre de navigation */
  .navbar {
    display: flex;
    justify-content: space-between; /* Espacement entre les éléments */
    align-items: center; /* Aligner verticalement les éléments */
    padding: 10px;
    background-color: #746657; /* Couleur de fond de la navbar */
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
  
  .navbar .center {
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Contenu principal */
  .main-content {
    text-align: center;
    margin-top: 30px;
    padding: 20px;
  }
  
  /* Division du contenu en deux parties : texte à gauche, image à droite */
  .content-wrapper {
    display: flex;
    justify-content: space-between; /* Espace entre la partie texte et l'image */
    align-items: center; /* Centrer verticalement */
    padding: 20px;
  }
  
  .text-section {
    width: 45%; /* 45% de l'écran pour le texte */
    padding-right: 20px;
  }
  
  .text-section h1 {
    font-size: 2.5rem;
    color: #746657;
  }
  
  .text-section p {
    font-size: 1.1rem;
    color: #333;
  }
  
  .image-section {
    width: 45%; /* 45% de l'écran pour l'image */
  }
  
  .image-section img {
    width: 100%; /* L'image prend toute la largeur de son conteneur */
    height: auto; /* L'image garde ses proportions */
    border-radius: 8px;
  }
  
  /* Assurez-vous que l'image et le texte sont bien alignés sur tous les écrans */
  @media (max-width: 768px) {
    .content-wrapper {
      flex-direction: column; /* Sur les petits écrans, mettez le texte et l'image en colonne */
      align-items: center;
    }
  
    .text-section,
    .image-section {
      width: 100%; /* Prenez toute la largeur disponible sur mobile */
      margin-bottom: 20px;
    }
  
    .image-section img {
      max-width: 100%; /* L'image doit être redimensionnée sur mobile */
    }
  }
  </style>
  