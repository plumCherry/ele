import Vue from 'vue'
import app from './App.vue'
import router from './router'
import './common/stylus/index.styl'

new Vue ({
  el: '#app',
  render: h => h(app),
  router
});
