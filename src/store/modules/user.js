import backend from '../../services/backend';

// initial state
const state = {
  logged: {},
  jwt: ''
};

// getters
const getters = {
  getLoggedUser: (state, getters, rootState) => {
    return state.logged;
  },
  getJwt: (state, getters, rootState) => {
    return state.jwt;
  }
};

// actions
const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      backend
        .auth(user)
        .then(res => {
          return res.data;
        })
        .then(data => {
          commit('setJwt', data.token);
          commit('setUser', data.user);
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    commit('setJwt', '');
    commit('setUser', {});
    commit('game/setGame', {}, { root: true });
  }
};

// mutations
const mutations = {
  setUser(state, user) {
    state.logged = user;
  },
  setJwt(state, jwt) {
    state.jwt = jwt;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
