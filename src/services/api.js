
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jdrive-backend.herokuapp.com'
});

export default api;