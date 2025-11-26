import VistaPrincipalSaludoEleccion from '@/views/VistaPrincipalSaludoEleccion.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:"/", component:VistaPrincipalSaludoEleccion}]
})

export default router
