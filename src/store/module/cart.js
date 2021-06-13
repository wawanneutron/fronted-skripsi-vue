import Api from "../../api/Api";

const cart = {
  namespaced: true,
  state: {
    cart: [],
    cartTotal: 0, //hitung total harga di cart
    cartWeight: 0,
  },
  mutations: {
    GET_CART(state, product) {
      state.cart = product;
    },

    TOTAL_CART(state, product) {
      state.cartTotal = product;
    },

    CART_WEIGHT(state, product) {
      state.cartWeight = product;
    },
  },

  actions: {
    // action addToCart
    addToCart({ commit }, product) {
      // get data token dan user di localStorage
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      // kirim data keserver
      Api.post("/cart", {
        product_id: product.product_id,
        price: product.price,
        quantity: product.quantity,
        weight: product.weight,
        customer_id: user.id,
      }).then(() => {
        Api.get("/cart").then((response) => {
          commit("GET_CART", response.data.cart);
        });
        Api.get("/cart/total").then((response) => {
          commit("TOTAL_CART", response.data.total);
        });
      });
    },
    // menghitung jumlah barang yang ada  di keranjang
    countCart({ commit }) {
      // cek token
      const token = localStorage.getItem("token");
      // set header dengan token
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.get("/cart").then((response) => {
        commit("GET_CART", response.data.cart);
      });
    },

    // mendapatkan jumlah harga di keranjang
    cartTotal({ commit }) {
      // cek token
      const token = localStorage.getItem("token");
      // set header dengan token
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.get("/cart/total").then((response) => {
        commit("TOTAL_CART", response.data.total);
      });
    },

    // mendapatkan berat barang di keranjang
    cartWeight({ commit }) {
      // cek token
      const token = localStorage.getItem("token");
      // set header dengan token
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.get("/cart/total-weight").then((response) => {
        commit("CART_WEIGHT", response.data.total);
      });
    },

    // action remove cart
    removeCart({ commit }, cart_id) {
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.post("cart/remove", {
        cart_id: cart_id,
      }).then(() => {
        //get cart
        Api.get("/cart").then((response) => {
          commit("GET_CART", response.data.cart);
        });

        //get total cart
        Api.get("/cart/total").then((response) => {
          commit("TOTAL_CART", response.data.total);
        });

        //get total cart weight
        Api.get("cart/total-weight").then((response) => {
          commit("CART_WEIGHT", response.data.total);
        });
      });
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },

    countCart(state) {
      return state.cart.length;
    },

    totalCart(state) {
      return state.cartTotal;
    },

    cartWeight(state) {
      return state.cartWeight;
    },
  },
};

export default cart;
