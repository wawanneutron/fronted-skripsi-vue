import Api from "../../api/Api";

const slider = {
  namespaced: true,
  state: {
    sliders: [],
  },
  mutations: {
    GET_SLIDERS(state, data) {
      state.sliders = data;
    },
  },
  actions: {
    getSliders({ commit }) {
      Api.get("/sliders")
        .then((response) => {
          commit("GET_SLIDERS", response.data.sliders);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    getSliders(state) {
      return state.sliders;
    },
  },
};
export default slider;
