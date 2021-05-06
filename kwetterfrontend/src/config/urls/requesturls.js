const gateway = 'http://20.80.120.180:8080/'
//const gateway = 'http://localhost:8080/'

const urls = {
    signIn: gateway + 'signin',
    signUp: gateway + 'signup',
    tweet: gateway + 'tweet',
    mentions: gateway + 'mention',
    trends: gateway + 'trend',
    like: gateway + 'like',
    profile: gateway + 'profile',
    following: gateway + 'following',
    search: gateway + 'search',
    adminusers: gateway + 'adminuser',
    adminrole: gateway + 'adminrole',
    moderatorusers: gateway + 'moderatoruser',
    moderatorrole: gateway + 'moderatorrole',
    logout: gateway + 'logout'
}

export default urls;