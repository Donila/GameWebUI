import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import router from './services/router.js';
import store from './store'

Vue.use(Vuetify);
Vue.use(Vuex);

const app = new Vue({
  router,
  store
}).$mount('#app');
