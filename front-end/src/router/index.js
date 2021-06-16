import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Goal from '../views/Goal.vue'
import About from '../views/About.vue'
import VueSplash from 'vue-splash';

Vue.use(VueRouter);
Vue.use(VueSplash);


const routes = [{
    path: '/',
    name: 'about',
    component: About
  },
  {
    path: '/goal/:id',
    name: 'goal',
    component: Goal
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
