<template>
    <div class="new-compte-container">
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
  
  const email = ref("");
  const password = ref("");
  const role = ref("user");
  const successMessage = ref("");
  const errorMessage = ref("");
  
  const createAccount = async () => {
    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value, password: password.value, role: role.value }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la création du compte.");
      }
  
      successMessage.value = "Compte créé avec succès.";
      email.value = "";
      password.value = "";
      role.value = "user";
    } catch (error) {
      errorMessage.value = error.message;
    }
  };
  </script>
  
  <style scoped>
  .new-compte-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  form {
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 300px;
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
  