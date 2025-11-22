import { createRouter, createWebHistory } from 'vue-router'
import PaginaPrincipal from '../views/pagina-principal.vue'
import IniciarSesion from '../views/iniciar-sesion.vue'
import RegistrarCliente from '../views/registrar-cliente.vue'

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
  {
    path: '/iniciar-sesion',
    name: 'IniciarSesion',
    component: IniciarSesion,
  },
  {
    path: '/registrar-cliente',
    name: 'RegistrarCliente',
    component: RegistrarCliente,
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
