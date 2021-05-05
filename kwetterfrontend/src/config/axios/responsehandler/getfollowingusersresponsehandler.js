export default class GetFollowingUsersResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({followUsers: this.result.data})
        }
        else if(this.result.status === 204) {
            this.c.setState({followUsers: []})
        }

        this.c.setState({showModalLoader: false})
    }
}