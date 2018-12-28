import axios from 'axios'
import config from '../config'

let conf = config.cutwise;

let auth = axios.get(conf.baseUrl + 'oauth/v2/token?grant_type=password&username='+conf.username+'&password=' + conf.password + '&client_id=' + conf.client + '&client_secret=' + conf.secret)
    .then(res => {
        localStorage.setItem('token', res.data.access_token);
    });

export default auth;