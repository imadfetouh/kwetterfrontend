export default class GetTrendsErrorHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        this.c.setState({notificationTrendMessage: "Oops! Something went wrong"})
    }
}