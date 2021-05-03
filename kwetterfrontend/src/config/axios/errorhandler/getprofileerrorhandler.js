export default class GetProfileErrorHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        this.c.setState({notificationTrendMessage: "Oops! Something went wrong"})
        this.c.setState({showLoader: false})
    }
}