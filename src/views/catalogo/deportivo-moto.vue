<template>
  <div class="contenedor-general">
    <div class="popular-products">
      <div class="header">
        <button class="btn btn-link text-danger" @click="goHome" :title="$t('catalog.close')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <h2 class="section-title">{{ $t('catalog.sportCatalog') }}</h2>

      <div v-if="loading" class="loading">
        <p>Cargando motos de sport...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>

      <div v-else class="product-grid">
        <div class="product-card" v-for="(product, index) in products" :key="index">
          <img :src="getImageUrl(product.imagen)" class="product-image" :alt="product.modelo" />
          <div class="product-body">
            <h5 class="product-title">{{ product.marca }} {{ product.modelo }}</h5>
            <p class="product-description">{{ product.descripcion }}</p>
            <div class="product-info">
              <span class="product-price">{{ $t('catalog.currency') }}{{ product.costo }}{{ $t('catalog.perDay')
              }}</span>
              <span class="product-price">{{ $t('catalog.disponibility') }}{{ product.situacion }} </span>
            </div>
          </div>
          <div class="product-footer">
            <!-- Solo motos "Libre" pueden reservar -->
            <router-link v-if="product.situacion === 'Libre'" :to="{
              name: 'ReservarMoto',
              query: {
                id: product.id,
                marca: product.marca,
                modelo: product.modelo,
                categoria: product.categoria,
                imagen: product.imagen,
                precio: product.costo,
                descripcion: product.descripcion,
                situacion: product.situacion,
              }
            }" class="btn primary">
              {{ $t('catalog.reserve') }}
            </router-link>

            <!-- Para motos en Taller o Alquiladas, mostrar botón deshabilitado -->
            <button v-else class="btn primary-not" :disabled="true" :title="getTooltip(product.situacion)">
              {{ $t('catalog.reserve') }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="!loading && !error && products.length === 0" class="no-data">
        <p>No se encontraron motos de categoria sport disponibles</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Método para tooltip del botón deshabilitado
function getTooltip(situacion) {
  switch (situacion) {
    case 'Taller':
      return 'Moto en taller - No disponible para reserva';
    case 'Alquilada':
      return 'Moto actualmente alquilada';
    default:
      return 'No disponible para reserva';
  }
}

function goHome() {
  router.push({ name: 'PaginaPrincipal', hash: '#portfolio' })
}

function getImageUrl(imagePath) {
  const baseUrl = import.meta.env.BASE_URL || '/Proyecto-Web/'

  if (!imagePath || imagePath.trim() === '') {
    return baseUrl + 'img/placeholder.png'
  }

  let cleanPath = imagePath

  if (cleanPath.startsWith(baseUrl)) {
    cleanPath = cleanPath.substring(baseUrl.length)
  }

  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1)
  }

  return baseUrl + cleanPath
}

async function cargarMotosSports() {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`http://localhost:3000/contratos/sports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        products.value = []
        error.value = 'No se encontraron motos de categoria sports'
        return
      }
      throw new Error(`Error ${response.status}: ${await response.text()}`)
    }

    const dataSports = await response.json()
    console.log('Datos recibidos del backend:', dataSports)

    products.value = dataSports.map((moto, index) => {
      let situacion = moto.situacion || 'No especificado';

      if (situacion === 'L') {
        situacion = 'Libre';
      } else if (situacion === 'A') {
        situacion = 'Alquilada';
      } else {
        situacion = 'Taller';
      }

      return {
        id: moto.id_generated || `custom-${index}`,
        marca: moto.marca || 'Marca no disponible',
        modelo: moto.modelo || 'Modelo no disponible',
        descripcion: moto.descripcion || 'Descripción no disponible',
        imagen: moto.ruta_imagen || '',
        costo: moto.costo_dia || moto.price || '0',
        categoria: moto.categoria || 'Custom',
        color: moto.color || 'No especificado',
        cantd_km: moto.cantd_km || 0,
        situacion: situacion
      };
    });

  } catch (err) {
    console.error('Error cargando motos de categoria sports:', err)
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  cargarMotosSports()
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
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn.primary {
  background-color: #007bff;
  color: white;
}

.btn.primary:hover {
  background-color: #0056b3;
}

.btn.primary-not {
  background-color: #ff0000;
  color: white;
  cursor: not-allowed;
  opacity: 0.6;
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
