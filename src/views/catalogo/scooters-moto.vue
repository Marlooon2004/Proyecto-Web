<template>
  <div class="contenedor-general">
    <div class="popular-products">
      <div class="header">
        <button class="btn btn-link text-danger" @click="goHome" :title="$t('catalog.close')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <h2 class="section-title">{{ $t('catalog.scootersCatalog') }}</h2>

      <!-- Loading state -->
      <div v-if="loading" class="loading">
        <p>{{ $t('catalog.loading') }}</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <!-- Data loaded -->
      <div v-else class="product-grid">
        <div class="product-card" v-for="(product, index) in products" :key="product.id_generated">
          <!-- Usa ruta de imagen desde la base de datos -->
          <img :src="getImageUrl(product.ruta_imagen)" class="product-image" :alt="product.descripcion"
            @error="handleImageError" />
          <div class="product-body">
            <!-- Muestra modelo y marca -->
            <h5 class="product-title">
              {{ product.modelo?.marca?.marca || 'Marca' }} {{ product.modelo?.modelo || 'Modelo' }}
            </h5>
            <p class="product-description">
              <!-- Descripción desde la base de datos -->
              {{ product.descripcion }}
            </p>
            <div class="product-details">
              <span class="detail-item">
                <i class="bi bi-palette"></i> {{ product.color }}
              </span>
              <span class="detail-item">
                <i class="bi bi-speedometer2"></i> {{ product.cantd_km }} km
              </span>
              <span class="detail-item">
                <i class="bi bi-tag"></i> {{ product.situacion }}
              </span>
            </div>
            <div class="product-info">
              <span class="product-price">
                {{ $t('catalog.currency') }}{{ product.costo_dia }}{{ $t('catalog.perDay') }}
              </span>
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
                id: product.id_generated,
                nombre: `${product.modelo?.marca?.marca || ''} ${product.modelo?.modelo || ''}`.trim(),
                categoria: product.categoria,
                imagen: product.ruta_imagen,
                precio: product.costo_dia,
                color: product.color,
                kilometraje: product.cantd_km,
                descripcion: product.descripcion,
                rating: '4.5'
              }
            }" class="btn primary">
              {{ $t('catalog.reserve') }}
            </router-link>
            <button class="btn secondary">♡</button>
          </div>
        </div>
      </div>

      <!-- No data message -->
      <div v-if="!loading && !error && products.length === 0" class="no-data">
        <p>{{ $t('catalog.noScooters') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const products = ref([])
const loading = ref(true)
const error = ref(null)

function goHome() {
  router.push({ name: 'PaginaPrincipal', hash: '#portfolio' })
}

// Función para construir la URL de la imagen
function getImageUrl(imagePath) {
  if (!imagePath) return '/img/placeholder.jpg'

  // Si la ruta es una URL completa, úsala directamente
  if (imagePath.startsWith('http')) {
    return imagePath
  }

  // Si es una ruta relativa, asume que está en assets
  // En producción, podrías servir las imágenes desde tu backend
  return imagePath.startsWith('/') ? imagePath : `/img/${imagePath}`
}

// Función para manejar errores de carga de imágenes
function handleImageError(event) {
  event.target.src = '/img/placeholder.jpg'
}

// Obtener scooters desde el backend
async function fetchScooters() {
  try {
    loading.value = true
    error.value = null

    // Ajusta la URL según tu configuración
    const response = await axios.get('http://localhost:3000/contratos/scooters')

    products.value = response.data

  } catch (err) {
    console.error('Error fetching scooters:', err)

    if (err.response?.status === 404) {
      error.value = 'No se encontraron scooters disponibles.'
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Error al cargar los scooters. Por favor, intente nuevamente.'
    }

    // Para desarrollo, muestra datos de ejemplo si falla la conexión
    if (import.meta.env.DEV) {
      console.warn('Using mock data due to API error')
      products.value = getMockData()
    }

  } finally {
    loading.value = false
  }
}

// Datos de ejemplo para desarrollo
function getMockData() {
  return [
    {
      id_generated: '1',
      matricula: 'ABC123',
      color: 'Rojo',
      cantd_km: 5000,
      modelo: {
        modelo: 'Mecha 125',
        marca: {
          marca: 'LETBE'
        }
      },
      situacion: 'Nueva',
      ruta_imagen: 'catalogo motos/scooters/mecha-1-portada-640x0.jpg',
      descripcion: 'Scooter deportivo con excelente rendimiento urbano',
      categoria: 'Scooters',
      costo_dia: 30
    },
    {
      id_generated: '2',
      matricula: 'DEF456',
      color: 'Azul',
      cantd_km: 3000,
      modelo: {
        modelo: 'Forza 125',
        marca: {
          marca: 'Honda'
        }
      },
      situacion: 'Nueva',
      ruta_imagen: 'catalogo motos/scooters/honda-forza-125-2026-port-640x0.jpg',
      descripcion: 'Scooter premium con tecnología avanzada',
      categoria: 'Scooters',
      costo_dia: 35
    }
  ]
}

onMounted(() => {
  fetchScooters()
})
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
