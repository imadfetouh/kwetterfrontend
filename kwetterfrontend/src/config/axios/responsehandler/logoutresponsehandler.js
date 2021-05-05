export default class LogoutResponseHandler {

    constructor(c) {
        this.c = c
    }

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        window.location.href = "/auth"
    }
}