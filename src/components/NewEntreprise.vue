<template>
    <div class="new-compte-container">
       
      <PageHeader class="pageHeader" title="Ajouter une entreprise" />
  
      <form @submit.prevent="ajoutEntreprise" >

        <div class="form-group">
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="nom" required />
        </div>
  
        <div class="form-group">
          <label for="adresse">Adresse :</label>
          <input type="text" id="adresse" v-model="adresse" required />
        </div>
  
        <div class="form-group">
          <label for="secteur">Secteur :</label>
          <input type="text" id="secteur" v-model="secteur" required />
        </div>
  
        <div class="form-group">
          <label for="contact">Contact :</label>
          <input type="text" id="contact" v-model="contact" required />
        </div>
  
        <div class="form-group">
          <label for="nb_employe">Nombre d'employés :</label>
          <input type="number" id="nb_employe" v-model="nb_employe" required />
        </div>
  
        <button type="submit">Ajouter une entreprise</button>

      </form>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import PageHeader from "@/components/PageHeader.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const nom = ref("");
  const adresse = ref("");
  const secteur = ref("");
  const contact = ref("");
  const nb_employe = ref(0);
  const image = ref(""); 
  const successMessage = ref("");
  const errorMessage = ref("");
  
  const router = useRouter();
  
  const ajoutEntreprise = async () => {
  try {
    // Appel POST à l'API pour créer un utilisateur
    const response = await axios.post("http://127.0.0.1:8000/api/entreprises", {
      nom: nom.value,
      adresse: adresse.value,
      secteur: secteur.value,
      contact: contact.value, 
      nb_employe: nb_employe.value, 
      image: image.value,
    }, {
      headers: {
        "Content-Type": "application/ld+json", 
      },
    });

    if (response.status === 201) {
      successMessage.value = "Entreprise ajoutée avec succès.";
      nom.value = "";
      adresse.value = "";
      secteur.value = "";
      nb_employe.value = 0;
      contact.value = "";
      image.value = "";
      errorMessage.value = ""; 
    } else {
      throw new Error("Erreur lors de l'ajout de l'entreprise.");
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message;
    successMessage.value = ""; 
  }
};
  </script>

  <style scoped>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
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

  .pageHeader {
    margin-bottom: 50px;
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
  