import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import {get, post} from '@/utils/http.js';
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(VueClipboard)

Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
