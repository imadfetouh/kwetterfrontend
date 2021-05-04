export default class SearchResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            this.c.setState({results: this.result.data})
            console.log(this.result.data)
            this.c.setState({notificationMessage: ""})
        }
        else if(this.result.status === 204) {
            this.c.setState({results: []})
            this.c.setState({notificationMessage: "Nothing found"})
        }

       
    }
}