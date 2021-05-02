export default class DeleteUserResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({notificationMessage: "User deleted succesfully!"})
            this.c.getUsers()
        }
        
        this.c.setState({showLoader: false})
    }
}