<template>
  <div>
    <section class="text-center text-lg-start">
      <div class="container py-4">
        <div class="row g-0 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card cascading-right bg-body-tertiary" style="backdrop-filter: blur(30px);">
              <div class="card-body p-5 shadow-5 text-center">
                <h2 class="fw-bold mb-5">{{ $t('auth.register') }}</h2>
                <form @submit.prevent="registrarUsuario">

                  <!-- Nombre -->
                  <div class="form-outline">
                    <input type="text" id="nombre_id" v-model="nombre" class="form-control" :class="validacionNombre"
                      @input="validarNombre" :placeholder="$t('auth.firstName')" />
                    <span class="mensaje" :class="validacionNombre">{{ mensajeNombre }}</span>
                  </div>

                  <!-- Apellidos -->
                  <div class="form-outline">
                    <input type="text" id="apellidos_id" v-model="apellidos" :class="validacionApellidos"
                      @input="validarApellidos" class="form-control" :placeholder="$t('auth.lastName')" />
                    <span class="mensaje" :class="validacionApellidos">{{ mensajeApellidos }}</span>
                  </div>

                  <!-- Usuario -->
                  <div class="form-outline">
                    <input type="text" id="usuario_id" class="form-control" v-model="usuario" @input="validarUsuario"
                      :class="validacionUsuario" :placeholder="$t('auth.username')" />
                    <span class="mensaje" :class="validacionUsuario">{{ mensajeUsuario }}</span>
                  </div>

                  <!-- Email -->
                  <div class="form-outline">
                    <input type="email" id="email_id" class="form-control" v-model="email" @input="validarEmail"
                      :class="validacionEmail" :placeholder="$t('auth.email')" />
                    <span class="mensaje" :class="validacionEmail">{{ mensajeEmail }}</span>
                  </div>

                  <!-- Teléfono -->
                  <div class="form-outline">
                    <input type="text" id="telefono_id" class="form-control" v-model="telefono" @input="validarTelefono"
                      :class="validacionTelefono" :placeholder="$t('auth.phoneNumber')" />
                    <span class="mensaje" :class="validacionTelefono">{{ mensajeTelefono }}</span>
                  </div>

                  <!-- Edad -->
                  <div class="form-outline">
                    <input type="number" id="edad_id" class="form-control" v-model="edad" @input="validarEdad"
                      :class="validacionEdad" :placeholder="$t('auth.age')" />
                    <span class="mensaje" :class="validacionEdad">{{ mensajeEdad }}</span>
                  </div>

                  <!-- Sexo -->
                  <div class="form-outline">
                    <select id="sexo_id" v-model="sexo" :class="validacionSexo" @change="validarSexo"
                      class="form-control">
                      <option value="" disabled selected>{{ $t('auth.gender') }}</option>
                      <option value="male">{{ $t('auth.male') }}</option>
                      <option value="female">{{ $t('auth.female') }}</option>
                    </select>
                    <span class="mensaje" :class="validacionSexo">{{ mensajeSexo }}</span>
                  </div>

                  <!-- Municipio -->
                  <div class="form-outline">
                    <select id="municipios_lista" v-model="municipio" :class="validacionMunicipio"
                      @change="validarMunicipio" class="form-control">
                      <option value="" disabled selected>{{ $t('auth.municipality') }}</option>
                      <option v-for="m in municipios" :key="m" :value="m">{{ m }}</option>
                    </select>
                    <span class="mensaje" :class="validacionMunicipio">{{ mensajeMunicipio }}</span>
                  </div>

                  <!-- Carnet de Identidad -->
                  <div class="form-outline">
                    <input type="text" id="carnet_id" v-model="carnet" @input="validarCarnet" :class="validacionCarnet"
                      class="form-control" :placeholder="$t('auth.idNumber')" maxlength="11" />
                    <span class="mensaje" :class="validacionCarnet">{{ mensajeCarnet }}</span>
                  </div>

                  <!-- Contraseña -->
                  <div class="form-outline">
                    <input type="password" id="contrasenya_id" v-model="contrasenya" @input="validarContrasenya"
                      class="form-control" :class="validacionContrasenya" :placeholder="$t('auth.password')" />
                    <span class="mensaje" :class="validacionContrasenya">{{ mensajeContrasenya }}</span>
                  </div>

                  <!-- Repetir Contraseña -->
                  <div class="form-outline">
                    <input type="password" id="repetir_contrasenya_id" v-model="repetirContrasenya"
                      @input="validarRepetirContrasenya" class="form-control" :class="validacionRepetirContrasenya"
                      :placeholder="$t('auth.repeatPassword')" />
                    <span class="mensaje" :class="validacionRepetirContrasenya">{{ mensajeRepetirContrasenya }}</span>
                  </div>

                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary btn-block mb-4 boton_class">
                    {{ $t('auth.registerButton') }}
                  </button>

                  <button type="button" class="btn btn-primary btn-block mb-4" @click="volverAlMenu">
                    {{ $t('auth.cancelButton') }}
                  </button>

                  <div class="text-center">
                    <p>
                      {{ $t('auth.hasAccount') }}
                      <router-link to="/iniciar-sesion">
                        {{ $t('auth.loginHere') }}
                      </router-link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <img src="../assets/img/BMW_Motorcycle_Roads_2020_S_1000_XR_Motorcyclist_591906_600x800.jpg"
              class="w-100 rounded-4 shadow-4" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

// Datos reactivos
const nombre = ref('')
const apellidos = ref('')
const usuario = ref('')
const email = ref('')
const telefono = ref('')
const edad = ref('')
const sexo = ref('')
const municipio = ref('')
const carnet = ref('')
const contrasenya = ref('')
const repetirContrasenya = ref('')

// Mensajes y validaciones
const mensajeNombre = ref('')
const mensajeApellidos = ref('')
const mensajeUsuario = ref('')
const mensajeEmail = ref('')
const mensajeTelefono = ref('')
const mensajeEdad = ref('')
const mensajeSexo = ref('')
const mensajeMunicipio = ref('')
const mensajeCarnet = ref('')
const mensajeContrasenya = ref('')
const mensajeRepetirContrasenya = ref('')

const validacionNombre = ref('')
const validacionApellidos = ref('')
const validacionUsuario = ref('')
const validacionEmail = ref('')
const validacionTelefono = ref('')
const validacionEdad = ref('')
const validacionSexo = ref('')
const validacionMunicipio = ref('')
const validacionCarnet = ref('')
const validacionContrasenya = ref('')
const validacionRepetirContrasenya = ref('')

// Municipios de La Habana
const municipios = ref([
  'Arroyo Naranjo',
  'Boyeros',
  'Centro Habana',
  'Cerro',
  'Cotorro',
  'Diez de Octubre',
  'Guanabacoa',
  'Habana del Este',
  'Habana Vieja',
  'La Lisa',
  'Marianao',
  'Playa',
  'Plaza de la Revolución',
  'Regla',
  'San Miguel del Padrón'
])

// Watch para validar carnet cuando cambia la edad y viceversa
watch([edad, carnet], () => {
  if (edad.value && carnet.value.length === 11) {
    validarCarnet()
  }
})

// Funciones de validación
function validarNombre() {
  if (!nombre.value) {
    mensajeNombre.value = t('validation.requiredField')
    validacionNombre.value = 'invalido'
  } else if (nombre.value.length < 2) {
    mensajeNombre.value = t('validation.nameMinLength')
    validacionNombre.value = 'invalido'
  } else {
    mensajeNombre.value = ''
    validacionNombre.value = 'valido'
  }
}

function validarApellidos() {
  if (!apellidos.value) {
    mensajeApellidos.value = t('validation.requiredField')
    validacionApellidos.value = 'invalido'
  } else if (apellidos.value.length < 2) {
    mensajeApellidos.value = t('validation.lastNameMinLength')
    validacionApellidos.value = 'invalido'
  } else {
    mensajeApellidos.value = ''
    validacionApellidos.value = 'valido'
  }
}

function validarUsuario() {
  const regex = /^[a-zA-Z0-9@._-]{3,}$/
  if (!usuario.value) {
    mensajeUsuario.value = t('validation.requiredField')
    validacionUsuario.value = 'invalido'
  } else if (!regex.test(usuario.value)) {
    mensajeUsuario.value = t('validation.usernameRules')
    validacionUsuario.value = 'invalido'
  } else {
    mensajeUsuario.value = ''
    validacionUsuario.value = 'valido'
  }
}

function validarEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    mensajeEmail.value = t('validation.requiredField')
    validacionEmail.value = 'invalido'
  } else if (!regex.test(email.value)) {
    mensajeEmail.value = t('validation.emailInvalid')
    validacionEmail.value = 'invalido'
  } else {
    mensajeEmail.value = ''
    validacionEmail.value = 'valido'
  }
}

function validarTelefono() {
  // Solo permite números
  telefono.value = telefono.value.replace(/\D/g, '')

  if (!telefono.value) {
    mensajeTelefono.value = t('validation.requiredField')
    validacionTelefono.value = 'invalido'
  } else if (telefono.value.length !== 8) {
    mensajeTelefono.value = t('validation.phoneLength')
    validacionTelefono.value = 'invalido'
  } else {
    mensajeTelefono.value = ''
    validacionTelefono.value = 'valido'
  }
}

function validarEdad() {
  if (!edad.value) {
    mensajeEdad.value = t('validation.requiredField')
    validacionEdad.value = 'invalido'
  } else if (edad.value < 18) {
    mensajeEdad.value = t('validation.minAge')
    validacionEdad.value = 'invalido'
  } else if (edad.value > 120) {
    mensajeEdad.value = t('validation.maxAge')
    validacionEdad.value = 'invalido'
  } else {
    mensajeEdad.value = ''
    validacionEdad.value = 'valido'
  }
}

function validarSexo() {
  if (!sexo.value) {
    mensajeSexo.value = t('validation.requiredField')
    validacionSexo.value = 'invalido'
  } else {
    mensajeSexo.value = ''
    validacionSexo.value = 'valido'
  }
}

function validarMunicipio() {
  if (!municipio.value) {
    mensajeMunicipio.value = t('validation.requiredField')
    validacionMunicipio.value = 'invalido'
  } else {
    mensajeMunicipio.value = ''
    validacionMunicipio.value = 'valido'
  }
}

function validarCarnet() {
  // Solo permite números
  carnet.value = carnet.value.replace(/\D/g, '')

  if (!carnet.value) {
    mensajeCarnet.value = t('validation.requiredField')
    validacionCarnet.value = 'invalido'
    return
  }

  if (carnet.value.length !== 11) {
    mensajeCarnet.value = t('validation.idNumberLength')
    validacionCarnet.value = 'invalido'
    return
  }

  // Extraer componentes de la fecha del carnet
  const añoCarnet = parseInt(carnet.value.substring(0, 2))
  const mesCarnet = parseInt(carnet.value.substring(2, 4))
  const diaCarnet = parseInt(carnet.value.substring(4, 6))

  // Validar fecha
  if (!esFechaValida(añoCarnet, mesCarnet, diaCarnet)) {
    mensajeCarnet.value = t('validation.idNumberInvalidDate')
    validacionCarnet.value = 'invalido'
    return
  }

  // Validar coincidencia EXACTA con la edad
  if (edad.value && !coincideEdadConCarnet(edad.value, añoCarnet, mesCarnet, diaCarnet)) {
    mensajeCarnet.value = t('validation.idNumberAgeMismatch')
    validacionCarnet.value = 'invalido'
    return
  }

  mensajeCarnet.value = ''
  validacionCarnet.value = 'valido'
}

function esFechaValida(año, mes, dia) {
  // Validar mes
  if (mes < 1 || mes > 12) return false

  // Validar día
  const diasPorMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (dia < 1 || dia > diasPorMes[mes - 1]) return false

  // Validar febrero en años no bisiestos
  if (mes === 2 && dia === 29) {
    const añoCompleto = año <= new Date().getFullYear() % 100 ? 2000 + año : 1900 + año
    if (!esBisiesto(añoCompleto)) return false
  }

  return true
}

function esBisiesto(año) {
  return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0)
}

function coincideEdadConCarnet(edad, añoCarnet, mesCarnet, diaCarnet) {
  const ahora = new Date()
  const añoActual = ahora.getFullYear()
  const mesActual = ahora.getMonth() + 1
  const diaActual = ahora.getDate()

  // Determinar el siglo (1900 o 2000)
  // Si el año del carnet es mayor que el año actual en 2 dígitos, es 1900, sino 2000
  let añoNacimiento = añoCarnet > (añoActual % 100) ? 1900 + añoCarnet : 2000 + añoCarnet

  // Calcular edad exacta basada en el carnet
  let edadCalculada = añoActual - añoNacimiento

  // Ajustar si aún no ha cumplido años este año
  if (mesActual < mesCarnet || (mesActual === mesCarnet && diaActual < diaCarnet)) {
    edadCalculada--
  }

  // Validación EXACTA - sin tolerancia
  return edadCalculada === parseInt(edad)
}

function validarContrasenya() {
  const regex = /^(?=.*\d).{8,}$/
  if (!contrasenya.value) {
    mensajeContrasenya.value = t('validation.requiredField')
    validacionContrasenya.value = 'invalido'
  } else if (!regex.test(contrasenya.value)) {
    mensajeContrasenya.value = t('validation.passwordRules')
    validacionContrasenya.value = 'invalido'
  } else {
    mensajeContrasenya.value = ''
    validacionContrasenya.value = 'valido'
  }
  // Validar también la contraseña repetida cuando cambia la original
  validarRepetirContrasenya()
}

function validarRepetirContrasenya() {
  if (!repetirContrasenya.value) {
    mensajeRepetirContrasenya.value = t('validation.requiredField')
    validacionRepetirContrasenya.value = 'invalido'
  } else if (repetirContrasenya.value !== contrasenya.value) {
    mensajeRepetirContrasenya.value = t('validation.passwordsMustMatch')
    validacionRepetirContrasenya.value = 'invalido'
  } else {
    mensajeRepetirContrasenya.value = ''
    validacionRepetirContrasenya.value = 'valido'
  }
}

function validarFormularioCompleto() {
  validarNombre()
  validarApellidos()
  validarUsuario()
  validarEmail()
  validarTelefono()
  validarEdad()
  validarSexo()
  validarMunicipio()
  validarCarnet()
  validarContrasenya()
  validarRepetirContrasenya()

  return (
    validacionNombre.value === 'valido' &&
    validacionApellidos.value === 'valido' &&
    validacionUsuario.value === 'valido' &&
    validacionEmail.value === 'valido' &&
    validacionTelefono.value === 'valido' &&
    validacionEdad.value === 'valido' &&
    validacionSexo.value === 'valido' &&
    validacionMunicipio.value === 'valido' &&
    validacionCarnet.value === 'valido' &&
    validacionContrasenya.value === 'valido' &&
    validacionRepetirContrasenya.value === 'valido'
  )
}

function registrarUsuario() {
  if (validarFormularioCompleto()) {
    alert(t('auth.registerSuccess'))
    volverAlMenu()
  }
}

function volverAlMenu() {
  router.push('/')
}
</script>

<style scoped>
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}

.form-outline {
  margin-bottom: 30px;
}

.boton_class {
  margin-right: 70px;
}

.valido {
  border-color: #28a745 !important;
}

.invalido {
  border-color: #dc3545 !important;
}

.mensaje {
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.valido.mensaje {
  color: #28a745;
}

.invalido.mensaje {
  color: #dc3545;
}

.mensaje:empty {
  display: none;
}
</style>
