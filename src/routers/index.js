import Vue from 'vue';
import Router from 'vue-router';
import JwtService from "@/common/jwtService";

import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const isAuthenticated = JwtService.getToken();
  if (authRequired && !isAuthenticated) {
    next('/login');
  } else if (!authRequired && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router