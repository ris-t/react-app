import axios from 'axios';
import API_KEY from './keys';

const instance = axios.create({
    baseURL: 'https://developers.zomato.com/api/v2.1',
    headers: {'user-key': API_KEY,  
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export { instance };