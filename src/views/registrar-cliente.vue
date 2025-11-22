<template>
  <!-- Section: Design Block -->
  <section class="text-center text-lg-start">
    <!-- Jumbotron -->
    <div class="container py-4">
      <div class="row g-0 align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="card cascading-right bg-body-tertiary" style="backdrop-filter: blur(30px);">
            <div class="card-body p-5 shadow-5 text-center">
              <h2 class="fw-bold mb-5">Regístrate ahora!</h2>
              <form>
                <!-- 2 column grid layout with text inputs for the first and last names -->
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example1" class="form-control" />
                      <label class="form-label" for="form3Example1">Nombre</label>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form3Example2" class="form-control" />
                      <label class="form-label" for="form3Example2">Apellidos</label>
                    </div>
                  </div>
                  <!-- Usuario centrado -->
                  <div class="col-12 mb-4 d-flex justify-content-center">
                    <div data-mdb-input-init class="form-outline w-50">
                      <input type="text" id="form3Example3" class="form-control input-usuario" />
                      <label class="form-label" for="form3Example3">Usuario</label>
                    </div>
                  </div>
                </div>

                <!-- Email input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control" />
                  <label class="form-label" for="form3Example3">Correo</label>
                </div>

                <!-- Municipio input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <select id="municipios_lista" class="validacionMunicipio form-control">
                  </select>
                  <label class="form-label" for="municipios_lista">Seleccione un municipio</label>
                </div>

                <!-- CI input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="text" id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">CI</label>
                </div>

                <!-- Password input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">Contraseña</label>
                </div>
                <!-- Password input -->
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="form3Example4" class="form-control" />
                  <label class="form-label" for="form3Example4">Repita la contraseña</label>
                </div>

                <!-- Submit button -->
                <button type="submit" data-mdb-button-init data-mdb-ripple-init
                  class="btn btn-primary btn-block mb-4 boton_class">
                  Registrarse
                </button>
                <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4"
                  @click="volverAlMenu">
                  Cancelar
                </button>

                <!-- Register buttons -->
                <div class="text-center">
                  <p>o inicie sesión con:</p>
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
</style>
