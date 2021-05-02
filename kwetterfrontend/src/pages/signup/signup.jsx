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
            showLoader: false,
            notificationMessage: ""
        }
        this.signUp = this.signUp.bind(this)
    }

    selectPhoto() {
        document.getElementById("signUpPhoto").click()
    }

    showPhoto() {
        const src = document.getElementById("signUpPhoto");
        const target = document.getElementById("selectedImage");

        let fr = new FileReader();
        fr.onload = function(){
            target.src = fr.result;
        }
        fr.readAsDataURL(src.files[0]);
    }

    signUp() {
        const src = document.getElementById("signUpPhoto");
        const username = document.getElementById("signUpUsername").value.trim()
        const password = document.getElementById("signUpPassword").value.trim()
        const repeatPassword = document.getElementById("signUpRepeatPassword").value.trim()
        const bio = document.getElementById("signUpBio").value.trim()
        const location = document.getElementById("signUpLocation").value.trim()
        const website = document.getElementById("signUpWebsite").value.trim()
        const photo = src.files[0]

        if(username === "" || password === "" || repeatPassword === "" || bio === "" || location === "" || website === "" || photo.name.trim() === "") {
            this.setState({notificationMessage: "Please fill all fields in"})
        }
        else if(password !== repeatPassword) {
            this.setState({notificationMessage: "Passwords don't match"})
        }
        else{
            let formData = new FormData()
            formData.append('user', JSON.stringify({username: username, password: password, repeatPassword: repeatPassword, photo: photo.name.trim(), bio: bio, location: location, website: website}))
            formData.append('photo', photo)

            const headers = {"headers": {"content-type": "multipart/form-data"}}
            const data = formData

            this.setState({showLoader: true})
           
            axios("POST", urls.signUp, data, headers, new SignUpResponseHandler(this), new SignUpErrorHandler(this))
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