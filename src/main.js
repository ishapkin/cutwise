import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import config from './config'

let conf = config.cutwise;

Vue.config.productionTip = false

if(localStorage.getItem('token')) {
    axios.interceptors.request.use(config => {
        config.baseURL = conf.baseUrl
        config.headers = Object.assign(config.headers, { 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return config
    })
}

new Vue({
  render: h => h(App),
    router,
}).$mount('#app')
