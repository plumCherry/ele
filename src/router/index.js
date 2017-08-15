import Vue from 'vue'
import VueRouter from "vue-router"

import goods from "../components/goods/goods.vue"
import rating from "../components/ratings/ratings.vue"
import seller from "../components/seller/seller.vue"

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {path: '/goods',component: goods},
    {path: '/rating',component: rating},
    {path: '/seller',component: seller},
    {path: '/',redirect: '/goods'}
  ]
})
