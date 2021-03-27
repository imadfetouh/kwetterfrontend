export default class AuthResponseHandler {

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            window.location.href = "/"
        }
    }

}