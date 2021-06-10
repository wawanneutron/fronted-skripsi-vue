//import vue router
import { createRouter, createWebHistory } from "vue-router";
// import store vuex
import store from "@/store";
//define a routes

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Daftar.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/Index.vue"),
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
    path: "/category-all",
    name: "Category",
    component: () => import("../views/category/Index.vue"),
  },
  {
    path: "/product-all",
    name: "Product",
    component: () => import("../views/product/Index.vue"),
  },
  {
    path: "/details/:slug",
    name: "detail",
    component: () => import("../views/home/Detail.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/cart/Index.vue"),
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
  store,
});

export default router;
