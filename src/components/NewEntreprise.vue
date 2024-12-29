<template>
    <div class="new-compte-container">
      <!-- Barre de navigation -->
      <nav class="navbar">
        <button @click="goHome">Accueil</button>
        <div class="center">Mon Application</div>
        <button @click="goLogin">Se connecter</button>
      </nav>
  
      <PageHeader title="Ajouter une entreprise" />
  
      <form @submit.prevent="ajoutEntreprise" >
        <!-- Champ pour le nom -->
        <div class="form-group">
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="nom" required />
        </div>
  
        <!-- Champ pour l'adresse -->
        <div class="form-group">
          <label for="adresse">Adresse :</label>
          <input type="text" id="adresse" v-model="adresse" required />
        </div>
  
        <!-- Champ pour le secteur -->
        <div class="form-group">
          <label for="secteur">Secteur :</label>
          <input type="text" id="secteur" v-model="secteur" required />
        </div>
  
        <!-- Champ pour le contact -->
        <div class="form-group">
          <label for="contact">Contact :</label>
          <input type="text" id="contact" v-model="contact" required />
        </div>
  
        <!-- Champ pour le nombre d'employés -->
        <div class="form-group">
          <label for="nb_employe">Nombre d'employés :</label>
          <input type="number" id="nb_employe" v-model="nb_employe" required />
        </div>
  
      
  
        <!-- Bouton pour soumettre le formulaire -->
        <button type="submit">Ajouter une entreprise</button>
      </form>
  
      <!-- Message de succès -->
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <!-- Message d'erreur -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "@/components/PageHeader.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  // Variables réactives pour les champs du formulaire
  const nom = ref("");
  const adresse = ref("");
  const secteur = ref("");
  const contact = ref("");
  const nb_employe = ref(0);
  const image = ref(""); // Référence pour stocker le fichier sélectionné
  
  // Variables pour les messages
  const successMessage = ref("");
  const errorMessage = ref("");
  
  // Gestion du fichier sélectionné
 
  
  // Obtenir l'objet router
  const router = useRouter();
  
  // Fonction de création d'entreprise
  const ajoutEntreprise = async () => {
  try {
    // Appel POST à l'API pour créer un utilisateur
    const response = await axios.post("http://127.0.0.1:8000/api/entreprises", {
      nom: nom.value,
      adresse: adresse.value,
      secteur: secteur.value,
      contact: contact.value, // Conversion en nombre
      nb_employe: nb_employe.value, // Le mot de passe
      image: image.value, // Conversion en booléen
    }, {
      headers: {
        "Content-Type": "application/ld+json", // Définir le bon type de contenu
      },
    });

    // Vérification du succès de la requête
    if (response.status === 201) {
      successMessage.value = "Entreprise ajoutée avec succès.";

      // Réinitialisation des champs après succès
      nom.value = "";
      adresse.value = "";
      secteur.value = "";
      nb_employe.value = 0;
      contact.value = "";
      image.value = "";
      errorMessage.value = ""; // Effacer le message d'erreur
    } else {
      throw new Error("Erreur lors de l'ajout de l'entreprise.");
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message;
    successMessage.value = ""; // Effacer le message de succès
  }
};

  // Méthodes de navigation
  const goHome = () => {
    router.push("/home");
  };
  
  const goLogin = () => {
    router.push("/login");
  };
  </script>
  
  
  <style scoped>
  /* Style global pour le body */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }
  
  /* Barre de navigation */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #746657;
    width: 100%;
    box-sizing: border-box;
    font-size: 1.5rem;
  }
  
  .navbar button {
    padding: 10px 20px;
    border: none;
    background-color: transparent;
    color: #e7dfd8;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }
  
  .navbar button:hover {
    color: #ffffff;
  }
  
  .navbar .center {
    margin-left: auto;
    margin-right: auto;
  }
  
  /* Style pour le conteneur principal */
  .new-compte-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px); /* Ajuste la hauteur pour prendre en compte la barre de nav */
    background-color: #f0f0f0;
    padding: 20px;
  }
  
  /* Style du formulaire */
  form {
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #36a378;
  }
  
  .success-message {
    color: green;
    margin-top: 10px;
    font-weight: bold;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  