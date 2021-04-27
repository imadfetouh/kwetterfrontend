export default class AddTweetResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({notificationMessage: "Tweet added!"})
        }
        else{
            this.c.setState({notificationMessage: "Oops! Something went wrong"})
        }

        this.c.setState({showLoader: false})
    }

}