// import vuex
import { createStore } from "vuex";
// import module
import slider from "./module/slider";
import category from "./module/category";
import product from "./module/product";
import auth from "./module/auth";
import order from "./module/order";
import cart from "./module/cart";
// create store vuex
export default createStore({
  modules: {
    slider,
    category,
    product,
    auth,
    order,
    cart,
  },
});
