<template>
    <div class="entreprise-container">
      <h1>Liste des Commentaires</h1>
      <table class="enterprise-table">
        <thead>
          <tr>
            <th>Commentaire</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="commentaire in commentaires" :key="commentaire.id">
            <td>{{ commentaire.commentaire }}</td>
            <td>
           
              <button @click="deleteCommentaire(commentaire.id)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const commentaires = ref([]);
  const errorMessage = ref("");
  
 
  const fetchCommentaires = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/commentaires");
      commentaires.value = response.data.member || [];
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des commentaires.";
      commentaires.value = [];
    }
  };
  
  
  const deleteCommentaire = async (commentaireId) => {
    try {
     
      await axios.delete(`http://127.0.0.1:8000/api/commentaires/${commentaireId}`);
      
     
      commentaires.value = commentaires.value.filter(c => c.id !== commentaireId);
    } catch (error) {
      errorMessage.value = "Erreur lors de la suppression du commentaire.";
    }
  };
  
 
  onMounted(fetchCommentaires);
  </script>
  
  <style scoped>
  button {
    background-color: #e74c3c;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c0392b;
  }
  
  button:focus {
    outline: none;
  }
  
  .enterprise-container {
    background-color: #f9f9f9;
    text-align: center;
    padding-top: 50px;
  }
  
  .enterprise-table {
    margin: 0 auto;
    width: 80%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .enterprise-table th,
  .enterprise-table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ccc;
  }
  
  .enterprise-table th {
    background-color: #746657;
    color: white;
  }
  
  .enterprise-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .enterprise-table tr:hover {
    background-color: #f1f1f1;
  }
  
  .error-message {
    color: red;
    margin-top: 20px;
    font-weight: bold;
  }
  </style>
  