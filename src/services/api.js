import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://jdrive-backend.herokuapp.com'
    baseURL: 'https://jdrive.azurewebsites.net'
});

export default api;