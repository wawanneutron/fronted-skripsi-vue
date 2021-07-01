import Api from "../../api/Api";

const product = {
  namespaced: true,

  state: {
    productsHome: [],
    productsTerlaris: [],
    productsAll: [],
    productDetail: {},
    gallery: [],
  },
  mutations: {
    GET_PRODUCT_HOME(state, products) {
      state.productsHome = products; //asign hasil response dengan data
    },
    GET_PRODUCT_TERLARIS(state, terlaris) {
      state.productsTerlaris = terlaris;
    },
    GET_PRODUCT_ALL(state, products) {
      state.productsAll = products; //asign hasil response dengan data
    },
    GET_DETAIL_PRODUCT(state, product) {
      state.productDetail = product;
    },
    GALLERY(state, product) {
      state.gallery = product;
    },
  },
  actions: {
    getProductsHome({ commit }) {
      Api.get("/products-home")
        .then((response) => {
          commit("GET_PRODUCT_HOME", response.data.product);
          commit("GET_PRODUCT_TERLARIS", response.data.terlaris);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProductsAll({ commit }) {
      Api.get("/products")
        .then((response) => {
          commit("GET_PRODUCT_ALL", response.data.product.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailProduct({ commit }, slug) {
      Api.get(`/product/${slug}`)
        .then((response) => {
          commit("GET_DETAIL_PRODUCT", response.data.product);
          commit("GALLERY", response.data.product.gallery);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getProductsHome(state) {
      return state.productsHome;
    },
    getProductsTerlaris(state) {
      return state.productsTerlaris;
    },
    getProductsAll(state) {
      return state.productsAll;
    },
    getDetailProduct(state) {
      return state.productDetail;
    },
    getGallery(state) {
      return state.gallery;
    },
  },
};

export default product;
