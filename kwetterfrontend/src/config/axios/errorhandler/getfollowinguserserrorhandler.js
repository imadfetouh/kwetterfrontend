export default class GetFollowingUsersErrorHandler {

    constructor(c) {
        this.c = c
    }

    setError(error) {
        this.error = error
    }

    handleError() {
        this.c.setState({showModalLoader: false})
    }
}