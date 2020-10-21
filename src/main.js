import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './../node_modules/bulma/css/bulma.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://projeto-prova.herokuapp.com'

new Vue({
  render: h => h(App),
}).$mount('#app')

