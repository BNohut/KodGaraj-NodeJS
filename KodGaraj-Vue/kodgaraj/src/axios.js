import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.headers['token'] = "Bearer " + localStorage.getItem('token');
axios.defaults.headers['Content-Type'] = 'application/json'

