import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// todo Иконкаларды жеке-жеке загрузить ету
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue2TouchEvents from 'vue2-touch-events'
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
