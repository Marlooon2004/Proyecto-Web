<template>
  <div>
    <section class="text-center text-lg-start">
      <div class="container py-4">
        <div class="row g-0 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card cascading-right bg-body-tertiary" style="backdrop-filter: blur(30px);">
              <div class="card-body p-5 shadow-5 text-center">
                <h2 class="fw-bold mb-5">{{ $t('auth.login') }}</h2>
                <form @submit.prevent="iniciarSesion">

                  <!-- Username input -->
                  <div class="form-outline">
                    <input type="text" id="usuario_id" class="form-control" v-model="usuario" @input="validarUsuario"
                      :class="validacionUsuario" :placeholder="$t('auth.username')" />
                    <span class="mensaje" :class="validacionUsuario">{{ mensajeUsuario }}</span>
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <input type="password" id="contrasenya_id" v-model="contrasenya" @input="validarContrasenya"
                      class="form-control" :class="validacionContrasenya" :placeholder="$t('auth.password')" />
                    <span class="mensaje" :class="validacionContrasenya">{{ mensajeContrasenya }}</span>
                  </div>

                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary btn-block mb-4 boton_class">
                    {{ $t('auth.loginButton') }}
                  </button>

                  <button type="button" class="btn btn-primary btn-block mb-4" @click="volverAlMenu">
                    {{ $t('auth.cancelButton') }}
                  </button>

                  <div class="text-center">
                    <p>
                      {{ $t('auth.noAccount') }}
                      <router-link to="/registrar-cliente">
                        {{ $t('auth.registerHere') }}
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const usuario = ref('')
const contrasenya = ref('')
const mensajeUsuario = ref('')
const mensajeContrasenya = ref('')
const validacionUsuario = ref('')
const validacionContrasenya = ref('')

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
}

function iniciarSesion() {
  validarUsuario()
  validarContrasenya()
  if (validacionUsuario.value === 'valido' && validacionContrasenya.value === 'valido') {
    alert(t('auth.loginSuccess'))
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
</style>
