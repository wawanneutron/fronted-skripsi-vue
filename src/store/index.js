// import vuex
import { createStore } from "vuex";
// import module
import category from "./module/category";
import product from "./module/product";
// create store vuex
export default createStore({
  modules: {
    category,
    product,
  },
});
