<template>
  <!--page-login -->
  <div class="page-content page-auth">
    <section class="section-store-auth" data-aos="fade-up">
      <div class="container">
        <div class="row align-items-center justify-content-center row-login">
          <div class="col-lg-7 col-md-6 text-center">
            <img
              src="/images/midtrans_banner.png"
              alt=""
              class="w-100 mb-4 mb-lg-none"
            />
          </div>
          <div class="col-lg-5 col-md-6">
            <h2>
              Belanja kebutuhan mu,<br />
              menjadi lebih mudah
            </h2>
            <form @submit.prevent="login" class="mt-3">
              <div class="form-group">
                <label for="">Email Address</label>
                <input
                  v-if="validation.email || validation.message"
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
                v-if="validation.email"
                class="mt-2 alert alert-danger"
                role=" alert"
              >
                {{ validation.email[0] }}
              </div>
              <div
                v-if="validation.message"
                class="mt-2 alert alert-danger"
                role=" alert"
              >
                {{ validation.message }}
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input
                  v-if="validation.password || validation.message"
                  type="password"
                  class="form-control is-invalid"
                  v-model="user.password"
                />
                <input
                  v-else
                  type="password"
                  class="form-control"
                  v-model="user.password"
                />
              </div>
              <div
                class="mt-2 alert alert-danger"
                v-if="validation.password"
                role=" alert"
              >
                {{ validation.password[0] }}
              </div>
              <div v-if="user.buttonLogin || login.length">
                <button type=" submit" class="btn btn-success btn-block mt-4">
                  Sign In to My Account
                </button>
              </div>
              <!-- checkout loading process-->
              <div v-else>
                <div v-if="user.buttonLoading">
                  <button type=" submit" class="btn btn-success btn-block mt-4">
                    <i class="fa fa-spinner fa-spin"></i>
                    <i class="ml-3">Loading...</i>
                  </button>
                </div>
                <div v-if="user.buttonValid || validation.value">
                  {{ (user.buttonLoading = null) }}
                  <button type=" submit" class="btn btn-danger btn-block mt-4">
                    <!-- <i class="fa fa-spinner fa-spin"></i> -->
                    <i class="ml-3">Try Again</i>
                  </button>
                </div>
              </div>
              <router-link
                :to="{ name: 'register' }"
                class="btn btn-signup btn-block mt-3"
                >Sign Up</router-link
              >
            </form>
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
    const store = useStore();
    const validation = ref([]);
    const router = useRouter();

    const user = reactive({
      email: "",
      password: "",
      buttonLogin: true,
      buttonLoading: false,
      buttonValid: false,
    });

    let login = () => {
      // defina variable
      let email = user.email;
      let password = user.password;
      // aktifkan tombol loading
      user.buttonLogin = false;
      user.buttonLoading = true;
      // panggil action login dari module auth vuex
      store
        .dispatch("auth/login", {
          email,
          password,
        })
        .then(() => {
          // redirect ke halaman success
          router.push({ name: "login-success" });
        })
        .catch((error) => {
          validation.value = error;
          user.buttonValid = true;
        });
    };

    return {
      user,
      login,
      validation,
    };
  },
};
</script>