import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import game from './modules/game';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    game
  },
  plugins: [createPersistedState()]
});
