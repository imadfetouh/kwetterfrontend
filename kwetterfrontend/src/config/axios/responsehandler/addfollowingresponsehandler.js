export default class AddFollowingResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({showFollowButton: false})
        }
    }
}