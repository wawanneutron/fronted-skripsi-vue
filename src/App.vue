<template>
  <Navbar></Navbar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

const Navbar = defineAsyncComponent(() => import("././components/Navbar.vue"));
const Footer = defineAsyncComponent(() => import("././components/Footer.vue"));

export default {
  name: "App",
  components: {
    Navbar: Navbar,
    Footer: Footer,
  },
};
</script>


