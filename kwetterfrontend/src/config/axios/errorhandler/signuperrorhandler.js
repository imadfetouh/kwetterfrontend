export default class SignUpResponseHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        if(this.error.response) {
            if(this.error.response.status === 400) {
                this.c.setState({notificationMessage: "Please fill all fields correct in"})
            }
            else if(this.error.response.status === 409) {
                this.c.setState({notificationMessage: "This username is already in use. Please choose another"})
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