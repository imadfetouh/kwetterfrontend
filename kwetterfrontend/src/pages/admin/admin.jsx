import React from 'react'
import './admin.css'
import Menu from '../../components/header/nav'
import FormGroup from '../../components/form-group/form-group'
import InputField from '../../components/input/inputfield/inputfield'
import Select from '../../components/select/select'
import Roles from '../../components/select/roles'
import axios from '../../config/axios/axios'
import urls from '../../config/urls/requesturls'
import GetUsersResponseHandler from '../../config/axios/responsehandler/getusersresponsehandler'
import GetUsersErrorHandler from '../../config/axios/errorhandler/getuserserrorhandler'
import AddUserResponseHandler from '../../config/axios/responsehandler/adduserresponsehandler'
import AddUserErrorHandler from '../../config/axios/errorhandler/addusererrorhandler'
import DeleteUserResponseHandler from '../../config/axios/responsehandler/deleteuserresponsehandler'
import DeleteUserErrorHandler from '../../config/axios/errorhandler/deleteusererrorhandler'
import Spinner from '../../components/loader/spinner'
import Notification from '../../components/notification/notification'
import Button from '../../components/button/button'
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoader: false,
            notificationMessage: "",
            users: []
        }
        this.getUsers = this.getUsers.bind(this)
        this.addUser = this.addUser.bind(this)
    }

    selectPhoto() {
        document.getElementById("newUserPhoto").click()
    }

    setPhoto() {
        const src = document.getElementById("newUserPhoto");

        document.getElementById("selectedImage").innerText = src.files[0].name
    }

    getUsers() {
        this.setState({showLoader: true})
        axios("GET", urls.users, null, null, new GetUsersResponseHandler(this), new GetUsersErrorHandler(this))
    }

    addUser() {
        const src = document.getElementById("newUserPhoto");
        const role = document.getElementById("newUserRole").value.trim()
        const username = document.getElementById("newUserUsername").value.trim()
        const photo = src.files[0]
        const bio = document.getElementById("newUserBio").value.trim()
        const location = document.getElementById("newUserLocation").value.trim()
        const website = document.getElementById("newUserWebsite").value.trim()
        const password = document.getElementById("newUserPassword").value.trim()

        if(role === "" || username === "" || photo.name.trim() === "" || bio === "" || location === "" || website === "" || password === "") {
            this.setState({notificationMessage: "Please fill all fields in"})
        }
        else {
            const user = {role: role, username: username, password: password, photo: photo.name.trim(), profile: {bio: bio, location: location, website: website}}
            const jsonUser = JSON.stringify(user)

            let formData = new FormData()
            formData.append('user', jsonUser)
            formData.append('photo', photo)

            const headers = {"headers": {"content-type": "multipart/form-data"}}
            const data = formData
            
            this.setState({showLoader: true})
            axios("POST", urls.users, data, headers, new AddUserResponseHandler(this), new AddUserErrorHandler(this))
        }
    }

    deleteUser(userId) {
        this.setState({showLoader: true})
        axios("DELETE", urls.users + "/" + userId, null, null, new DeleteUserResponseHandler(this), new DeleteUserErrorHandler(this))
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const role = reactLocalStorage.get('role')
        let userForm;
        if(role === "ADMINISTRATOR") {
            userForm = (
                <tr>
                    <td>
                        <Select id="newUserRole">
                            <option value="user">USER</option>
                            <option value="MODERATOR">MODERATOR</option>
                            <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                        </Select>
                    </td>
                    <td>
                        <FormGroup>
                            <InputField type="text" placeholder="Username" id="newUserUsername"/>
                        </FormGroup>
                    </td>
                    <td id="photo">
                        <input type="file" id="newUserPhoto" onChange={this.setPhoto}/>
                        <FormGroup>
                            <Button value="Select photo" onClick={this.selectPhoto}></Button>
                        </FormGroup>
                        <span id="selectedImage"></span>
                    </td>
                    <td>
                        <FormGroup>
                            <InputField type="text" placeholder="Bio" id="newUserBio"/>
                        </FormGroup>
                    </td>
                    <td>
                        <FormGroup>
                            <InputField type="text" placeholder="Location" id="newUserLocation"/>
                        </FormGroup>
                    </td>
                    <td>
                        <FormGroup>
                            <InputField type="text" placeholder="Website" id="newUserWebsite"/>
                        </FormGroup>
                    </td>
                    <td>
                        <FormGroup>
                            <InputField type="password" placeholder="Password" id="newUserPassword"/>
                        </FormGroup>
                    </td>
                    <td>
                        <FormGroup>
                            <Button value="Add" onClick={this.addUser}></Button>
                        </FormGroup>
                    </td>
                </tr>
            )
        }


        return (
            <div className="wrapper">
                <div className="flexColumnWrapper">
                    <Menu></Menu>
                    <div className="flexColumnWrapper">
                        <Notification message={this.state.notificationMessage}/>
                        <Spinner showLoader={this.state.showLoader}/>
                        <div id="overviewWrapper">
                            <div id="filterWrapper">
                                <div className="filterItem">
                                    <FormGroup>
                                        <InputField type="text" placeholder="Search user" id="searchUsername"/>
                                    </FormGroup>
                                </div>
                            </div>
                            <div id="usersWrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>Username</th>
                                            <th>Photo</th>
                                            <th>Bio</th>
                                            <th>Location</th>
                                            <th>Website</th>
                                            <th>Password</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userForm}
                                        {this.state.users.map((u, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td><Roles role={u.role} userId={u.userId}/></td>
                                                    <td>{u.username}</td>
                                                    <td>{u.photo}</td>
                                                    <td>{u.bio}</td>
                                                    <td>{u.location}</td>
                                                    <td>{u.website}</td>
                                                    <td>(Encrypted)</td>
                                                    <td>
                                                        <FormGroup>
                                                            <Button value="Delete" onClick={() => this.deleteUser(u.userId)}></Button>
                                                        </FormGroup>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}