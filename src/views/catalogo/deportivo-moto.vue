<template>
  <div class="contenedor-general">

    <!-- Main content -->
    <div class="popular-products">
      <div class="header">
        <!-- Botón con cruz -->
        <button class="btn btn-link text-danger" @click="goHome">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <h2 class="section-title">Catálogo de motos deportivas</h2>
      <div class="product-grid">
        <div class="product-card" v-for="(product, index) in products" :key="index">
          <img :src="product.image" class="product-image" :alt="product.title" />
          <div class="product-body">
            <h5 class="product-title">{{ product.title }}</h5>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-info">
              <span class="product-price">{{ product.price }}</span>
              <div class="product-rating">
                <span v-for="n in 4" :key="n" class="star">★</span>
                <span class="star half">☆</span>
                <small class="rating-text">(4.5)</small>
              </div>
            </div>
          </div>
          <div class="product-footer">
            <button class="btn primary">Reservar</button>
            <button class="btn secondary">♡</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push({ name: 'PaginaPrincipal', hash: '#portfolio' })
}
import moto1 from '@/assets/img/catalogo motos/deportivas/voge-rr660s-2026-port-640x0.jpg'
import moto2 from '@/assets/img/catalogo motos/deportivas/kawasaki-ninja-125-2026-port-640x0.jpg'
import moto3 from '@/assets/img/catalogo motos/deportivas/kawasaki-ninja-zx-10rr-2023-640x0.jpg'
import moto4 from '@/assets/img/catalogo motos/deportivas/ktm-990-rc-r-2026-port-640x0.jpg'
import moto5 from '@/assets/img/catalogo motos/deportivas/yamaha-r7-2026-port-640x0.jpg'
import moto6 from '@/assets/img/catalogo motos/deportivas/yamaha-xsr900-gp-2026-port-640x0.jpg'

const products = [
  {
    title: 'VOGE RR660S 2026',
    description: 'Potencia: 99 cv - Cilindrada: 663 cc.',
    image: moto1,
  },
  {
    title: 'Kawasaki Ninja 125 2026',
    description: 'Potencia: 14.75 cv - Cilindrada: 125 CC.',
    image: moto2,
  },
  {
    title: 'Kawasaki ZX-10R / RR 2026',
    description: 'Potencia: 200 cv - Cilindrada: 998 cc.',
    image: moto3,
  },
  {
    title: 'KTM 990 RC R',
    description: 'Enfocada en usabilidad y comodidad - Cilindrada: 125 cc.',
    image: moto4,
  },
  {
    title: 'Yamaha R7 2026',
    description: 'Potencia: 73 cv - Cilindrada: 698 cc.',
    image: moto5,
  },
  {
    title: 'Yamaha XSR900 GP 2026',
    description: 'Potencia: 118 cv - Cilindrada: 890 cc.',
    image: moto6,
  }
]
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
}

.contenedor-general {
  position: relative;
  padding: 1rem;
}

/* Sidebar toggle button */
.sidebar-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background-color: #ff6b00;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
}

/* Offcanvas sidebar */
.offcanvas {
  position: fixed;
  top: 0;
  left: -300px;
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: white;
  padding: 1rem;
  transition: left 0.3s ease;
  z-index: 1000;
}

.offcanvas.open {
  left: 0;
}

.offcanvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.offcanvas-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.offcanvas-body {
  margin-top: 1rem;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  margin-bottom: 1rem;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  display: block;
  transition: color 0.3s ease;
}

.menu a:hover {
  color: #00bfff;
}

/* Product styles (ya existentes) */
.popular-products {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #ff6b00;
  margin-bottom: 2rem;
  text-align: center;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-body {
  padding: 1rem;
  flex-grow: 1;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.product-description {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.star {
  color: #f5a623;
  font-size: 1rem;
}

.star.half {
  color: #f5a623;
  opacity: 0.5;
}

.rating-text {
  font-size: 0.8rem;
  color: #888;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.primary {
  background-color: #007bff;
  color: white;
}

.btn.primary:hover {
  background-color: #0056b3;
}

.btn.secondary {
  background-color: transparent;
  color: #555;
  border: 1px solid #ccc;
}

.btn.secondary:hover {
  background-color: #eee;
}
</style>
