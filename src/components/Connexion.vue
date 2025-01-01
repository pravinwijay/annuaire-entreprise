<template>
  <div class="main-container">
    <div class="content">
      <PageHeader class="pageHeader" title="Vous êtes ?" />
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const router = useRouter();


onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    
    router.push("/accueil");
  }
});


const login = async () => {
  try {
    isLoading.value = true;

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

    console.log("Utilisateur connecté :", data);
    if (data.is_admin === undefined) {
      throw new Error("Rôle de l'utilisateur non trouvé dans la réponse.");
    }

  
    localStorage.setItem("user", JSON.stringify({
      id: data.id,
      nom: data.nom,
      email: data.email,
      role: data.is_admin ? "admin" : "user"
    }));

    
    router.push("/accueil");


    window.location.reload();

  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
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
  background:#e7dfd8;
  padding: 20px;
  border: 0px;
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
  width: 95%;
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
