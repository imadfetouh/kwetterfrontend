export default class GetTrendsResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({trends: this.result.data})
            this.c.setState({notificationTrendMessage: ""})
        }
        else if(this.result.status === 204) {
            this.c.setState({notificationTrendMessage: "No trends found"})
        }
        else{
            this.c.setState({notificationTrendMessage: "Oops! Something went wrong"})
        }
    }
}