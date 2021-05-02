const gateway = 'http://20.80.120.180:8080/'
//const gateway = 'http://localhost:8080/'

const urls = {
    signIn: gateway + 'signin',
    signUp: gateway + 'signup',
    tweet: gateway + 'tweet',
    mentions: gateway + 'mention',
    trends: gateway + 'trend',
    users: gateway + 'adminuser',
    role: gateway + 'adminrole'
}

export default urls;