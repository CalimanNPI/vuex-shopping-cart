import axios from "axios";

const state = {
  logged: false,
};

const mutations = {
  UPDATE_LOGGED_IN(state, payload) {
    state.logged = payload;
  },
};

const actions = {
  logged({ commit }) {
    axios
      .get("/api/isLogged?id=akdkajdlkj.asdjlksdj.kjlajd")
      .then((response) => {
        const data = JSON.parse(response.data);
        if (data.status == 200) {
          commit("UPDATE_LOGGED_IN", data.isLoggedin);
        }
      });
  },
};

const getters = {
  is_loggedin: (state) => state.logged,
};

const authModule = {
  state,
  mutations,
  actions,
  getters,
};

export default authModule;
