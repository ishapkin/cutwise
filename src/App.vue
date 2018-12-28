<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">Cutwise API test</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app'
}
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD.MM.YYYY hh:mm');
    }
})
</script>