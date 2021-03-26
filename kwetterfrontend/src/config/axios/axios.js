import axios from 'axios'

const instance = axios.create()

//before request
instance.interceptors.request.use(function(config) {
    config.withCredentials = true
    return config;
}, function(error) {
    return Promise.reject(error)
});

//before response
instance.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if(error.response){
        if(error.response.status === 401) {
            window.location.href = "http://localhost:3000"
        }
    }
    return Promise.reject(error)

});

export default instance