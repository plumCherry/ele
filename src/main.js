import Vue from 'vue'
import app from './App.vue'
import router from './router'

new Vue ({
  el: '#app',
  render: h => h(app),
  router
});
