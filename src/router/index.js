import { createRouter, createWebHashHistory } from 'vue-router'

// Pagina principal
import PaginaPrincipal from '@/views/pagina-principal.vue'
// Login
import IniciarSesion from '@/views/iniciar-sesion.vue'
import RegistrarCliente from '@/views/registrar-cliente.vue'
// Catálogo motos
import CustomMoto from '@/views/catalogo/custom-moto.vue'
import DeportivoMoto from '@/views/catalogo/deportivo-moto.vue'
import MotoCalle from '@/views/catalogo/moto-calle.vue'
import MotocrossMoto from '@/views/catalogo/motocross-moto.vue'
import ScootersMoto from '@/views/catalogo/scooters-moto.vue'
import TouringMoto from '@/views/catalogo/touring-moto.vue'

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
  {
    path: '/custom-moto',
    name: 'CustomMoto',
    component: CustomMoto,
  },
  {
    path: '/deportivo-moto',
    name: 'DeportivoMoto',
    component: DeportivoMoto,
  },
  {
    path: '/moto-calle',
    name: 'MotoCalle',
    component: MotoCalle,
  },
  {
    path: '/motocross-moto',
    name: 'MotocrossMoto',
    component: MotocrossMoto,
  },
  {
    path: '/scooters-moto',
    name: 'ScootersMoto',
    component: ScootersMoto,
  },
  {
    path: '/touring-moto',
    name: 'TouringMoto',
    component: TouringMoto,
  },
]

const router = createRouter({
  // 👇 Hash mode para GitHub Pages
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
