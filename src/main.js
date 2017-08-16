import Vue from 'vue'
import app from './App.vue'
import router from './router'
import VueResource from "vue-resource"

import './common/stylus/index.styl'
import './mock/mockServer'

Vue.use(VueResource);
new Vue ({
  el: '#app',
  render: h => h(app),
  router
});
