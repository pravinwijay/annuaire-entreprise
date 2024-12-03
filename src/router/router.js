import { createRouter, createWebHashHistory } from 'vue-router';
import Accueil from '../components/Accueil.vue';
import Entreprise from '../components/Entreprise.vue';
import Avis from '../components/Avis.vue';
import MonCompte from '../components/MonCompte.vue';
import NotFound from '../components/NotFound.vue';
import Login from '../components/Login.vue';

const routes = [
  { path: '/', component: Accueil },
  { path: '/entreprise', component: Entreprise },
  { path: '/avis', component: Avis },
  { path: '/mon-compte', component: MonCompte },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)*', component: NotFound }, // Page 404
];

const router = createRouter({
  history: createWebHashHistory(),  // Utilisation du mode hash
  routes,  // Routes définies
});

export default router;
