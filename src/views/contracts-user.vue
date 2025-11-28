<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body text-center">
          <h5 class="card-title m-b-0">{{ displayTitle }}</h5>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">{{ $t('contracts.registration') }}</th>
                <th scope="col">{{ $t('contracts.startDate') }}</th>
                <th scope="col">{{ $t('contracts.endDate') }}</th>
                <th scope="col">{{ $t('contracts.extensionDays') }}</th>
                <th scope="col">{{ $t('contracts.paymentMethod') }}</th>
                <th scope="col">{{ $t('contracts.insurance') }}</th>
              </tr>
            </thead>
            <tbody class="customtable">
              <tr v-for="(contract, index) in contracts" :key="index">
                <td>{{ contract.registration }}</td>
                <td>{{ formatDate(contract.startDate) }}</td>
                <td>{{ formatDate(contract.endDate) }}</td>
                <td>{{ contract.extensionDays }}</td>
                <td>
                  <span :class="getPaymentMethodClass(contract.paymentMethod)">
                    {{ $t(`contracts.${contract.paymentMethod}`) }}
                  </span>
                </td>
                <td>
                  <span :class="getInsuranceClass(contract.insurance)">
                    {{ $t(`contracts.${contract.insurance ? 'yes' : 'no'}`) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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

<script>
export default {
  name: 'ContractsTable',
  props: {
    title: {
      type: String,
      default: 'contracts.title'
    },
    contracts: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    displayTitle() {
      return this.$t(this.title)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES')
    },
    getPaymentMethodClass(method) {
      return {
        'badge badge-success': method === 'card',
        'badge badge-primary': method === 'cash'
      }
    },
    getInsuranceClass(hasInsurance) {
      return {
        'badge badge-success': hasInsurance,
        'badge badge-secondary': !hasInsurance
      }
    },
    goToProfile() {
      this.$router.push({ name: 'CuentaUsuario' })
    }
  }
}
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
