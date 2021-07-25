<template>
  <nav
    id="app"
    class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    :class="{ 'navbar-hidden': !showNavbar }"
  >
    <router-link class="navbar-brand" to="/">
      <img src="/images/logo_toko.svg" alt="logo" class="w-100" />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav ml-auto" v-if="!token">
        <li class="nav-item">
          <router-link class="nav-link active" :to="{ name: 'home' }"
            >Home <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Product' }"
            >Products <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Category' }"
            >Categories <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'register' }"
            >Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="btn btn-success btn-lg" :to="{ name: 'login' }"
            >Login</router-link
          >
        </li>
      </ul>
      <!-- desktopo auth -->
      <ul class="navbar-nav ml-auto d-none d-lg-flex" v-if="token">
        <li class="nav-item">
          <router-link class="nav-link active" :to="{ name: 'home' }"
            >Home <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Product' }"
            >Products <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Category' }"
            >Categories <span class="sr-only">(current)</span></router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav nav-profile d-none d-lg-flex" v-if="token">
        <li class="nav-item dropdown">
          <img
            :src="`https://ui-avatars.com/api/?name=${user.name}&background=1f1235&color=ffffff`"
            alt="user"
            class="rounded-circle mr-2 profile-picture shadow"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
          />
          Hi, {{ user.name }}
          <div class="dropdown-menu">
            <router-link :to="{ name: 'dashboard' }" class="dropdown-item">
              Dashboard</router-link
            >

            <hr />
            <button
              class="dropdown-item"
              data-toggle="modal"
              data-target="#myModal"
            >
              Logout
            </button>
          </div>
        </li>
        <li class="nav-item" v-if="countCart !== 0">
          <router-link
            to="/cart"
            class="nav-link btn cart btn-md d-inline-block mt-2 ml-3"
          >
            <img src="/images/ic_cart_filed.svg" class="mr-3" />
            <div class="cart-badge">{{ countCart }}</div>
            Rp. {{ moneyFormat(totalCart) }}
          </router-link>
        </li>
      </ul>
      <!-- mobile auth -->
      <div class="navbar-nav ml-auto d-block d-lg-none" v-if="token">
        <router-link class="nav-link active" to="/"
          >Home <span class="sr-only">(current)</span></router-link
        >
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Product' }"
            >Products <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Category' }"
            >Categories <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item" v-if="countCart !== 0">
          <router-link
            to="/cart"
            class="nav-link btn cart btn-md d-inline-block mt-2 ml-3"
          >
            <img src="/images/ic_cart_filed.svg" class="mr-3" />
            <div class="cart-badge">{{ countCart }}</div>
            Rp. {{ moneyFormat(totalCart) }}
          </router-link>
        </li>
      </div>
      <ul class="navbar-nav nav-profile d-block d-lg-none" v-if="token">
        <li class="nav-item dropdown">
          <img
            :src="`https://ui-avatars.com/api/?name=${user.name}&background=1f1235&color=ffffff`"
            alt="user"
            class="rounded-circle mr-2 profile-picture shadow"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
          />
          Hi, {{ user.name }}
          <div class="dropdown-menu">
            <router-link :to="{ name: 'dashboard' }" class="dropdown-item">
              Dashboard</router-link
            >

            <hr />
            <button
              data-toggle="modal"
              data-target="#myModal"
              class="dropdown-item"
            >
              Logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <!-- The Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title">Logout</h5>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <h5>Yakin ingin keluar aplikasi ?</h5>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-dismiss="modal">
            Close
          </button>
          <button
            @click="logout"
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Navbar",

  setup() {
    const store = useStore();
    const router = useRouter();

    const token = computed(() => {
      return store.getters["auth/isLoggedIn"];
    });

    let countCart = computed(() => {
      return store.getters["cart/countCart"];
    });

    let totalCart = computed(() => {
      return store.getters["cart/totalCart"];
    });

    onMounted(() => {
      // check state token
      const token = store.state.auth.token;
      if (!token) {
        return;
      }
      // ketika halaman di load akan menjalankana ction dimodule cart
      store.dispatch("cart/countCart");
      store.dispatch("cart/cartTotal");
    });

    const user = computed(() => {
      return store.state.auth.user;
    });

    // method logout
    const logout = () => {
      // panggil action logout di dalam module auth
      store.dispatch("auth/logout").then(() => {
        // jika berhasil akan diarahkan keraouter login
        router.push({
          name: "login",
        });
      });
    };

    return {
      token,
      store,
      logout,
      user,
      countCart,
      totalCart,
    };
  },

  // navbar collapse
  data: () => ({
    showNavbar: true,
    lastScrollPosition: 0,
  }),

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 40) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>
