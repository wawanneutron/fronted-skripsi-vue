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
    component: () => import("@/views/auth/Register.vue"),
  },
  {
    path: "/register-success",
    name: "register-success",
    component: () => import("@/views/success/Register.vue"),
    // check is loggedIn
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login-success",
    name: "login-success",
    component: () => import("@/views/success/Login.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/Index.vue"),
  },
  {
    path: "/customer/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard/Index.vue"),
    // check is loggedIn
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer/order/:snap_token",
    name: "detail_order",
    component: () => import("@/views/dashboard/Show.vue"),
    // check is loggedIn
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tos",
    name: "Term",
    component: () => import("../views/Term.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/category-all",
    name: "Category",
    component: () => import("../views/category/Index.vue"),
  },
  {
    path: "/category/:slug",
    name: "category_show",
    component: () => import("../views/category/Show.vue"),
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
  // scroll fix top ketika di klik
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

// define route for handle authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // cek nilai dari getters isLoggedIn di module auth
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
