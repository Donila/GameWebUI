import backend from '../../services/backend';

// initial state
const state = {
  current: {},
  games: []
};

// getters
const getters = {
  getCurrentGame: (state, getters, rootState) => {
    return state.current;
  },
  getGames: state => {
    return state.games;
  }
};

// actions
const actions = {
  startWithBot({ commit, rootState }) {
    backend
      .post('/games', {}, rootState.user.jwt)
      .then(res => {
        return res.data;
      })
      .then(data => {
        commit('setGame', data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  move({ commit, state, rootState }, hitcode) {
    let game = state.current.id;
    let user = rootState.user.logged.id;
    let number = state.current.currentMove;
    let move = { user: user, game: game, hitcode: hitcode, number: number };
    backend
      .post('/moves', move, rootState.user.jwt)
      .then(res => {
        return res.data;
      })
      .then(data => {
        commit('setGame', data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  endGame({ commit, rootState, state }) {
    let gameId = state.current.id;
    if (
      state.current.state == 'FINISHED' ||
      state.current.state == 'ABANDONED'
    ) {
      commit('setGame', {});
    } else {
      backend
        .put(`/games/${gameId}`, { state: 'ABANDONED' }, rootState.user.jwt)
        .then(res => {
          return res.data;
        })
        .then(data => {
          commit('setGame', {});
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getLastGames({ commit, rootState, state }) {
    backend
      .get(`/games?user=${rootState.user.logged.id}`)
      .then(res => {
        return res.data;
      })
      .then(data => {
        commit('setGames', data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

// mutations
const mutations = {
  setGame(state, game) {
    state.current = game;
  },
  setGames(state, games) {
    state.games = games;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
