
import { createRouter, createWebHashHistory } from 'vue-router';
import Connexion from '../components/Connexion.vue';
import ListeEntreprises from '../components/ListeEntreprises.vue';
import Entreprise from '../components/Entreprise.vue';
import Avis from '../components/Avis.vue';
import MonCompte from '../components/MonCompte.vue';
import MesAvis from "../components/MesAvis.vue";
import NouveauCompte from "../components/NouveauCompte.vue";
import NouvelleEntreprise from '@/components/NouvelleEntreprise.vue';
import SupprimerEntreprise from '@/components/SupprimerEntreprise.vue';
import ModifEntreprise from '@/components/ModifEntreprise.vue';
import Accueil from '@/components/Accueil.vue';
import Deconnexion from '@/components/Deconnexion.vue';
import SupprimerCompte from '@/components/SupprimerCompte.vue';
import ModifUtilisateur from '@/components/ModifUtilisateur.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/accueil', component: Accueil },
  { path: '/login', component: Connexion },
  { path: '/liste-entreprises', component: ListeEntreprises },
  { path: '/entreprise/:entrepriseId', component: Entreprise, props: true },
  { path: '/avis/:id', component: Avis, props: true },
  { path: '/mes-avis', component: MesAvis, meta: { requiresAuth: true } },
  { path: '/mon-compte', component: MonCompte, meta: { requiresAuth: true } },
  { path: '/deconnexion', component: Deconnexion, meta: { requiresAuth: true } },

  // administrateurs
  { path: '/new-compte', component: NouveauCompte, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/new-entreprise', component: NouvelleEntreprise, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/suppression/:id', component: SupprimerEntreprise, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/suppression-compte/:id', component: SupprimerCompte, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/modification/:id', component: ModifEntreprise, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/modificationUtilisateur/:id', component: ModifUtilisateur, meta: { requiresAuth: true, role: 'admin' } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.requiresAuth) {
    if (!user) {
      return next('/login');
    }
    if (to.meta.role && user.role !== to.meta.role) {
      return next('/');
    }
  }

  next();
});
export default router;
