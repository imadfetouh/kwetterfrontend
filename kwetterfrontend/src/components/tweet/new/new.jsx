import React from 'react' 
import './new.css'
import logo from '../../../img/duck.png'
import FormGroup from '../../form-group/form-group'
import TextArea from '../../input/textarea/textarea'
import Button from '../../button/button'
import {reactLocalStorage} from 'reactjs-localstorage'
import Spinner from '../../loader/spinner'
import Notification from '../../notification/notification'
import urls from '../../../config/urls/requesturls'
import axios from '../../../config/axios/axios'
import AddTweetResponseHandler from '../../../config/axios/responsehandler/addtweetresponsehandler'
import AddTweetErrorHandler from '../../../config/axios/errorhandler/addtweeterrorhandler'

export default class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            placeholder: "What are you doing, " + reactLocalStorage.get('username', true) + "?",
            notificationMessage: "",
            showLoader: false
        }
        this.addTweet = this.addTweet.bind(this)
    }

    addTweet() {
        const content = document.getElementById("newTweet").value

        if(content.trim() === "") {
            this.setState({notificationMessage: "Please add some content first"})
            return;
        }

        let formData = new FormData()
        formData.append('content', content)

        const headers = {"headers": {"content-type": "multipart/form-data"}}
        const data = formData

        this.setState({showLoader: true})

        axios("POST", urls.tweet, data, headers, new AddTweetResponseHandler(this), new AddTweetErrorHandler(this))
    }

    render() {
        return (
            <div id="new" className="boxShadow rounded">
                <div id="newFlex">
                    <Spinner showLoader={this.state.showLoader}/>
                    <div id="userPic" className="flexCenterTop">
                        <img src={logo} alt=""/>
                    </div>
                    <div id="tweetInputWrapper" className="flexCenterLeft">
                        <FormGroup>
                            <TextArea placeholder={this.state.placeholder} id="newTweet" maxLength="140" />
                        </FormGroup>
                        <Button value="Add tweet" onClick={this.addTweet}></Button>
                        <Notification message={this.state.notificationMessage}/>
                    </div>
                </div>
            </div>
        )
    }
}