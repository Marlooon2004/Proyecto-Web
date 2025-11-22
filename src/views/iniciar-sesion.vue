<template>
  <div>
    <!-- Section: Design Block -->
    <section class="text-center text-lg-start">

      <!-- Jumbotron -->
      <div class="container py-4">
        <div class="row g-0 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card cascading-right bg-body-tertiary" style="
            backdrop-filter: blur(30px);
            ">
              <div class="card-body p-5 shadow-5 text-center">
                <h2 class="fw-bold mb-5">Inicia Sesión ahora!</h2>
                <form>
                  <!-- 2 column grid layout with text inputs for the first and last names -->
                  <div data-mdb-input-init class="form-outline">
                    <input type="text" id="form3Example1" class="form-control" />
                    <label class="form-label" for="form3Example1">Usuario</label>
                  </div>

                  <!-- Password input -->
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="form3Example4" class="form-control" />
                    <label class="form-label" for="form3Example4">Contraseña</label>
                  </div>

                  <!-- Submit button -->
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init
                    class="btn btn-primary btn-block mb-4 boton_class">
                    Iniciar sesión
                  </button>
                  <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4"
                    @click="volverAlMenu">
                    Cancelar
                  </button>

                  <!-- Register buttons -->
                  <div class="text-center">
                    <p>o inicia sesion con:</p>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                      class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                      class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-google"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                      class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-twitter"></i>
                    </button>

                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                      class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-github"></i>
                    </button>

                    <p>No tienes una cuenta? <router-link to="/registrar-cliente">Registráte aquí!</router-link></p>
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
      <!-- Jumbotron -->
    </section>
    <!-- Section: Design Block -->
  </div>
</template>
<style>
.cascading-right {
  margin-right: -50px;
}

@media (max-width: 991.98px) {
  .cascading-right {
    margin-right: 0;
  }
}

.form-outline {
  margin-bottom: 50px;
}

.boton_class{
  margin-right: 70px;
}

</style>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function volverAlMenu() {
  router.push('/')
}</script>

