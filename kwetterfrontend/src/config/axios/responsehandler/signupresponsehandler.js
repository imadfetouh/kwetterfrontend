import {reactLocalStorage} from 'reactjs-localstorage';

export default class SignUpResponseHandler {

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            const response = this.result.data
            reactLocalStorage.set('username', response.username)
            reactLocalStorage.set('role', response.role)
            reactLocalStorage.set('userId', response.userId)
            window.location.href = "/"
        }
    }
}