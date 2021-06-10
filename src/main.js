import { createApp } from "vue";
import App from "./App.vue";
import "./scss/main.css";
import router from "./router/index";
import store from "./store";

const app = createApp(App);

//gunakan router di vue js dengan plugin "use"
app.use(router);
app.use(store);

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
