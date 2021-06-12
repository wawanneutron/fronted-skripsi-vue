import Api from "../../api/Api";
const order = {
  // set namespace true
  namespaced: true,

  state: {
    // define state orders
    orders: [],
    detailOrder: {},
    productInOrder: [],
    getKota: {},
    getProvinsi: {},
  },

  mutations: {
    // get order
    GET_ORDER(state, orders) {
      state.orders = orders; //asign state orders dari hasil response
    },

    // detail order
    DETAIL_ORDER(state, detailOrder) {
      state.detailOrder = detailOrder; //asign state detailOrder dari hasil response
    },

    // product in order
    PRODUCT_IN_ORDER(state, product) {
      state.productInOrder = product; //asign state productInOrder dari hasil response
    },
    // product in order
    GET_KOTA(state, kota) {
      state.getKota = kota; //asign state productInOrder dari hasil response
    },
    // product in order
    GET_PROVINSI(state, prov) {
      state.getProvinsi = prov; //asign state productInOrder dari hasil response
    },
  },

  actions: {
    // action getOrder
    getOrder({ commit }) {
      // define variabel token
      const token = localStorage.getItem("token");

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get("/order").then((response) => {
        // commit ke mutation GET_ORDER
        commit("GET_ORDER", response.data.data);
      });
    },

    // action detailOrder
    detailOrder({ commit }, snap_token) {
      // define variable token
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get(`/order/${snap_token}`).then((response) => {
        // commit mutation DETAIL_ORDER
        commit("DETAIL_ORDER", response.data.data);
        // commit mutation PRODUCT_IN_ORDER
        commit("PRODUCT_IN_ORDER", response.data.product);
        // commit mutation GET_KOTA
        commit("GET_KOTA", response.data.data.kota);
        // commit mutation GET_PROVINSI
        commit("GET_PROVINSI", response.data.data.provinsi);
      });
    },
  },

  getters: {
    // getter getOrder
    getOrder(state) {
      return state.orders;
    },
    detailOrder(state) {
      return state.detailOrder;
    },
    productInOrder(state) {
      return state.productInOrder;
    },
    getKota(state) {
      return state.getKota;
    },
    getProvinsi(state) {
      return state.getProvinsi;
    },
  },
};

export default order;
