<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <!-- ERROR: Ruta de imagen incorrecta -->
          <img class="rounded-circle mt-5" width="150px" :src="avatarImage">
          <span class="font-weight-bold">{{ nombre }} {{ apellidos }}</span>
          <span class="text-black-50">{{ email }}</span>
          <span></span>
        </div>
      </div>
      <div class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">{{ $t('profile.title') }}</h4>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">{{ $t('auth.firstName') }}</label>
              <input type="text" id="nombre_id" v-model="nombre" class="form-control" :class="validacionNombre"
                @input="validarNombre" />
              <small class="text-danger" v-if="mensajeNombre">{{ mensajeNombre }}</small>
            </div>
            <div class="col-md-6">
              <label class="labels">{{ $t('auth.lastName') }}</label>
              <input type="text" id="apellidos_id" v-model="apellidos" :class="validacionApellidos"
                @input="validarApellidos" class="form-control" />
              <small class="text-danger" v-if="mensajeApellidos">{{ mensajeApellidos }}</small>
            </div>
            <div class="col-md-6">
              <label class="labels">{{ $t('auth.username') }}</label>
              <input type="text" id="usuario_id" class="form-control" v-model="usuario" @input="validarUsuario"
                :class="validacionUsuario" />
              <small class="text-danger" v-if="mensajeUsuario">{{ mensajeUsuario }}</small>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-6">
              <label class="labels">{{ $t('auth.gender') }}</label>
              <select id="sexo_id" v-model="sexo" @change="cambiarAvatar" class="form-control" :class="validacionSexo">
                <option value="" disabled selected>{{ $t('auth.gender') }}</option>
                <option value="male">{{ $t('auth.male') }}</option>
                <option value="female">{{ $t('auth.female') }}</option>
              </select>
              <small class="text-danger" v-if="mensajeSexo">{{ mensajeSexo }}</small>
            </div>
            <div class="col-md-6">
              <label class="labels">{{ $t('auth.age') }}</label>
              <input type="number" id="edad_id" class="form-control" v-model="edad" @input="validarEdad"
                :class="validacionEdad" />
              <small class="text-danger" v-if="mensajeEdad">{{ mensajeEdad }}</small>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <label class="labels">{{ $t('auth.phoneNumber') }}</label>
              <input type="text" id="telefono_id" class="form-control" v-model="telefono" @input="validarTelefono"
                :class="validacionTelefono" />
              <small class="text-danger" v-if="mensajeTelefono">{{ mensajeTelefono }}</small>
            </div>
            <div class="col-md-12">
              <label class="labels">{{ $t('auth.email') }}</label>
              <input type="email" id="email_id" class="form-control" v-model="email" @input="validarEmail"
                :class="validacionEmail" />
              <small class="text-danger" v-if="mensajeEmail">{{ mensajeEmail }}</small>
            </div>
            <div class="col-md-12">
              <label class="labels">{{ $t('auth.municipality') }}</label>
              <select id="municipios_lista" v-model="municipio" @change="validarMunicipio" class="form-control"
                :class="validacionMunicipio">
                <option value="" disabled selected>{{ $t('auth.municipality') }}</option>
                <option v-for="m in municipios" :key="m" :value="m">{{ m }}</option>
              </select>
              <small class="text-danger" v-if="mensajeMunicipio">{{ mensajeMunicipio }}</small>
            </div>
            <div class="col-md-12">
              <label class="labels">{{ $t('auth.idNumber') }}</label>
              <input type="text" id="carnet_id" v-model="carnet" @input="validarCarnet" :class="validacionCarnet"
                class="form-control" maxlength="11" />
              <small class="text-danger" v-if="mensajeCarnet">{{ mensajeCarnet }}</small>
            </div>
          </div>
          <div class="mt-5 text-center">
            <button class="btn btn-primary profile-button" type="button" @click="saveProfile">
              {{ $t('profile.saveButton') }}
            </button>
            <button class="btn btn-primary profile-button separator" type="button" @click="deleteProfile">
              {{ $t('profile.deleteButton') }}
            </button>
            <button class="btn btn-primary profile-button separator" @click="goHome">
              {{ $t('common.cancel') }}
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center experience">
            <span>{{ $t('profile.changePassword') }}</span>
          </div>
          <div class="col-md-12">
            <label class="labels">{{ $t('profile.currentPassword') }}</label>
            <input type="password" id="contrasenya_id" v-model="contrasenya" @input="validarContrasenya"
              :class="validacionContrasenya" class="form-control" />
            <small class="text-danger" v-if="mensajeContrasenya">{{ mensajeContrasenya }}</small>
          </div>
          <div class="col-md-12">
            <label class="labels">{{ $t('profile.newPassword') }}</label>
            <input type="password" id="repetirContrasenya_id" v-model="repetirContrasenya"
              @input="validarRepetirContrasenya" :class="validacionRepetirContrasenya" class="form-control" />
            <small class="text-danger" v-if="mensajeRepetirContrasenya">{{ mensajeRepetirContrasenya }}</small>
          </div>
          <div class="mt-5 text-center">
            <button class="btn btn-primary profile-button" type="button" @click="saveProfile">
              {{ $t('profile.saveButton') }}
            </button>
          </div>
        </div>
      </div>
    </div> <!-- FALTABA CERRAR ESTE DIV -->
  </div>
</template>

<script setup>
import avatarImage from '@/assets/img/cuenta-usuario/icono-perfil-avatar_188544-4755.avif'
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
const { t } = useI18n()

const router = useRouter()

// Función para cargar datos del usuario
function cargarDatosUsuario() {
  try {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userData);

    // Cargar datos en los campos
    nombre.value = user.firstName || '';
    apellidos.value = user.lastName || '';
    usuario.value = user.username || '';
    email.value = user.email || '';
    telefono.value = user.phoneNumber || '';
    edad.value = user.age || '';
    sexo.value = user.sex || '';
    municipio.value = user.municipality || '';
    carnet.value = user.id || ''; // Recuerda que en tu backend id = CI

    console.log('Datos del usuario cargados:', user);

  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
    router.push('/login');
  }
}

// Cargar datos cuando el componente se monta
onMounted(() => {
  cargarDatosUsuario();
});

function goHome() {
  router.push({ name: 'PaginaPrincipal' })
}

// Datos reactivos del perfil
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

function saveProfile() {
  if (validarFormularioCompleto()) {
    // Aquí iría la lógica para guardar el perfil
    console.log('Perfil guardado:', {
      nombre: nombre.value,
      apellidos: apellidos.value,
      usuario: usuario.value,
      email: email.value,
      telefono: telefono.value,
      edad: edad.value,
      sexo: sexo.value,
      municipio: municipio.value,
      carnet: carnet.value
    })
    alert(t('profile.saveSuccess'))
  } else {
    alert(t('validation.formErrors'))
  }
}
</script>

<style scoped>
body {
  background: rgb(99, 39, 120)
}

.form-control:focus {
  box-shadow: none;
  border-color: #BA68C8
}

.profile-button {
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

.separator {
  margin-left: 30px;
}


.profile-button:active {
  background: #682773;
  box-shadow: none
}

.back:hover {
  color: #682773;
  cursor: pointer
}

.labels {
  font-size: 11px
}

.add-experience:hover {
  background: #BA68C8;
  color: #fff;
  cursor: pointer;
  border: solid 1px #BA68C8
}

.valido {
  border-color: #28a745 !important;
}

.invalido {
  border-color: #dc3545 !important;
}

.text-danger {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
