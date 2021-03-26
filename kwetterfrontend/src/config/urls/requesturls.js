const gateway = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080/' : 'http://zuulproxyservice-service:8080/'

const urls = {
    signIn: gateway + 'signin'
}

export default urls;