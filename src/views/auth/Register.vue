<template>
  <!--page-login -->
  <div class="alert-auth" style="padding-top: 100px">
    <div
      class="alert alert-info alert-dismissible text-center fade show"
      role="alert"
    >
      <span
        >Harap mengunakan <b> email aktif</b> saat registrasi, sebagai
        notifikasi saat transaksi</span
      >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
  <div class="page-content page-auth" id="register" style="margin-top: 40px">
    <section class="section-store-auth" data-aos="fade-up">
      <div class="container">
        <div class="row align-items-center justify-content-center row-login">
          <div class="col-lg-4 col-md-6">
            <h2>
              Nikamti kenyamanan <br />
              dalam berbelanja online
            </h2>
            <form class="mt-4">
              <div class="form-group">
                <label for="">Full Name</label>
                <input
                  v-if="validation.name"
                  type="text"
                  class="form-control is-invalid"
                  v-model="user.name"
                  autofocus
                />
                <input
                  v-else
                  type="text"
                  class="form-control"
                  v-model="user.name"
                  autofocus
                />
              </div>
              <div
                class="mt-2 alert alert-danger"
                v-if="validation.name"
                role=" alert"
              >
                {{ validation.name[0] }}
              </div>
              <div class="form-group">
                <label for="">Email Address</label>
                <input
                  v-if="validation.email"
                  type="email"
                  class="form-control is-invalid"
                  v-model="user.email"
                />
                <input
                  v-else
                  type="email"
                  class="form-control"
                  v-model="user.email"
                />
              </div>
              <div
                class="mt-2 alert alert-danger"
                v-if="validation.email"
                role=" alert"
              >
                {{ validation.email[0] }}
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input
                  v-if="validation.password"
                  type="password"
                  class="form-control is-invalid"
                  name="password"
                  v-model="user.password"
                  id="password"
                />
                <input
                  v-else
                  type="password"
                  class="form-control"
                  name="password"
                  v-model="user.password"
                  id="password"
                />
              </div>
              <div
                class="mt-2 alert alert-danger"
                v-if="validation.password"
                role=" alert"
              >
                {{ validation.password[0] }}
              </div>
              <div class="form-group">
                <label for="">Confirm Password</label>
                <input
                  v-if="validation.password"
                  type="password"
                  class="form-control is-invalid"
                  name="confirm"
                  v-model="user.password_confirmation"
                  id="confirm"
                />
                <input
                  v-else
                  type="password"
                  class="form-control"
                  name="confirm"
                  v-model="user.password_confirmation"
                  id="confirm"
                />
              </div>
              <div
                class="mt-2 alert alert-danger"
                v-if="validation.password_confirmation"
                role=" alert"
              >
                {{ validation.password[0] }}
              </div>
              <div v-if="user.buttonCheckout || register.length">
                <button
                  @click.prevent="register"
                  class="btn btn-success btn-block mt-4"
                >
                  Sign Up Now
                </button>
              </div>
              <!-- checkout loading process-->
              <div v-else>
                <div v-if="user.buttonLoading">
                  <button class="btn btn-success btn-block mt-4">
                    <i class="fa fa-spinner fa-spin"></i>
                    <i class="ml-3">Loading...</i>
                  </button>
                </div>
                <div v-if="user.buttonValid || validation.value">
                  {{ (user.buttonLoading = null) }}
                  <button
                    @click.prevent="register"
                    class="btn btn-danger btn-block mt-4"
                  >
                    <!-- <i class="fa fa-spinner fa-spin"></i> -->
                    <i class="ml-3">Try Again</i>
                  </button>
                </div>
              </div>
            </form>
            <div class="btn-register">
              <router-link
                :to="{ name: 'login' }"
                class="btn btn-signup btn-block mt-3"
                >Back to Sign in</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.page-content {
  margin-top: 200px;
}
</style>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const user = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      buttonLoading: true,
      buttonCheckout: true,
      buttonValid: false,
    });

    const validation = ref([]);
    const store = useStore();
    const router = useRouter();

    // fungsi dijalankan ketika form di submit
    const register = () => {
      let name = user.name;
      let email = user.email;
      let password = user.password;
      let password_confirmation = user.password_confirmation;
      user.buttonLoading = true;
      user.buttonCheckout = false;

      // panggil action register didalam module vuex
      store
        .dispatch("auth/register", {
          name,
          email,
          password,
          password_confirmation,
        })
        .then(() => {
          // redirect ke halaman success
          router.push({ name: "register-success" });
        })
        .catch((error) => {
          validation.value = error;
          user.buttonValid = true;
        });
    };

    return {
      user,
      validation,
      store,
      register,
    };
  },
};
</script>