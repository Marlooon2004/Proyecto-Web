<template>
  <div>
    <section class="text-center text-lg-start">
      <div class="container py-4">
        <div class="row g-0 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0 order-2 order-lg-1">
            <div class="card cascading-right bg-body-tertiary" style="backdrop-filter: blur(30px);">
              <div class="card-body p-4 p-md-5 shadow-5 text-center">
                <h2 class="fw-bold mb-4 mb-md-5">{{ $t('auth.login') }}</h2>
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
                  <div class="d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-center">
                    <button type="submit" class="btn btn-primary btn-block mb-2 mb-md-0 flex-fill">
                      {{ $t('auth.loginButton') }}
                    </button>

                    <button type="button" class="btn btn-primary btn-block mb-2 mb-md-0 flex-fill"
                      @click="volverAlMenu">
                      {{ $t('auth.cancelButton') }}
                    </button>
                  </div>

                  <div class="text-center mt-3 mt-md-4">
                    <p class="mb-0">
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

          <div class="col-lg-6 mb-5 mb-lg-0 order-1 order-lg-2">
            <img src="../assets/img/BMW_Motorcycle_Roads_2020_S_1000_XR_Motorcyclist_591906_600x800.jpg"
              class="w-100 rounded-4 shadow-4 img-fluid" alt="" />
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

function validarFormularioCompleto() {
  validarUsuario()
  validarContrasenya()

  return (
    validacionUsuario.value === 'valido' &&
    validacionContrasenya.value === 'valido'
  )
}

async function iniciarSesion() {
  if (!validarFormularioCompleto()) {
    return;
  }

  try {
    const username = document.getElementById('usuario_id').value;
    const password = document.getElementById('contrasenya_id').value;

    console.log('Intentando login con:', { username, password });

    // Llamada al backend
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el login');
    }

    // Guardar token y datos del usuario
    localStorage.setItem('authToken', data.access_token);
    localStorage.setItem('userData', JSON.stringify(data.user));

    console.log('Login exitoso:', data.user);
    alert(t('auth.loginSuccess'));
    volverAlMenu();

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert(`Error: ${error.message}`);
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
    margin-top: 20px;
  }

  .card-body {
    padding: 2rem 1.5rem !important;
  }
}

@media (max-width: 767.98px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }

  .card-body {
    padding: 1.5rem 1rem !important;
  }

  h2 {
    font-size: 1.5rem;
  }
}

.form-outline {
  margin-bottom: 25px;
}

@media (max-width: 767.98px) {
  .form-outline {
    margin-bottom: 20px;
  }
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

@media (max-width: 767.98px) {
  .btn {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

@media (max-width: 575.98px) {
  .container.py-4 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }

  .card-body {
    padding: 1rem 0.75rem !important;
  }
}
</style>
