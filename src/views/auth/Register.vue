<template>
  <!--page-login -->
  <div class="page-content page-auth" id="register">
    <section class="section-store-auth" data-aos="fade-up">
      <div class="container">
        <div class="row align-items-center justify-content-center row-login">
          <div class="col-lg-4 col-md-6">
            <h2>
              Memulai untuk jual beli <br />
              dengan cara terbaru
            </h2>
            <form @submit.prevent="register" class="mt-4">
              <div class="form-group">
                <label for="">Full Name</label>
                <input
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
                <input type="email" class="form-control" v-model="user.email" />
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
                {{ validation.password_confirmation[0] }}
              </div>
              <button type=" submit" class="btn btn-success btn-block mt-4">
                Sign Up Now
              </button>
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
          console.log(validation.value);
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