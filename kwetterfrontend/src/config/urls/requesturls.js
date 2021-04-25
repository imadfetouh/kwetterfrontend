const gateway = 'http://zuulproxyservice-service:8080/'

const urls = {
    signIn: gateway + 'signin',
    signUp: gateway + 'signup'
}

export default urls;