export default class ChangeRoleErrorHandler {

    constructor(c, event) {
        this.c = c
        this.event = event
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        this.c.setState({notificationMessage: "Oops! Something went wrong"})
        this.event.target.disabled = false
    }
}