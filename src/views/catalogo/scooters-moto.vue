<template>
  <div class="contenedor-general">
    <div class="popular-products">
      <div class="header">
        <button class="btn btn-link text-danger" @click="goHome" :title="$t('catalog.close')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <h2 class="section-title">{{ $t('catalog.scootersCatalog') }}</h2>
      <div class="product-grid">
        <div class="product-card" v-for="(product, index) in products" :key="index">
          <img :src="product.image" class="product-image" :alt="product.title" />
          <div class="product-body">
            <h5 class="product-title">{{ product.title }}</h5>
            <p class="product-description">
              <template v-if="product.power && product.displacement">
                {{ $t('catalog.power') }}: {{ product.power }} {{ $t('catalog.horsepower') }} - {{
                  $t('catalog.displacement') }}: {{ product.displacement }} {{ $t('catalog.cc') }}
              </template>
              <template v-else-if="product.displacement">
                {{ $t('catalog.displacement') }}: {{ product.displacement }} {{ $t('catalog.cc') }}
              </template>
            </p>
            <div class="product-info">
              <span class="product-price">{{ $t('catalog.currency') }}{{ product.price }}{{ $t('catalog.perDay')
              }}</span>
              <div class="product-rating">
                <span v-for="n in 4" :key="n" class="star">★</span>
                <span class="star half">☆</span>
                <small class="rating-text">(4.5)</small>
              </div>
            </div>
          </div>
          <div class="product-footer">
            <router-link :to="{
              name: 'ReservarMoto',
              query: {
                id: index + 1,
                nombre: product.title,
                categoria: 'scooters',
                imagen: product.image,
                precio: product.price,
                potencia: product.power || '0',
                cilindrada: product.displacement,
                rating: '4.5'
              }
            }" class="btn primary">
              {{ $t('catalog.reserve') }}
            </router-link>
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

import scooter1 from '@/assets/img/catalogo motos/scooters/mecha-1-portada-640x0.jpg'
import scooter2 from '@/assets/img/catalogo motos/scooters/morbidelli-sc125re-port-640x0.jpg'
import scooter3 from '@/assets/img/catalogo motos/scooters/honda-forza-125-2026-port-640x0.jpg'
import scooter4 from '@/assets/img/catalogo motos/scooters/lambretta-x-series-125-300sr-port-640x0.jpg'
import scooter5 from '@/assets/img/catalogo motos/scooters/letbe-island-125-2025-port-2-640x0.jpg'
import scooter6 from '@/assets/img/catalogo motos/scooters/letbe-neon-125-port-640x0.jpg'
import scooter7 from '@/assets/img/catalogo motos/scooters/voge-sr16-125-2025-port-640x0.jpg'

const products = [
  {
    title: 'LETBE Mecha 125',
    displacement: '125',
    image: scooter1,
    price: '30'
  },
  {
    title: 'Morbidelli SC125RE',
    power: '11',
    displacement: '123.6',
    image: scooter2,
    price: '32'
  },
  {
    title: 'Honda Forza 125 2026',
    power: '14.35',
    displacement: '124.9',
    image: scooter3,
    price: '35'
  },
  {
    title: 'Lambretta X Series 125 - 300SR',
    power: '14.3',
    displacement: '125',
    image: scooter4,
    price: '38'
  },
  {
    title: 'LETBE Island 125',
    power: '12',
    displacement: '125',
    image: scooter5,
    price: '28'
  },
  {
    title: 'LETBE Neon 125',
    power: '12',
    displacement: '125',
    image: scooter6,
    price: '27'
  },
  {
    title: 'VOGE SR16',
    power: '11.5',
    displacement: '125',
    image: scooter7,
    price: '29'
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
