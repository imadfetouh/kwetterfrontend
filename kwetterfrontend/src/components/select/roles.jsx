import React from 'react'
import Select from '../../components/select/select'
import axios from '../../config/axios/axios'
import urls from '../../config/urls/requesturls'
import ChangeRoleResponseHandler from '../../config/axios/responsehandler/changeroleresponsehandler'
import ChangeRoleErrorHandler from '../../config/axios/errorhandler/changeroleerrorhandler'
import Notification from '../../components/notification/notification'
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Roles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notificationMessage: ""
        }
        this.changeRole = this.changeRole.bind(this)
    }

    changeRole(event) {
        const newRole = event.target.value
        const userId = this.props.userId

        const roleJson = JSON.stringify({userId: userId, role: newRole})

        this.setState({notificationMessage: "Please wait.."})
        event.target.disabled = true

        let formData = new FormData()
        formData.append('role', roleJson)

        const data = formData
        const url = (this.state.role === "ADMINISTRATOR") ? urls.adminrole : urls.moderatorrole
        axios("PUT", url, data, null, new ChangeRoleResponseHandler(this, event), new ChangeRoleErrorHandler(this, event))
    }

    render() {
        const role = reactLocalStorage.get('role')
        if(role === "ADMINISTRATOR") {
            return (
                <div>
                    <Notification message={this.state.notificationMessage}/>
                    <Select onChange={this.changeRole}>
                        <option value="USER" selected={this.props.role === 'USER'}>USER</option>
                        <option value="MODERATOR" selected={this.props.role === 'MODERATOR'}>MODERATOR</option>
                        <option value="ADMINISTRATOR" selected={this.props.role === 'ADMINISTRATOR'}>ADMINISTRATOR</option>
                    </Select>
                </div>
            )
        }
        else {
            if(this.props.role === "USER") {
                return (
                    <div>
                        <Notification message={this.state.notificationMessage}/>
                        <Select onChange={this.changeRole}>
                            <option value="USER" selected>USER</option>
                            <option value="MODERATOR">MODERATOR</option>
                        </Select>
                    </div>
                )
            }
            else {
                return (
                    this.props.role
                )
            }
        }
    }
}