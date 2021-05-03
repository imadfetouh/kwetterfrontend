export default class AddFollowingResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            let oldProfile = this.c.state.profile
            oldProfile.follow = 1
            oldProfile.followers++
            this.c.setState({showLoader: false})
        }
    }
}