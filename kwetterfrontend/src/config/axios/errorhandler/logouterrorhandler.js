export default class LogoutErrorHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        console.log(this.error)
    }
}