<template>
  <!-- Section: Design Block -->
  <section class="text-center text-lg-start">
    <!-- Jumbotron -->
    <div class="container py-4">
      <div class="row g-0 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card cascading-right bg-body-tertiary" style="backdrop-filter: blur(30px);">
            <div class="card-body p-5 shadow-5 text-center">
              <h2 class="fw-bold mb-5">{{ $t('auth.register') }}</h2>
              <form>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1" class="form-control" />
                      <label class="form-label" for="form3Example1">{{ $t('auth.firstName') }}</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example2" class="form-control" />
                      <label class="form-label" for="form3Example2">{{ $t('auth.lastName') }}</label>
                    </div>
                  </div>
                  <!-- Usuario centrado -->
                  <div class="col-12 mb-4 d-flex justify-content-center">
                    <div data-mdb-input-init class="form-outline w-50">
                      <input type="text" id="form3Example3" class="form-control input-usuario" />
                      <label class="form-label" for="form3Example3">{{ $t('auth.username') }}</label>
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" />
                  <label class="form-label" for="form3Example3">{{ $t('auth.email') }}</label>
                </div>

                <!-- Municipio input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <select id="municipios_lista" class="validacionMunicipio form-control">
                  </select>
                  <label class="form-label" for="municipios_lista">{{ $t('auth.municipality') }}</label>
                </div>

                <!-- CI input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="text" id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">{{ $t('auth.idNumber') }}</label>
                </div>

                <!-- Password input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="form3Example5" class="form-control" />
                  <label class="form-label" for="form3Example5">{{ $t('auth.password') }}</label>
                </div>

                <!-- Repeat Password input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="form3Example6" class="form-control" />
                  <label class="form-label" for="form3Example6">{{ $t('auth.repeatPassword') }}</label>
                </div>

                <!-- Submit button -->
                <button type="submit" data-mdb-button-init data-mdb-ripple-init
                  class="btn btn-primary btn-block mb-4 boton_class">
                  {{ $t('auth.registerButton') }}
                </button>

                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4"
                  @click="volverAlMenu">
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
          <img src="../assets/img/Yamaha_2018_YZF-R1_Motorcyclist_Helmet_Motion_537724_600x800.jpg"
            class="w-100 rounded-4 shadow-4" alt="" />
        </div>
      </div>
    </div>
    <!-- Jumbotron -->
  </section>
  <!-- Section: Design Block -->
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

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

.boton_class {
  margin-right: 70px;
}
</style>
