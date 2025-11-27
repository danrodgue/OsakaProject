import VistaEleccionMenu from '@/views/VistaEleccionMenu.vue'
import VistaPrincipalSaludoEleccion from '@/views/VistaPrincipalSaludoEleccion.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:"/", component:VistaPrincipalSaludoEleccion},
    {path:"/VistaEleccion", component:VistaEleccionMenu}
  ]
})

export default router
