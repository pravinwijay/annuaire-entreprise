<template>
  <div class="main-container">
    <div class="content">
      <PageHeader class="pageHeader" title="Connexion" />
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" placeholder="Entrez votre email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" placeholder="Entrez votre mot de passe" required />
        </div>
        <button type="submit" :disabled="isLoading">
          <span v-if="isLoading">Chargement...</span>
          <span v-else>Se connecter</span>
        </button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false); // Indicateur de chargement
const router = useRouter();

const login = async () => {
  try {
    isLoading.value = true; // Afficher le chargement pendant la requête

    // Appeler l'API de connexion
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!response.ok) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    const data = await response.json();

    // Vérification de la réponse pour s'assurer que le rôle est bien inclus
    console.log("Utilisateur connecté :", data);
    if (data.is_admin === undefined) {
      throw new Error("Rôle de l'utilisateur non trouvé dans la réponse.");
    }

    // Stocker les informations de l'utilisateur et le rôle
    localStorage.setItem("user", JSON.stringify({
      id: data.id,
      nom: data.nom,
      email: data.email,
      role: data.is_admin ? "admin" : "user"
    }));

    // Rediriger vers la page d'accueil après la connexion
    router.push("/accueil");

    // Rafraîchir l'état de la page en réinitialisant la page entière
    window.location.reload();

  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false; // Masquer l'indicateur de chargement
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #e7dfd8;
}
.pageHeader {
  margin-bottom: 50px;
}

.content {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
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

input {
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

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}
</style>
