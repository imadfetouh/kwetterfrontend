export default class GetUsersErrorHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        this.c.setState({notificationMessage: "Oops! Something went wrong"})
    }
}