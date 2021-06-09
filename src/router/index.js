//import vue router
import { createRouter, createWebHistory } from "vue-router";
// import store vuex
// import store from "@/store";
//define a routes

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/terms",
    name: "Term",
    component: () => import("../views/Term.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/details",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes
});

export default router;
