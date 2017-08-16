// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import EU from 'element-ui'
import resource from 'vue-resource'
import '../static/public.css'
import store from './store/index'
import '../static/animate.css'

Vue.use(EU);
Vue.use(resource);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
