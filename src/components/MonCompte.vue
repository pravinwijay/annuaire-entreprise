<template>
  <div class="mon-compte-container">
    <div class="main-content">

      <div class="profile-card">

        <div class="right-side">
          <h2>{{ user.firstName.toUpperCase() }} {{ user.lastName.toLowerCase() }}</h2>

          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Nom :</label>
              <input type="text" id="firstName" v-model="user.firstName" placeholder="Modifier le nom" />
            </div>
            <div class="form-group">
              <label for="lastName">Prénom :</label>
              <input type="text" id="lastName" v-model="user.lastName" placeholder="Modifier le prénom" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email :</label>
              <input type="email" id="email" v-model="user.email" placeholder="Modifier l'email" />
            </div>
            <div class="form-group">
              <label for="phone">Téléphone :</label>
              <input type="tel" id="phone" v-model="user.phone" placeholder="Modifier le téléphone" />
            </div>
          </div>
          <button class="submit-btn" @click="submitForm">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios"; 

// Déclaration de la variable user avec des valeurs par défaut
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

onMounted(async () => {
  // Vérifier si l'utilisateur est stocké dans localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.id) {
    try {
      // Récupérer les données de l'utilisateur via l'API en utilisant son ID
      const response = await axios.get(`http://127.0.0.1:8000/api/utilisateurs/${storedUser.id}`);
      
      // Si les données sont correctement récupérées, on met à jour le formulaire
      if (response.data) {
        user.value.firstName = response.data.nom || '';  
        user.value.lastName = response.data.prenom || '';  
        user.value.email = response.data.email || '';  
        user.value.phone = response.data.telephone || ''; 
      } else {
        console.log("Utilisateur non trouvé");
      }
    } catch (error) {
      console.error("Erreur de récupération des données utilisateur", error);
    }
  } else {
    console.log("Aucun utilisateur trouvé dans localStorage");
  }
});

// Fonction pour soumettre le formulaire et mettre à jour l'utilisateur via un PATCH
const submitForm = async () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser || !storedUser.id) {
    console.error("Utilisateur non trouvé dans le localStorage");
    alert("Utilisateur non authentifié.");
    return;
  }

  try {
    // URL de l'API pour la maj
    const apiUrl = `http://127.0.0.1:8000/api/utilisateurs/${storedUser.id}`;
    

    const headers = {
      "Content-Type": "application/merge-patch+json",
    };

    const response = await axios.patch(apiUrl, {
      nom: user.value.firstName,  
      prenom: user.value.lastName,  
      email: user.value.email, 
      telephone: user.value.phone,
      profileImage: user.value.profileImage,  
    }, { headers });

    if (response.status === 200) {
      alert("Les modifications ont été enregistrées !");
    } else {
      console.error("Erreur de mise à jour", response);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données : ", error);
    alert("Une erreur est survenue lors de la mise à jour.");
  }
};
</script>

<style scoped>
.mon-compte-container {
  background-color: #e7dfd8;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-top: 100px;
}

.profile-card {
  display: flex;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
  max-width: 800px;
  align-items: center;
}


.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #746657;
  object-fit: cover;
}

.right-side {
  flex: 1;
}

.right-side h2 {
  margin-bottom: 20px;
  color: #746657;
  font-size: 24px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-group input:focus {
  border-color: #746657;
  outline: none;
}

/* Bouton de validation */
.submit-btn {
  background-color: #746657;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #5b5248;
}
</style>
