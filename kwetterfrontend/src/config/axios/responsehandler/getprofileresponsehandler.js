export default class GetProfileResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({profile: this.result.data})
            this.c.setState({notificationMessage: ""})
        }
        else if(this.result.status === 204) {
            this.c.setState({profile: {}})
            this.c.setState({notificationMessage: "User not found"})
        }

        this.c.setState({showLoader: false})
    }

}