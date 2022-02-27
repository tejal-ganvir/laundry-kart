import axios from 'axios';
import { APPLICATION_ID, BASE_API_URL, REST_API_KEY } from '../../constants/constant';

const instance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'X-Parse-Application-Id': APPLICATION_ID,
        'X-Parse-REST-API-Key': REST_API_KEY,
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(function (config) {
    return config;
});


export default instance;