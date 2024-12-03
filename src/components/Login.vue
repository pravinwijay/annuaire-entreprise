<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Fonction de gestion du login
const login = async () => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      throw new Error('Login failed. Check your credentials.');
    }

    const data = await response.json();
    alert('Login successful! Token: ' + data.token); // Vous pouvez utiliser un token pour authentifier l'utilisateur
    window.location.hash = '#/accueil'; // Redirection vers la page d'accueil
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #e7dfd8;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

form {
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #36a378;
}
</style>
