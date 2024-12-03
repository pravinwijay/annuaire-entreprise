import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js'; // Assurez-vous que le chemin du fichier router est correct

const app = createApp(App);
app.use(router);  // Utilisation de Vue Router
app.mount('#app');
