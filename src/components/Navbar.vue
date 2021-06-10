<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    :class="{ 'navbar-hidden': !showNavbar }"
  >
    <router-link class="navbar-brand" to="/">
      <img src="/images/logo.svg" alt="" />
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
      <ul class="navbar-nav ml-auto" v-if="guest">
        <li class="nav-item">
          <router-link class="nav-link active" to="/"
            >Home <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="#">Term of Service</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/auth">Sign up</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-success btn-lg" to="/auth"
            >Sign in</router-link
          >
        </li>
      </ul>
      <!-- desktopo auth -->
      <ul class="navbar-nav ml-auto d-none d-lg-flex" v-if="!guest">
        <li class="nav-item">
          <router-link class="nav-link active" to="/"
            >Home <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="#">Term of Service</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <ul class="navbar-nav nav-profile d-none d-lg-flex" v-if="!guest">
        <li class="nav-item dropdown">
          <img
            src="/images/user_pc.jpg"
            alt="user"
            class="rounded-circle mr-2 profile-picture shadow"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
          />
          Hi, Wawan
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item"> Dashboard</a>
            <a href="#" class="dropdown-item">Settings</a>
            <hr />
            <router-link to="/auth" class="dropdown-item">Logout</router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link to="/cart" class="nav-link cart d-inline-block mt-2">
            <img src="/images/ic_cart_filed.svg" />
            <div class="cart-badge">3</div>
          </router-link>
        </li>
      </ul>
      <!-- mobile auth -->
      <div class="navbar-nav ml-auto d-block d-lg-none" v-if="!guest">
        <router-link class="nav-link active" to="/"
          >Home <span class="sr-only">(current)</span></router-link
        >
        <router-link class="nav-link" to="#">Term of Service</router-link>
        <router-link class="nav-link" to="/about">About</router-link>
      </div>
      <ul class="navbar-nav nav-profile d-block d-lg-none" v-if="!guest">
        <li class="nav-item dropdown">
          <img
            src="/images/user_pc.jpg"
            alt="user"
            class="rounded-circle mr-2 profile-picture shadow"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
          />
          Hi, Wawan
          <div class="dropdown-menu">
            <a href="#" class="dropdown-item"> Dashboard</a>
            <a href="#" class="dropdown-item">Settings</a>
            <hr />
            <a href="#" class="dropdown-item">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    guest: false,
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
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 80) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>
