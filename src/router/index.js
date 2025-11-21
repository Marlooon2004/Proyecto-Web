import { createRouter, createWebHistory } from 'vue-router'
import PaginaPrincipal from '../views/pagina-principal.vue'

const routes = [
  {
    path: '/',
    redirect: '/pagina-principal',
  },
  {
    path: '/pagina-principal',
    name: 'PaginaPrincipal',
    component: PaginaPrincipal,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
