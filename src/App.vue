<template>
  <Navbar></Navbar>
  <a
    href="https://api.whatsapp.com/send/?phone=6287732697337&amp;text=Assalamualaikum+Saya+ingin+bertanya+mengenai+produk+yang+ingin+saya+beli+Terima+kasih+..."
    target="_blank"
  >
    <div class="chat-box">
      <img src="/images/ic_chat_admin.svg" alt="chat admin" />
    </div>
  </a>
  <router-view></router-view>
  <notifications-list/>
  <Footer></Footer>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import NotificationsList from "./components/NotificationsList.vue";

const Navbar = defineAsyncComponent(() => import("././components/Navbar.vue"));
const Footer = defineAsyncComponent(() => import("././components/Footer.vue"));

export default {
  name: "App",
  components: {
    Navbar: Navbar,
    Footer: Footer,
    NotificationsList
  },
};
</script>


