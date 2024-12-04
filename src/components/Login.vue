<template>
  <div class="login-container">
    <PageHeader title="Connexion" />

    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email :</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Entrez votre email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    const data = await response.json();

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userRole", data.role); // "admin" ou "user"

    if (data.role === "admin") {
      router.push("/liste-entreprises");
    } else {
      router.push("/accueil");
    }
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.login-container {
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

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
