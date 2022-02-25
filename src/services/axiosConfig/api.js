import axios from 'axios';
import { RAZORPAY_KEY, RAZORPAY_SECRET } from '../../constants/constant';
import axiosConfig from './config';

const setHeader = (type) =>{
    if(type === 'map')
    {
        delete axiosConfig.defaults.headers['X-Parse-Application-Id'];
        delete axiosConfig.defaults.headers['X-Parse-REST-API-Key'];
    }
}

const fetchJSON = (url, type = '') => {

    return axiosConfig.get(url)
        .then(response => response.data)
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
        
};

const postJSON = (url, options = {}, type = '') => {
    
    return axiosConfig.post(url, options)
        .then(response => response.data)
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
};

const putJSON = (url, options = {}) => {
    
    return axiosConfig.put(url, options)
        .then(response => response.data)
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
        
};

export { fetchJSON, postJSON, putJSON };