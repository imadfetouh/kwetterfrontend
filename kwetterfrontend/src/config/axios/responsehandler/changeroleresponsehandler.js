export default class ChangeRoleResponseHandler {

    constructor(c, event) {
        this.c = c
        this.event = event
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({notificationMessage: ""})
            this.event.target.disabled = false
        }
    }
}