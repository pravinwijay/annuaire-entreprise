<template>
    <div class="new-compte-container">
      <!-- Barre de navigation -->
      <nav class="navbar">
        <button @click="goHome">Accueil</button>
        <div class="center">Mon Application</div>
        <button @click="goLogin">Se connecter</button>
      </nav>
  
      <PageHeader title="Créer un compte" />
    
      <form @submit.prevent="createAccount">
        <div class="form-group">
          <label for="email">Email :</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Entrez un email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Entrez un mot de passe"
            required
          />
        </div>
        <div class="form-group">
          <label for="role">Rôle :</label>
          <select id="role" v-model="role" required>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        <button type="submit">Créer un compte</button>
      </form>
    
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "@/components/PageHeader.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
 // Variables réactives pour les champs du formulaire
const nom = ref("");
const prenom = ref("");
const email = ref("");
const telephone = ref("");
const password = ref("");
const isAdmin = ref("false"); // "false" ou "true" sous forme de chaîne
const successMessage = ref("");
const errorMessage = ref("");

// Fonction de création de compte
const createAccount = async () => {
  try {
    // Appel POST à l'API pour créer un utilisateur
    const response = await axios.post("http://127.0.0.1:8000/api/utilisateurs", {
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      telephone: parseInt(telephone.value, 10), // Conversion en nombre
      mdp: password.value, // Ne changez pas cela si l'API attend ce champ
      admin: isAdmin.value === "true", // Conversion en booléen
    }, {
      headers: {
        "Content-Type": "application/ld+json", // Définir le bon type de contenu
      },
    });

    // Vérification du succès de la requête
    if (response.status === 201) {
      successMessage.value = "Compte créé avec succès.";
      
      // Réinitialisation des champs après succès
      nom.value = "";
      prenom.value = "";
      email.value = "";
      telephone.value = "";
      password.value = "";
      isAdmin.value = "false"; // Réinitialiser le rôle à "Utilisateur"
    } else {
      throw new Error("Erreur lors de la création du compte.");
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message;
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
  
