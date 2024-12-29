import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Accueil from '../components/Accueil.vue';
import ListeEntreprises from '../components/ListeEntreprises.vue';
import Entreprise from '../components/Entreprise.vue';
import Avis from '../components/Avis.vue';
import MonCompte from '../components/MonCompte.vue';
import NotFound from '../components/NotFound.vue';
import MesAvis from "../components/MesAvis.vue";
import NewCompte from "../components/NewCompte.vue";
import NewEntreprise from '@/components/NewEntreprise.vue';
import SupprimerEntreprise from '@/components/SupprimerEntreprise.vue';

const routes = [
  { path: '/', component: Accueil },
  { path: '/liste-entreprises', component: ListeEntreprises },  
  { path: '/entreprise/:entrepriseId', component: Entreprise, props: true },
  { path: "/mes-avis", component: MesAvis }, 
  { path: "/new-compte", component: NewCompte },
  { path: "/new-entreprise", component: NewEntreprise }, 
  { path: "/login", component: Login }, 
  { path: '/avis', component: Avis },
  { path: '/mon-compte', component: MonCompte },
  { path: '/suppression/:', component: SupprimerEntreprise },
  { path: '/:pathMatch(.*)*', component: NotFound }, 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
