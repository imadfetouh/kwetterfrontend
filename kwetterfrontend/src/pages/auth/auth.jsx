import React from 'react';
import './auth.css'
import FormGroup from '../../components/form-group/form-group'
import InputField from '../../components/input/inputfield/inputfield'
import Button from '../../components/button/button'
import logo from '../../img/duck.png'
import axios from '../../config/axios/axios'
import qs from 'querystring'
import urls from '../../config/urls/requesturls'
import Spinner from '../../components/loader/spinner'
import Notification from '../../components/notification/notification'
import Link from 'react-router-dom/Link'

export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoader: false,
            notificationMessage: ""
        }
        this.signIn = this.signIn.bind(this)
    }

    signIn() {
        const username = document.getElementById("signInUsername").value.trim()
        const password = document.getElementById("signInPassword").value.trim()

        if(username === "" || password === "") {
            this.setState({notificationMessage: "Please fill all fields in"})
            return;
        }

        this.setState({showLoader: true})
        
        const data = {username: username, password: password}
        axios.post(urls.signIn, qs.stringify(data))
        .then((result) => {
            if(result.status === 200){
                alert("You are logged in " + result.data)
            }
        })
        .catch((error) => {
            if(error.response.status === 400){
                this.setState({showLoader: false, notificationMessage: "You entered a wrong combination"})
            }
            else{
                this.setState({showLoader: false, notificationMessage: "Oops! Something went wrong"})
            }
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div id="flexRowWrapper">
                    <div id="picWrapper">
                        <div id="authPic"></div>
                    </div>
                    <div id="formWrapper">
                        <Spinner showLoader={this.state.showLoader}/>
                        <div id="form">
                            <div id="logoWrapper">
                                <img src={logo} alt=""/>
                            </div>
                            <Notification message={this.state.notificationMessage}/>
                            <FormGroup>
                                <InputField type="text" placeholder="Your username" id="signInUsername"/>
                            </FormGroup>
                            <FormGroup>
                                <InputField type="password" placeholder="Your password" id="signInPassword"/>
                            </FormGroup>
                            <FormGroup>
                                <Button value="Sign In" onClick={this.signIn}></Button>
                            </FormGroup>
                            <span>or <Link to="/register">Create an account</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}