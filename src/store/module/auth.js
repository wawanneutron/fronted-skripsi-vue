import Api from "../../api/Api";

const auth = {
  namespaced: true,
  state: {
    //state untuk token, pakai localStorage, untuk menyimpan token JWT
    token: localStorage.getItem("token") || "",
    //state user, pakai localStorage, untuk menyimpan data user yang sedang login
    user: JSON.parse(localStorage.getItem("user")) || {},
  },
  mutations: {
    AUTH_SUCCESS(state, token, user) {
      state.token = token; // <-- assign state token dengan response token
      state.user = user;
    },
    AUTH_LOGOUT(state) {
      state.token = ""; // <-- set state token ke empty
      state.user = {}; // <-- set state user ke empty array
    },
    GET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    // action register
    register({ commit }, user) {
      // define collback promise
      return new Promise((resolve, reject) => {
        // send data ke server
        Api.post("/register", {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation,
        })
          .then((response) => {
            // define variable dengan hasil response dari server
            const token = response.data.token;
            const user = response.data.user;
            //set localStorage untuk menyimpan token dan data user
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            //set default header axios dengan token
            Api.defaults.headers.common["Authorization"] = "Bearer " + token;
            // commit ke mutation
            commit("AUTH_SUCCESS", token, user);
            // commit  data user ke mutation
            commit("GET_USER", user);
            // resolve ke komponen dengan  hasil respon
            resolve(response);
          })
          .catch((error) => {
            // jika gagal haspus locaStorage
            localStorage.removeItem("token");
            //reject ke component dengan hasil response
            reject(error.response.data);
          });
      });
    },
    // action login
    login({ commit }, user) {
      // define collback promise
      return new Promise((resolve, reject) => {
        Api.post("/login", {
          email: user.email,
          password: user.password,
        })
          .then((response) => {
            // define variable dengan isi hasil response dari server
            const token = response.data.token;
            const user = response.data.user;

            // set localStorage untuk menyimpan token dan data user
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // set default header axios dengan token
            Api.defaults.headers.common["Authorization"] = "Bearer " + token;

            // commit auth success ke mutation
            commit("AUTH_SUCCESS", token, user);
            // commit  data user ke mutation
            commit("GET_USER", user);

            /* 
              commit cart total dan cart count ke state yang ada di module cart
            */
            Api.get("/cart").then((response) => {
              commit("cart/GET_CART", response.data.cart, { root: true }); //root lintas modul
            });

            Api.get("/cart/total").then((response) => {
              commit("cart/TOTAL_CART", response.data.total, { root: true }); //root lintas modul
            });

            // resolve ke komponent dengan hasil response
            resolve(response);
          })
          .catch((error) => {
            // jika gagal, remove localStorage dengan key token
            localStorage.removeItem("token");
            // reject ke komponent dengan hasil response
            reject(error.response.data);
          });
      });
    },

    //action logout
    logout({ commit }) {
      //define callback promise
      return new Promise((resolve) => {
        //commit ke mutation AUTH_LOGOUT
        commit("AUTH_LOGOUT");

        //remove value dari localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        //delete header axios
        delete Api.defaults.headers.common["Authorization"];

        //return resolve ke component
        resolve();
      });
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.token;
    },
  },
};

export default auth;
