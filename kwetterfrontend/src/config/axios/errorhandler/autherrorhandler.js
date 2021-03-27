export default class AuthResponseHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        if(this.error.response) {
            if(this.error.response.status === 400) {
                this.c.setState({notificationMessage: "You entered a wrong combination"})
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