import {reactLocalStorage} from 'reactjs-localstorage';

export default class AuthResponseHandler {

    setResult(result) {
        this.result = result
    }

    handleResponse() {
        if(this.result.status === 200) {
            const response = this.result.data
            reactLocalStorage.set('username', response.username)
            reactLocalStorage.set('role', response.role)
            reactLocalStorage.set('userId', response.userId)
            console.log(this.result.data)
            window.location.href = "/"
        }
    }

}