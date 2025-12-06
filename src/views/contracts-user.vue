<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center">
            <h4 class="card-title m-b-0">{{ $t('contracts.myContracts') }}</h4>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">{{ $t('contracts.registration') }}</th>
                  <th scope="col">{{ $t('contracts.motorcycle') }}</th>
                  <th scope="col">{{ $t('contracts.startDate') }}</th>
                  <th scope="col">{{ $t('contracts.endDate') }}</th>
                  <th scope="col">{{ $t('contracts.extensionDays') }}</th>
                  <th scope="col">{{ $t('contracts.paymentMethod') }}</th>
                  <th scope="col">{{ $t('contracts.insurance') }}</th>
                  <th scope="col">{{ $t('contracts.status') }}</th>
                </tr>
              </thead>
              <tbody class="customtable">
                <tr v-for="(contract, index) in contratos" :key="index">
                  <td>{{ contract.matricula }}</td>
                  <td>
                    <div class="moto-info">
                      <strong>{{ contract.marca }}</strong> {{ contract.modelo }}
                    </div>
                  </td>
                  <td>{{ formatDate(contract.fechaInicio) }}</td>
                  <td>{{ formatDate(contract.fechaFin) }}</td>
                  <td>{{ contract.diasProrroga }}</td>
                  <td>
                    <span :class="getPaymentMethodClass(contract.formaPago)">
                      {{ getPaymentMethodText(contract.formaPago) }}
                    </span>
                  </td>
                  <td>
                    <span :class="getInsuranceClass(contract.seguro)">
                      {{ getInsuranceText(contract.seguro) }}
                    </span>
                  </td>
                  <td>
                    <span :class="getStatusClass(contract.activo)">
                      {{ getStatusText(contract.activo) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="contratos.length === 0 && !cargando" class="text-center p-4">
            <p>{{ $t('contracts.noContracts') }}</p>
          </div>
          <div v-if="cargando" class="text-center p-4">
            <p>{{ $t('common.loading') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center">
      <button class="btn btn-primary profile-button" type="button" @click="goToProfile">
        {{ $t('contracts.cancel') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const contratos = ref([])
const cargando = ref(false)

async function cargarContratos() {
  try {
    cargando.value = true

    const userResponse = await fetch('http://localhost:3000/auth/me', {
      method: 'GET',
      credentials: 'include'
    });

    if (!userResponse.ok) {
      throw new Error('No se encuentra autenticado');
    }

    const userData = await userResponse.json();
    const usuarioId = userData.user.id_generated || userData.user.userId;


    const response = await fetch(`http://localhost:3000/contratos/${usuarioId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.log('No se encontraron contratos')
        contratos.value = []
        return
      }
      throw new Error(`Error ${response.status}: ${await response.text()}`)
    }

    const datosContratos = await response.json()
    console.log('Contratos cargados:', datosContratos)

    contratos.value = datosContratos.map(contrato => ({
      matricula: contrato.moto?.matricula || '-',
      marca: contrato.moto?.modelo?.marca?.marca || '-',
      modelo: contrato.moto?.modelo?.modelo || '-',
      fechaInicio: contrato.fecha_inicio,
      fechaFin: contrato.fecha_fin,
      diasProrroga: contrato.dias_prorroga || 0,
      formaPago: contrato.forma_pago,
      seguro: contrato.seguro,
      activo: contrato.contrato_activo,
      tarifaContrato: contrato.tarifa?.tarifa_contrato + contrato.tarifa?.tarifa_prorroga || 0
    }))

  } catch (error) {
    console.error('Error cargando contratos:', error)
    contratos.value = []

    if (error.message.includes('token') || error.message.includes('autenticación')) {
      localStorage.removeItem('token')
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      router.push({ name: 'IniciarSesion' })
    }
  } finally {
    cargando.value = false
  }
}

function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

function getPaymentMethodClass(metodo) {
  const clases = {
    'T': 'badge bg-success',
    'E': 'badge bg-primary',
    'C': 'badge bg-warning'
  }
  return clases[metodo] || 'badge bg-secondary'
}

function getPaymentMethodText(metodo) {
  const metodos = {
    'T': t('contracts.transfer'),
    'E': t('contracts.cash'),
    'C': t('contracts.creditCard')
  }
  return metodos[metodo] || metodo
}

function getInsuranceClass(seguro) {
  return seguro === 'Y' || seguro === 'S' ? 'badge bg-success' : 'badge bg-danger'
}

function getInsuranceText(seguro) {
  return seguro === 'Y' || seguro === 'S' ? t('contracts.yes') : t('contracts.no')
}

function getStatusClass(activo) {
  return activo ? 'badge bg-success' : 'badge bg-danger'
}

function getStatusText(activo) {
  return activo ? t('contracts.active') : t('contracts.inactive')
}

function goToProfile() {
  router.back()
}

onMounted(() => {
  cargarContratos()
})
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Calibri:400,300,700);

.container {
  margin-top: 100px;
}

.profile-button {
  min-width: 140px;
  margin: 5px;
  flex-shrink: 0;
  background: rgb(99, 39, 120);
  box-shadow: none;
  border: none
}

.profile-button:hover {
  background: #682773
}

.profile-button:focus {
  background: #682773;
  box-shadow: none
}

.profile-button:active {
  background: #682773;
  box-shadow: none
}

.card {
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
  border: 0px solid transparent;
  border-radius: 0px;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
}

.card .card-title {
  position: relative;
  font-weight: 600;
  margin-bottom: 10px;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

* {
  outline: none;
}

.table th,
.table thead th {
  font-weight: 500;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table th {
  padding: 1rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table th,
.table thead th {
  font-weight: 500;
}

th {
  text-align: inherit;
}

.customtable tr:hover {
  background-color: #f8f9fa;
}

.badge {
  padding: 0.4em 0.6em;
  font-size: 0.85em;
  font-weight: 500;
}
</style>
