import Api from "../../api/Api";

const category = {
  namespaced: true,

  state: {
    categoriesHome: [],
    categoriesAll: [],
    productCategory: [],
    category: {},
  },
  mutations: {
    GET_CATEGORIES_HOME(state, categories) {
      state.categoriesHome = categories; //asign hasil respons
    },
    GET_CATEGORIES_ALL(state, categories) {
      state.categoriesAll = categories;
    },
    GET_PRODUCT_CATEGORY(state, product) {
      state.productCategory = product; // terima hasil dari respon API
    },
    GET_CATEGORY(state, category) {
      state.category = category;
    },
  },
  actions: {
    getCategoriesHome({ commit }) {
      // get data categories
      Api.get("/categories-home")
        // commit ke mutation GET_CATEGORIES_HOME dengan response data
        .then((response) => {
          commit("GET_CATEGORIES_HOME", response.data.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllCategories({ commit }) {
      Api.get("/categories-all")
        .then((response) => {
          commit("GET_CATEGORIES_ALL", response.data.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProductCategory({ commit }, slug) {
      Api.get(`/category-show/${slug}`)
        .then((response) => {
          commit("GET_PRODUCT_CATEGORY", response.data.product);
          commit("GET_CATEGORY", response.data.category);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getCategoriesHome(state) {
      return state.categoriesHome;
    },
    getAllCategories(state) {
      return state.categoriesAll;
    },
    getProductCategory(state) {
      return state.productCategory;
    },
    getCategory(state) {
      return state.category;
    },
  },
};

export default category;
