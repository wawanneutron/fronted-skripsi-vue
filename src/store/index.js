// import vuex
import { createStore } from "vuex";
// import module
import category from "./module/category";
import product from "./module/product";
import auth from "./module/auth";
import order from "./module/order";
// create store vuex
export default createStore({
  modules: {
    category,
    product,
    auth,
    order,
  },
});
