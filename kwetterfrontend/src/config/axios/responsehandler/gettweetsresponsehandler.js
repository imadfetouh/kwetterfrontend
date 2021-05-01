export default class GetTweetsResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({tweets: this.result.data})
            this.c.setState({notificationMessage: ""})
        }
        else if(this.result.status === 204) {
            this.c.setState({tweets: []})
            this.c.setState({notificationMessage: "No tweets found. Add Some!"})
        }
        else{
            this.c.setState({notificationMessage: "Oops! Something went wrong"})
        }

        this.c.setState({showLoader: false})
    }

}