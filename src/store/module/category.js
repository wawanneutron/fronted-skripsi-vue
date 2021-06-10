import Api from "../../api/Api";

const category = {
  namespaced: true,

  state: {
    categoriesHome: [],
    categoriesAll: [],
    productOnCategory: [],
  },
  mutations: {
    GET_CATEGORIES_HOME(state, categories) {
      state.categoriesHome = categories; //asign hasil respons
    },
    GET_CATEGORIES_ALL(state, categories) {
      state.categoriesAll = categories;
    },
    GET_PRODUCT_ON_CATEGORY(state, products) {
      state.productOnCategory = products;
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
  },
  getters: {
    getCategoriesHome(state) {
      return state.categoriesHome;
    },
    getAllCategories(state) {
      return state.categoriesAll;
    },
  },
};

export default category;
