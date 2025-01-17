import axios from 'axios'

const instance = axios.create({
    withCredentials: true
})

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
            window.location.href = "http://20.80.120.56:3000/auth"
        }
    }
    return Promise.reject(error)

});

export default function(type, url, data, headers, responseHandler, errorHandler) {
    instance({
        method: type,
        url: url,
        data: data,
        headers: headers
    })
    .then((result) => {
        if(responseHandler !== null) {
            responseHandler.setResult(result)
            responseHandler.handleResponse()
        }
    })
    .catch((error) => {
        if(errorHandler !== null) {
            errorHandler.setError(error)
            errorHandler.handleError()
        }
    })
}