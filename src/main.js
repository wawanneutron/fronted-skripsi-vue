import { createApp } from "vue";
import App from "./App.vue";
import "./scss/main.css";
import router from "./router/index";
import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
const app = createApp(App);

//gunakan router di vue js dengan plugin "use"
app.use(router);
app.use(store);
app.use(VueSweetalert2);

//define mixins for global function
app.mixin({
  methods: {
    moneyFormat(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    //calculate discount
    calculateDiscount(product) {
      return product.price - (product.price * product.discount) / 100;
    },
  },
});

app.mount("#app");
