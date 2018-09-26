import Vue from 'vue';
import App from '../App.vue';
import RegistrationPage from '../components/RegistrationPage.vue';
import LoginPage from '../components/LoginPage.vue';
import MainPage from '../components/MainPage.vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    redirect: '/play',
    children: [
      { path: '/login', component: LoginPage },
      { path: '/register', component: RegistrationPage },
      { path: '/play', component: MainPage, meta: { requiresAuth: true } }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var vuex = JSON.parse(localStorage.getItem('vuex'));
    if (!vuex || !vuex.user || !vuex.user.jwt) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
