import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mm-mail-back.vercel.app/'
    //baseURL: 'http://localhost:5000'
});

export default api;