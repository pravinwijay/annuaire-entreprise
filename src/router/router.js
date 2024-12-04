import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Accueil from '../components/Accueil.vue';
import ListeEntreprises from '../components/ListeEntreprises.vue';
import Entreprise from '../components/Entreprise.vue';
import Avis from '../components/Avis.vue';
import MonCompte from '../components/MonCompte.vue';
import NotFound from '../components/NotFound.vue';
import MesAvis from "../components/MesAvis.vue"; // Importation du nouveau composant
import NewCompte from "../components/NewCompte.vue";



const routes = [
  { path: '/accueil', component: Accueil },
  { path: '/liste-entreprises', component: ListeEntreprises },  // Liste des entreprises
  { 
    path: '/entreprise/:entrepriseName', // Paramètre dynamique entrepriseName
    name: 'entreprise',
    component: Entreprise,
    props: true  // Permet de passer le paramètre comme prop dans le composant
  },
  { path: "/mes-avis", component: MesAvis }, // Route pour Mes Avis
  { path: "/new-compte", component: NewCompte }, // Nouvelle route
  { path: "/login", component: Login }, // Route pour Mes Avis
  { path: '/avis', component: Avis },
  { path: '/mon-compte', component: MonCompte },
  { path: '/:pathMatch(.*)*', component: NotFound }, // Page 404
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
