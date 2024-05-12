import Axios from 'axios';

const instance = Axios.create({
    //baseURL: process.REACT_APP_API_URL,
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Content-Type' : 'application/json'
    }
});

export default instance;