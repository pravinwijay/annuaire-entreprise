<script setup>
import { ref } from 'vue';
import axios from 'axios'; // Assurez-vous d'installer axios si ce n'est pas déjà fait

// Déclaration des variables réactives pour chaque champ du formulaire
const nom = ref('');
const adresse = ref('');
const secteur = ref('');
const contact = ref('');
const nb_employe = ref('');
const image = ref('');

// Fonction pour envoyer les données au backend
const submitForm = async () => {
  try {
    // Assurez-vous que l'URL correspond à votre API Symfony et votre route pour créer une entreprise
    const response = await axios.post('http://localhost:8000/api/entreprises', {
      nom: nom.value,
      adresse: adresse.value,
      secteur: secteur.value,
      contact: contact.value,
      nb_employe: nb_employe.value,
      image: image.value,
    });
    
    console.log('Entreprise ajoutée avec succès :', response.data);
    // Vous pouvez réinitialiser les champs après une soumission réussie
    nom.value = '';
    adresse.value = '';
    secteur.value = '';
    contact.value = '';
    nb_employe.value = '';
    image.value = '';
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'entreprise:', error);
  }
};
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />

    <!-- Formulaire pour ajouter une entreprise -->
    <form @submit.prevent="submitForm">
      <div>
        <label for="nom">Nom de l'entreprise:</label>
        <input type="text" id="nom" v-model="nom" required />
      </div>

      <div>
        <label for="adresse">Adresse:</label>
        <input type="text" id="adresse" v-model="adresse" required />
      </div>

      <div>
        <label for="secteur">Secteur:</label>
        <input type="text" id="secteur" v-model="secteur" required />
      </div>

      <div>
        <label for="contact">Contact:</label>
        <input type="text" id="contact" v-model="contact" required />
      </div>

      <div>
        <label for="nb_employe">Nombre d'employés:</label>
        <input type="number" id="nb_employe" v-model="nb_employe" required />
      </div>

      <div>
        <label for="image">Image (URL):</label>
        <input type="text" id="image" v-model="image" />
      </div>

      <button type="submit">Ajouter l'entreprise</button>
    </form>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
}

form div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
}

button {
  padding: 0.7rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
