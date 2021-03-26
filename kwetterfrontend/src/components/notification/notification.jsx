import React from 'react'
import './notification.css'

export default class Notification extends React.Component {

    render() {
        const notificationMessage = this.props.message;

        const renderNotification = function() {
            if(notificationMessage.trim() !== "") {
                return (
                    <div className="notificationWrapper">
                        <div className="notification">
                            <div className="notificationMessage">
                                <label className="lblNotification">{notificationMessage}</label>
                            </div>
                        </div>
                    </div>
                )
            }
            
            return null;
        }

        return (
            renderNotification()
        )
    }
}