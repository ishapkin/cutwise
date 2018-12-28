<template>
    <div id="login"></div>
</template>

<script>
    import axios from 'axios'
    import config from '../config'

    let conf = config.cutwise;

    export default {
        name: "Login",
        mounted() {
            axios.get(conf.baseUrl + 'oauth/v2/token?grant_type=password&username='+conf.username+'&password=' + conf.password + '&client_id=' + conf.client + '&client_secret=' + conf.secret)
                .then(res => {
                    localStorage.setItem('token', res.data.access_token);
                    axios.interceptors.request.use(config => {
                        config.baseURL = conf.baseUrl
                        config.headers = Object.assign(config.headers, { 'Authorization': 'Bearer ' + res.data.access_token })
                        return config
                    })
                    this.$router.push({
                        path: '/products'
                    })
                })
        }
    }
</script>

<style scoped>
    #login {
        margin-top: calc(50% - 10px);
    }
</style>