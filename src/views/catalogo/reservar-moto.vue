<template>
  <div class="container d-flex justify-content-center">
    <figure class="card card-product-grid card-lg">
      <!-- Imagen de la moto -->
      <a href="#" class="img-wrap" data-abc="true">
        <img :src="motoData.imagen" :alt="motoData.nombre">
      </a>

      <!-- Información de la moto -->
      <figcaption class="info-wrap">
        <div class="row">
          <div class="col-md-9 col-xs-9">
            <a href="#" class="title" data-abc="true">{{ motoData.nombre }}</a>
          </div>
          <div class="col-md-3 col-xs-3">
            <div class="rating text-right">
              <i class="fa fa-star" v-for="n in 5" :key="n"
                :class="{ 'fa-star': n <= motoData.rating, 'fa-star-o': n > motoData.rating }"></i>
              <span class="rated">{{ $t('catalog.rating') }} {{ motoData.rating }}/5</span>
            </div>
          </div>
        </div>
      </figcaption>

      <!-- Especificaciones técnicas -->
      <div class="specs-wrap p-3">
        <div class="row text-center">
          <div class="col-4">
            <small class="text-muted d-block">{{ $t('catalog.power') }}</small>
            <strong>{{ motoData.potencia }} {{ $t('catalog.horsepower') }}</strong>
          </div>
          <div class="col-4">
            <small class="text-muted d-block">{{ $t('catalog.displacement') }}</small>
            <strong>{{ motoData.cilindrada }} {{ $t('catalog.cc') }}</strong>
          </div>
          <div class="col-4">
            <small class="text-muted d-block">{{ $t('reservation.price') }}</small>
            <strong>{{ $t('catalog.currency') }}{{ motoData.precio }} {{ $t('catalog.perDay') }}</strong>
          </div>
        </div>
      </div>

      <!-- Formulario de reserva -->
      <div class="reservation-form p-3">
        <h6 class="mb-3">{{ $t('reservation.title') }}</h6>

        <!-- Fechas -->
        <div class="form-group">
          <label class="small">{{ $t('reservation.startDate') }}</label>
          <input type="date" v-model="fechaInicio" class="form-control" :min="fechaHoy">
        </div>

        <div class="form-group">
          <label class="small">{{ $t('reservation.endDate') }}</label>
          <input type="date" v-model="fechaFin" class="form-control" :min="fechaInicio || fechaHoy">
        </div>

        <!-- Seguro -->
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="seguro" id="seguroCheck">
            <label class="form-check-label small" for="seguroCheck">
              {{ $t('reservation.includeInsurance') }} (+{{ $t('catalog.currency') }}50)
            </label>
          </div>
        </div>

        <!-- Forma de pago -->
        <div class="form-group">
          <label class="small">{{ $t('reservation.paymentMethod') }}</label>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" v-model="formaPago" value="efectivo" id="efectivo">
              <label class="form-check-label small" for="efectivo">{{ $t('reservation.cash') }}</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" v-model="formaPago" value="tarjeta" id="tarjeta">
              <label class="form-check-label small" for="tarjeta">{{ $t('reservation.card') }}</label>
            </div>
          </div>
        </div>

        <!-- Detalles de tarjeta (solo si selecciona tarjeta) -->
        <div v-if="formaPago === 'tarjeta'" class="card-details p-3 bg-light rounded mb-3">
          <div class="form-group">
            <label class="small">{{ $t('reservation.cardNumber') }}</label>
            <input type="text" v-model="numeroTarjeta" class="form-control" placeholder="**** **** **** ****"
              maxlength="19">
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="small">{{ $t('reservation.expiryDate') }}</label>
                <input type="text" v-model="fechaExpiracion" class="form-control" placeholder="MM/AA" maxlength="5">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="small">{{ $t('reservation.cvv') }}</label>
                <input type="text" v-model="cvv" class="form-control" placeholder="***" maxlength="3">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen de pago -->
      <div class="bottom-wrap-payment">
        <div class="info-wrap">
          <div class="row">
            <div class="col-md-9 col-xs-9">
              <a href="#" class="title" data-abc="true">{{ $t('catalog.currency') }}{{ calcularTotal() }}</a>
              <span class="rated">{{ $t('reservation.total') }}</span>
            </div>
            <div class="col-md-3 col-xs-3">
              <div class="rating text-right small">
                {{ formaPago === 'tarjeta' ? '****' : $t('reservation.cash') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="bottom-wrap">
        <button @click="confirmarReserva" class="btn btn-primary float-right" data-abc="true">
          {{ $t('reservation.confirm') }}
        </button>
        <div class="price-wrap">
          <button @click="cancelarReserva" class="btn btn-warning float-left" data-abc="true">
            {{ $t('common.cancel') }}
          </button>
        </div>
      </div>
    </figure>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// Datos de la moto (se pasan por route params)
const motoData = ref({
  id: null,
  nombre: '',
  categoria: '',
  imagen: '',
  precio: 0,
  potencia: 0,
  cilindrada: 0,
  rating: 0
})

// Datos del formulario
const fechaInicio = ref('')
const fechaFin = ref('')
const seguro = ref(true)
const formaPago = ref('efectivo')
const numeroTarjeta = ref('')
const fechaExpiracion = ref('')
const cvv = ref('')

const fechaHoy = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Calcular total CORREGIDO
const calcularTotal = () => {
  if (!fechaInicio.value || !fechaFin.value) return 0

  const inicio = new Date(fechaInicio.value)
  const fin = new Date(fechaFin.value)
  const dias = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1

  if (dias <= 0) return 0

  let total = dias * motoData.value.precio

  // CORRECCIÓN: El seguro se suma una sola vez, no por día
  if (seguro.value) {
    total += 50 // Solo $50 adicionales, no por día
  }

  return total
}

// También puedes calcular el desglose para mostrarlo
const calcularDesglose = () => {
  if (!fechaInicio.value || !fechaFin.value) return null

  const inicio = new Date(fechaInicio.value)
  const fin = new Date(fechaFin.value)
  const dias = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1

  if (dias <= 0) return null

  const costoMoto = dias * motoData.value.precio
  const costoSeguro = seguro.value ? 50 : 0
  const total = costoMoto + costoSeguro

  return {
    dias,
    costoMoto,
    costoSeguro,
    total
  }
}

onMounted(() => {
  motoData.value = {
    id: route.query.id,
    nombre: route.query.nombre,
    categoria: route.query.categoria,
    imagen: route.query.imagen,
    precio: Number(route.query.precio),
    potencia: Number(route.query.potencia),
    cilindrada: Number(route.query.cilindrada),
    rating: Number(route.query.rating)
  }
})

// Confirmar reserva
const confirmarReserva = () => {
  if (!fechaInicio.value || !fechaFin.value) {
    alert(t('reservation.selectDates'))
    return
  }

  if (formaPago.value === 'tarjeta' && (!numeroTarjeta.value || !fechaExpiracion.value || !cvv.value)) {
    alert(t('reservation.completeCardDetails'))
    return
  }

  const desglose = calcularDesglose()
  const reserva = {
    moto: motoData.value,
    fechaInicio: fechaInicio.value,
    fechaFin: fechaFin.value,
    seguro: seguro.value,
    formaPago: formaPago.value,
    dias: desglose?.dias || 0,
    costoMoto: desglose?.costoMoto || 0,
    costoSeguro: desglose?.costoSeguro || 0,
    total: calcularTotal()
  }

  console.log('Reserva confirmada:', reserva)

  alert(t('reservation.success'))
  router.push({ name: 'PaginaPrincipal', hash: '#portfolio' })
}

// Cancelar reserva
const cancelarReserva = () => {
  router.push({ name: 'PaginaPrincipal', hash: '#portfolio' })
}
</script>

<style scoped>
body {
  background-color: #EEEEEE;
}

a {
  text-decoration: none !important;
}

.card-product-list,
.card-product-grid {
  margin-bottom: 0;
}

.card {
  width: 500px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 23px;
  margin-top: 50px;
}

.card-product-grid:hover {
  -webkit-box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
  box-shadow: 0 4px 15px rgba(153, 153, 153, 0.3);
  -webkit-transition: .3s;
  transition: .3s;
}

.card-product-grid .img-wrap {
  border-radius: 0.2rem 0.2rem 0 0;
  height: 220px;
}

.card .img-wrap {
  overflow: hidden;
}

.card-lg .img-wrap {
  height: 280px;
}

.card-product-grid .img-wrap {
  border-radius: 0.2rem 0.2rem 0 0;
  height: 275px;
  padding: 16px;
}

[class*='card-product'] .img-wrap img {
  height: 100%;
  max-width: 100%;
  width: auto;
  display: inline-block;
  -o-object-fit: cover;
  object-fit: cover;
}

.img-wrap {
  text-align: center;
  display: block;
}

.card-product-grid .info-wrap {
  overflow: hidden;
  padding: 18px 20px;
}

[class*='card-product'] a.title {
  color: #212529;
  display: block;
}

.rating-stars {
  display: inline-block;
  vertical-align: middle;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  white-space: nowrap;
  clear: both;
}

.rating-stars li.stars-active {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.rating-stars li {
  display: block;
  text-overflow: clip;
  white-space: nowrap;
  z-index: 1;
}

.card-product-grid .bottom-wrap {
  padding: 18px;
  border-top: 1px solid #e4e4e4;
}

.bottom-wrap-payment {
  padding: 0px;
  border-top: 1px solid #e4e4e4;
}

.rated {
  font-size: 10px;
  color: #b3b4b6;
}

.btn {
  display: inline-block;
  font-weight: 600;
  color: #343a40;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.45rem 0.85rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.btn-primary {
  color: #fff;
  background-color: #3167eb;
  border-color: #3167eb;
}

.fa {
  color: #FF5722;
}

.specs-wrap {
  border-bottom: 1px solid #e4e4e4;
}

.reservation-form {
  border-bottom: 1px solid #e4e4e4;
}

.card-details {
  background-color: #f8f9fa !important;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  font-size: 0.875rem;
}

.small {
  font-size: 0.875rem;
}
</style>
