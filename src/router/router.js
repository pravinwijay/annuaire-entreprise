
import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login.vue';
import ListeEntreprises from '../components/ListeEntreprises.vue';
import Entreprise from '../components/Entreprise.vue';
import Avis from '../components/Avis.vue';
import MonCompte from '../components/MonCompte.vue';
import NotFound from '../components/NotFound.vue';
import MesAvis from "../components/MesAvis.vue";
import NewCompte from "../components/NewCompte.vue";
import NewEntreprise from '@/components/NewEntreprise.vue';
import SupprimerEntreprise from '@/components/SupprimerEntreprise.vue';
import ModifEntreprise from '@/components/ModifEntreprise.vue';
import Accueil from '@/components/Accueil.vue';
import Deconnexion from '@/components/Deconnexion.vue';
import SupprimerCompte from '@/components/SupprimerCompte.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/accueil', component: Accueil },
  { path: '/login', component: Login },
  { path: '/liste-entreprises', component: ListeEntreprises },
  { path: '/entreprise/:entrepriseId', component: Entreprise, props: true },
  { path: '/avis/:id', component: Avis, props: true },

  // Pages nécessitant une authentification
  { path: '/mes-avis', component: MesAvis, meta: { requiresAuth: true } },
  { path: '/mon-compte', component: MonCompte, meta: { requiresAuth: true } },
  { path: '/deconnexion', component: Deconnexion, meta: { requiresAuth: true } },

  // Pages réservées aux administrateurs
  { path: '/new-compte', component: NewCompte, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/new-entreprise', component: NewEntreprise, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/suppression/:id', component: SupprimerEntreprise, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/suppression-compte/:id', component: SupprimerCompte, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/modification/:id', component: ModifEntreprise, meta: { requiresAuth: true, role: 'admin' } },
];




const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Gestion des accès en fonction des rôles
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur du stockage local

  // Vérifie si la route nécessite une authentification
  if (to.meta.requiresAuth) {
    if (!user) {
      return next('/login'); // Rediriger vers la page de connexion si non authentifié
    }

    // Vérifie le rôle si spécifié
    if (to.meta.role && user.role !== to.meta.role) {
      return next('/'); // Redirige vers l'accueil si rôle incorrect
    }
  }

  next(); // Passe à la route demandée
});


export default router;
