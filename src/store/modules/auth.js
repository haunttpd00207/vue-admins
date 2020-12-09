import firebase from "firebase";
import JwtService from "@/common/jwtService";
const state = {
  errors: null,
  user: {},
  isAuthenticated: false
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  errors(state) {
    return state.errors
  }
};
const mutations = {
  SET_LOGGED_IN(state, data) {
    state.isAuthenticated = data;
    JwtService.saveToken(state.isAuthenticated);
  },
  SET_USER(state, data) {
    state.user = data;
  },
  SET_ERROR(state, data) {
    state.errors = data;
  }
};
const actions = {
  fetchUser({ commit }, user) {
    commit("SET_LOGGED_IN", user !== null);
    if (user) {
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email
      });
    } else {
      commit("SET_USER", null);
    }
  },
  async signIn({ commit }, { email, password }) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        commit("SET_ERROR", null);
      })
      .catch((err) => {
        commit("SET_ERROR", err.message);
      });
    return true
  },
  async signUp({ commit }, { email, password, displayName }) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        data.user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            commit("SET_USER", {
              displayName: displayName,
              email: email
            });
          });
        commit("SET_ERROR", null);
      })
      .catch((err) => {
        commit("SET_ERROR", err.message);
      });
  },
  async signOut({ commit }) {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        commit("SET_LOGGED_IN", false);
        commit("SET_USER", null)
        commit("SET_ERROR", null);
      })
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};