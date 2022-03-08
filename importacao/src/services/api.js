import axios from 'axios';

const api = axios.create({
    //baseURL: 'smartnewsystem.com.br:21000',  //KingHost
    baseURL: 'http://localhost:3000',//Loscal host
    //baseURL: 'http://192.168.1.67:3000',//Loscal host
});

export default api;