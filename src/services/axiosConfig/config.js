import axios from 'axios';
import { BASE_API_URL } from '../../constants/constant';

const instance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'X-Parse-Application-Id': 'RoARvQa9MJl5MitnLouBsGo85mVoFbTvWX42mr7M',
        'X-Parse-REST-API-Key': '0alnWeCtqSMYmLpp8aBzL1V6ppdHbFglPhEYPZ98',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(function (config) {
    return config;
});


export default instance;