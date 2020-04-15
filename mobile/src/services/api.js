import axios from 'axios';

//usando a lib axios, p/ criar a conexão com o bd
const api = axios.create ({
    baseURL: 'http://172.20.0.50:3333'
});

export default api;