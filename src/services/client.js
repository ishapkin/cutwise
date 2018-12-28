import axios from 'axios'
import config from '../config'
import './auth'

let token = localStorage.getItem('token');

if(!token) {
    location.reload()
}

let client = axios.create({
    baseURL: config.cutwise.baseUrl,
    headers: { 'Authorization': 'Bearer ' + token }
});

export default client;