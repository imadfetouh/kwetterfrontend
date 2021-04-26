import React from 'react'
import './signup.css'
import FormGroup from '../../components/form-group/form-group'
import InputField from '../../components/input/inputfield/inputfield'
import Button from '../../components/button/button'
import axios from '../../config/axios/axios'
import urls from '../../config/urls/requesturls'
import Spinner from '../../components/loader/spinner'
import Notification from '../../components/notification/notification'
import SignUpResponseHandler from '../../config/axios/responsehandler/signupresponsehandler'
import SignUpErrorHandler from '../../config/axios/errorhandler/signuperrorhandler'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: "",
            showLoader: false,
            notificationMessage: ""
        }
        this.signUp = this.signUp.bind(this)
        this.showPhoto = this.showPhoto.bind(this)
    }

    selectPhoto() {
        document.getElementById("signUpPhoto").click()
    }

    showPhoto() {
        const src = document.getElementById("signUpPhoto");
        this.setState({photo: src.files[0].name})
        const target = document.getElementById("selectedImage");

        let fr = new FileReader();
        fr.onload = function(){
            target.src = fr.result;
        }
        fr.readAsDataURL(src.files[0]);
    }

    signUp() {
        const username = document.getElementById("signUpUsername").value
        const password = document.getElementById("signUpPassword").value
        const repeatPassword = document.getElementById("signUpRepeatPassword").value
        const bio = document.getElementById("signUpBio").value
        const location = document.getElementById("signUpLocation").value
        const website = document.getElementById("signUpWebsite").value
        const photo = this.state.photo

        if(username.trim() === "" || password.trim() === "" || repeatPassword.trim() === "" || bio.trim() === "" || location.trim() === "" || website.trim() === "" || photo.trim() === "") {
            this.setState({notificationMessage: "Please fill all fields in"})
        }
        else if(password.trim() !== repeatPassword.trim()) {
            this.setState({notificationMessage: "Passwords don't match"})
        }
        else{
            this.setState({showLoader: true})
            const headers = {"headers": {"content-type": "application/json"}}
            const data = JSON.stringify({username: username, password: password, repeatPassword: repeatPassword, photo: photo, bio: bio, location: location, website: website})
            axios("POST", this, urls.signUp, data, headers, new SignUpResponseHandler(this), new SignUpErrorHandler(this))
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div id="flexColumnWrapper">
                    <div id="signUpHeader">
                        <h1>Kwetterimad</h1>
                    </div>
                    <div id="formWrapper">
                        <div id="formCenter" className="rounded boxShadow">
                            <Spinner showLoader={this.state.showLoader}/>
                            <FormGroup>
                                <InputField type="text" placeholder="Username" id="signUpUsername"/>
                            </FormGroup>
                            <FormGroup>
                                <InputField type="password" placeholder="Password" id="signUpPassword"/>
                            </FormGroup>
                            <FormGroup>
                                <InputField type="password" placeholder="Repeat password" id="signUpRepeatPassword"/>
                            </FormGroup>
                            <FormGroup>
                                <InputField type="bio" placeholder="Bio" id="signUpBio"/>
                            </FormGroup>
                            <FormGroup>
                                <InputField type="location" placeholder="Location" id="signUpLocation"/>
                            </FormGroup>
                            <FormGroup>
                                <InputField type="Website" placeholder="Website" id="signUpWebsite"/>
                            </FormGroup>
                            <FormGroup>
                                <Button value="Select photo" onClick={this.selectPhoto}></Button>
                                <input type="file" id="signUpPhoto" onChange={this.showPhoto}/>
                                <img src="" id="selectedImage"/>
                            </FormGroup>
                            <FormGroup>
                                <Button value="Sign Up" onClick={this.signUp}></Button>
                            </FormGroup>
                            <Notification message={this.state.notificationMessage}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}