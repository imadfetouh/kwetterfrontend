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
import AuthResponseHandler from '../../config/axios/responsehandler/authresponsehandler'
import AuthErrorHandler from '../../config/axios/errorhandler/autherrorhandler'

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

        if(username.trim() === "" || password.trim() === "") {
            this.setState({notificationMessage: "Please fill all fields in"})
            return;
        }

        this.setState({showLoader: true})
        const headers = {"headers": {"content-type": "application/x-www-form-urlencoded"}}
        const data = qs.stringify({username: username, password: password})
        axios("POST", urls.signIn, data, headers, new AuthResponseHandler(), new AuthErrorHandler(this))
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
                            <div id="logoWrapper" className="flexCenter">
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}