export default class AddTweetErrorHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        if(this.error.response) {
            if(this.error.response.status === 400) {
                this.c.setState({notificationMessage: "Please add some content first"})
            }
            else if(this.error.response.status === 422) {
                this.c.setState({notificationMessage: "Tweet content is not acceptable"})
            }
            else{
                this.c.setState({notificationMessage: "Oops! Something went wrong"})
            }
        }
        else{
            this.c.setState({notificationMessage: "Oops! Something went wrong"})
        }

        this.c.setState({showLoader: false})
    }
}