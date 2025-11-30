<template>
  <div>
    <section class="text-center text-lg-start">
      <div class="container py-3 py-md-4">
        <div class="row g-0 align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0 order-2 order-lg-1">
            <div class="card cascading-right bg-body-tertiary" style="backdrop-filter: blur(30px);">
              <div class="card-body p-3 p-md-4 p-lg-5 shadow-5 text-center">
                <h2 class="fw-bold mb-4 mb-md-5">{{ $t('auth.register') }}</h2>
                <form @submit.prevent="registrarUsuario" class="form-register">

                  <div class="form-outline">
                    <input type="text" id="nombre_id" v-model="nombre" class="form-control" :class="validacionNombre"
                      @input="validarNombre" :placeholder="$t('auth.firstName')" />
                    <span class="mensaje" :class="validacionNombre">{{ mensajeNombre }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="text" id="apellidos_id" v-model="apellidos" :class="validacionApellidos"
                      @input="validarApellidos" class="form-control" :placeholder="$t('auth.lastName')" />
                    <span class="mensaje" :class="validacionApellidos">{{ mensajeApellidos }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="text" id="usuario_id" class="form-control" v-model="usuario" @input="validarUsuario"
                      :class="validacionUsuario" :placeholder="$t('auth.username')" />
                    <span class="mensaje" :class="validacionUsuario">{{ mensajeUsuario }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="email" id="email_id" class="form-control" v-model="email" @input="validarEmail"
                      :class="validacionEmail" :placeholder="$t('auth.email')" />
                    <span class="mensaje" :class="validacionEmail">{{ mensajeEmail }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="text" id="telefono_id" class="form-control" v-model="telefono" @input="validarTelefono"
                      :class="validacionTelefono" :placeholder="$t('auth.phoneNumber')" />
                    <span class="mensaje" :class="validacionTelefono">{{ mensajeTelefono }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="number" id="edad_id" class="form-control" v-model="edad" @input="validarEdad"
                      :class="validacionEdad" :placeholder="$t('auth.age')" />
                    <span class="mensaje" :class="validacionEdad">{{ mensajeEdad }}</span>
                  </div>

                  <div class="form-outline">
                    <select id="sexo_id" v-model="sexo" :class="validacionSexo" @change="validarSexo"
                      class="form-control">
                      <option value="" disabled selected>{{ $t('auth.gender') }}</option>
                      <option value="Male">{{ $t('auth.male') }}</option>
                      <option value="Female">{{ $t('auth.female') }}</option>
                    </select>
                    <span class="mensaje" :class="validacionSexo">{{ mensajeSexo }}</span>
                  </div>

                  <div class="form-outline">
                    <select id="municipios_lista" v-model="municipio" :class="validacionMunicipio"
                      @change="validarMunicipio" class="form-control">
                      <option value="" disabled selected>{{ $t('auth.municipality') }}</option>
                      <option v-for="m in municipios" :key="m" :value="m">{{ m }}</option>
                    </select>
                    <span class="mensaje" :class="validacionMunicipio">{{ mensajeMunicipio }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="text" id="carnet_id" v-model="carnet" @input="validarCarnet" :class="validacionCarnet"
                      class="form-control" :placeholder="$t('auth.idNumber')" maxlength="11" />
                    <span class="mensaje" :class="validacionCarnet">{{ mensajeCarnet }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="password" id="contrasenya_id" v-model="contrasenya" @input="validarContrasenya"
                      class="form-control" :class="validacionContrasenya" :placeholder="$t('auth.password')" />
                    <span class="mensaje" :class="validacionContrasenya">{{ mensajeContrasenya }}</span>
                  </div>

                  <div class="form-outline">
                    <input type="password" id="repetir_contrasenya_id" v-model="repetirContrasenya"
                      @input="validarRepetirContrasenya" class="form-control" :class="validacionRepetirContrasenya"
                      :placeholder="$t('auth.repeatPassword')" />
                    <span class="mensaje" :class="validacionRepetirContrasenya">{{ mensajeRepetirContrasenya }}</span>
                  </div>

                  <div class="d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-center mt-4">
                    <button type="submit" class="btn btn-primary btn-block flex-fill">
                      {{ $t('auth.registerButton') }}
                    </button>

                    <button type="button" class="btn btn-primary btn-block flex-fill" @click="volverAlMenu">
                      {{ $t('auth.cancelButton') }}
                    </button>
                  </div>

                  <div class="text-center mt-3 mt-md-4">
                    <p class="mb-0">
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

          <div class="col-lg-6 mb-4 mb-lg-0 order-1 order-lg-2">
            <img src="../assets/img/BMW_Motorcycle_Roads_2020_S_1000_XR_Motorcyclist_591906_600x800.jpg"
              class="w-100 rounded-4 shadow-4 img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const municipios = ref([])
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

const cargarMunicipios = async () => {
  try {
    const response = await fetch('http://localhost:3000/users/municipios')
    if (!response.ok) throw new Error('Error al cargar municipios')
    const data = await response.json()
    municipios.value = data.map(item => item.nombre_mun)
  } catch (err) {
    console.error('Error:', err)
  }
}

onMounted(() => {
  cargarMunicipios()
})

watch([edad, carnet], () => {
  if (edad.value && carnet.value.length === 11) {
    validarCarnet()
  }
})

function volverAlMenu() {
  router.push('/')
}

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
  const añoCarnet = parseInt(carnet.value.substring(0, 2))
  const mesCarnet = parseInt(carnet.value.substring(2, 4))
  const diaCarnet = parseInt(carnet.value.substring(4, 6))
  if (!esFechaValida(añoCarnet, mesCarnet, diaCarnet)) {
    mensajeCarnet.value = t('validation.idNumberInvalidDate')
    validacionCarnet.value = 'invalido'
    return
  }
  if (edad.value && !coincideEdadConCarnet(edad.value, añoCarnet, mesCarnet, diaCarnet)) {
    mensajeCarnet.value = t('validation.idNumberAgeMismatch')
    validacionCarnet.value = 'invalido'
    return
  }
  mensajeCarnet.value = ''
  validacionCarnet.value = 'valido'
}

function esFechaValida(año, mes, dia) {
  if (mes < 1 || mes > 12) return false
  const diasPorMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (dia < 1 || dia > diasPorMes[mes - 1]) return false
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
  let añoNacimiento = añoCarnet > (añoActual % 100) ? 1900 + añoCarnet : 2000 + añoCarnet
  let edadCalculada = añoActual - añoNacimiento
  if (mesActual < mesCarnet || (mesActual === mesCarnet && diaActual < diaCarnet)) {
    edadCalculada--
  }
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
async function registrarUsuario() {
  if (!validarFormularioCompleto()) {
    return;
  }

  try {
    const sexoClienteRegistrar = sexo.value === 'male' ? 'M' : 'F';

    const userData = {
      CI: carnet.value,
      firstName: nombre.value,
      lastName: apellidos.value,
      age: parseInt(edad.value),
      sex: sexoClienteRegistrar,
      phoneNumber: telefono.value,
      municipality: municipio.value,
      email: email.value,
      username: usuario.value,
      password: contrasenya.value,
    };

    console.log('DATOS ENVIADOS:', userData);

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error(data.message || 'El usuario ya existe');
      }
      if (response.status === 400) {
        const errorMsg = data.message?.join?.(', ') || data.message || 'Datos inválidos';
        throw new Error(`Error de validación: ${errorMsg}`);
      }
      throw new Error(data.message || `Error del servidor: ${response.status}`);
    }

    console.log('✅ Usuario creado exitosamente:', data);
    alert('¡Usuario registrado exitosamente!');
    irAIniciarSesion();

  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    alert(`Error: ${error.message}`);
  }
}


function irAIniciarSesion() {
  router.push({ name: 'IniciarSesion' })
}
</script>

<style scoped>
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
    margin-top: 20px;
  }

  .card-body {
    padding: 2rem 1.5rem !important;
  }
}

@media (max-width: 767.98px) {
  .container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .card-body {
    padding: 1.5rem 1rem !important;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 2rem !important;
  }
}

@media (max-width: 575.98px) {
  .container.py-3 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .card-body {
    padding: 1rem 0.75rem !important;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 1.5rem !important;
  }
}

.form-outline {
  margin-bottom: 20px;
}

@media (max-width: 767.98px) {
  .form-outline {
    margin-bottom: 15px;
  }
}

.valido {
  border-color: #28a745 !important;
}

.invalido {
  border-color: #dc3545 !important;
}

.mensaje {
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

@media (max-width: 767.98px) {
  .mensaje {
    font-size: 0.75rem;
  }
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

@media (max-width: 767.98px) {
  .btn {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    min-height: 48px;
  }
}

@media (max-width: 767.98px) {
  select.form-control {
    font-size: 16px;
  }
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.form-register {
  max-height: 70vh;
  overflow-y: auto;
}

@media (max-width: 991.98px) {
  .form-register {
    max-height: none;
    overflow-y: visible;
  }
}
</style>
