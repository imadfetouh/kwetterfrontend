export default class GetUsersResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({users: this.result.data})
            this.c.setState({searchUsers: this.result.data})
            this.c.setState({notificationMessage: ""})
        }
        else if(this.result.status === 204) {
            this.c.setState({users: []})
            this.c.setState({searchUsers: []})
            this.c.setState({notificationMessage: "No users found"})
        }

        this.c.setState({showLoader: false})
    }

}