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
            window.location.href = "http://localhost:3000/auth"
        }
    }
    return Promise.reject(error)

});

const getRequest = (c, url, data, headers, responseHandler, errorHandler) => {
    instance.get(url, data, headers)
    .then((result) => {
        responseHandler.setResult(result)
        responseHandler.handleResponse()
    })
    .catch((error) => {
        errorHandler.setError(error)
        errorHandler.handleError()
    })
}

const postRequest = (c, url, data, headers, responseHandler, errorHandler) => {
    instance.post(url, data, headers)
    .then((result) => {
        responseHandler.setResult(result)
        responseHandler.handleResponse()
    })
    .catch((error) => {
        errorHandler.setError(error)
        errorHandler.handleError()
    })
}

export default function(type, c, url, data, headers, responseHandler, errorHandler) {
    if(type === "GET") {
        getRequest(c, url, data, headers, responseHandler, errorHandler)
    }
    else if(type === "POST") {
        postRequest(c, url, data, headers, responseHandler, errorHandler)
    }
}