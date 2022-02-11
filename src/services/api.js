import axios from "axios";

const fetchJSON = (url) => {

    return axios.get(url)
        .then(response => response.data)
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
        
};

export { fetchJSON };