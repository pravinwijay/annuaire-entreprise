<template>
    <div class="new-compte-container">
      <PageHeader class="pageHeader" title="Créer un compte" />
      <form @submit.prevent="createAccount">
        <div class="form-group">
          <label for="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            v-model="nom"
            placeholder="Entrez votre nom"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="prenom">Prénom :</label>
          <input
            type="text"
            id="prenom"
            v-model="prenom"
            placeholder="Entrez votre prénom"
            required
          />
        </div>
  
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
          <label for="telephone">Téléphone :</label>
          <input
            type="text"
            id="telephone"
            v-model="telephone"
            placeholder="Entrez un numéro de téléphone"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            placeholder="Entrez un mot de passe"
            v-model="password"
            required
          />
        </div>
  
        <button type="submit" >Créer un compte</button>
      </form>
  
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "@/components/PageHeader.vue";
  import { ref } from "vue";
  import axios from "axios";
import { useRouter } from "vue-router";
  
  const nom = ref("");
  const prenom = ref("");
  const email = ref("");
  const telephone = ref("");
  const password = ref("");
  const successMessage = ref("");
  const errorMessage = ref("");
  const router = useRouter();
  const createAccount = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/utilisateurs",
        {
          nom: nom.value,
          prenom: prenom.value,
          email: email.value,
          telephone: parseInt(telephone.value, 10),
          mdp: password.value,
          admin: false, 
        },
        {
          headers: {
            "Content-Type": "application/ld+json",
          },
        }
      );
  
      if (response.status === 201) {
        successMessage.value = "Compte créé avec succès.";
        nom.value = "";
        prenom.value = "";
        email.value = "";
        telephone.value = "";
        password.value = "";
        
        router.push('/login');
      } else {
        throw new Error("Erreur lors de la création du compte.");
      }
    } catch (error) {
      errorMessage.value = error.response?.data?.message || error.message;
    }
  };


  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }
  
  .new-compte-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px);
    background-color: #f0f0f0;
    padding: 20px;
  }
  
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
    width: 80%;
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
  
  .pageHeader {
    margin-bottom: 50px;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  