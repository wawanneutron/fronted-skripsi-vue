<template>
  <!--page-login -->
  <Navbar></Navbar>
  <div class="page-content page-auth">
    <section class="section-store-auth" data-aos="fade-up">
      <div class="container">
        <div class="row align-items-center justify-content-center row-login">
          <div class="col-lg-6 col-md-6 text-center">
            <img
              src="/images/img_login.jpg"
              alt=""
              class="w-50 mb-4 mb-lg-none"
            />
          </div>
          <div class="col-lg-5 col-md-6">
            <h2>
              Belanja kebutuhan utama,<br />
              menjadi lebih mudah
            </h2>
            <div v-if="validation.message" class="mt-2 alert alert-danger">
              {{ validation.message }}
            </div>
            <form @submit.prevent="login" class="mt-3">
              <div class="form-group">
                <label for="">Email Address</label>
                <input
                  type="email"
                  class="form-control w-75"
                  v-model="user.email"
                />
              </div>
              <div
                class="mt-2 alert alert-danger w-75"
                v-if="validation.email"
                role=" alert"
              >
                {{ validation.email[0] }}
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input
                  type="password"
                  class="form-control w-75"
                  v-model="user.password"
                />
              </div>
              <div
                class="mt-2 alert alert-danger w-75"
                v-if="validation.password"
                role=" alert"
              >
                {{ validation.password[0] }}
              </div>
              <button
                type=" submit"
                class="btn btn-success btn-block w-75 mt-4"
              >
                Sign In to My Account
              </button>
              <router-link
                :to="{ name: 'register' }"
                class="btn btn-signup btn-block w-75 mt-3"
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
    });

    let login = () => {
      // defina variable
      let email = user.email;
      let password = user.password;
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