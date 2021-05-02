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
            this.c.setState({notificationMessage: ""})
        }
        else if(this.result.status === 204) {
            this.c.setState({users: []})
            this.c.setState({notificationMessage: "No users found. Add some!"})
        }

        this.c.setState({showLoader: false})
    }

}