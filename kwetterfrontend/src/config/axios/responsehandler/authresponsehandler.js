import {reactLocalStorage} from 'reactjs-localstorage';

export default class AuthResponseHandler {

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            const response = this.result.data
            reactLocalStorage.set('username', response.username)
            window.location.href = "/"
        }
    }

}