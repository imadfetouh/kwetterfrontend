import React from 'react'
import './home.css'
import logo from '../../img/duck.png'
import Menu from '../../components/header/nav'
import New from '../../components/tweet/new/new'
import axios from '../../config/axios/axios'
import urls from '../../config/urls/requesturls'
import Spinner from '../../components/loader/spinner'
import Notification from '../../components/notification/notification'
import GetTweetsResponseHandler from '../../config/axios/responsehandler/gettweetsresponsehandler'
import GetTweetsErrorHandler from '../../config/axios/errorhandler/gettweetserrorhandler'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoader: false,
            notificationMessage: "",
            tweets: []
        }
        this.getTweets = this.getTweets.bind(this)
    }

    getTweets() {
        this.setState({showLoader: true})
        axios("GET", this, urls.tweet, null, null, new GetTweetsResponseHandler(this), new GetTweetsErrorHandler(this))
    }

    componentDidMount() {
        this.getTweets()
    }

    render() {
        return (
            <div className="wrapper">
                <div id="flexColumnWrapper">
                    <Menu></Menu>
                    <div id="overviewWrapper">
                        <Notification message={this.state.notificationMessage}/>
                        <Spinner showLoader={this.state.showLoader}/>
                        <New></New>
                        {this.state.tweets.map((t, i) => {
                            return (
                                <div className="boxShadow rounded contentBox tweetBox">
                                    <div className="tweetFlex">
                                        <div className="tweetPic flexCenterTop">
                                            <img src={logo} alt=""/>
                                        </div>
                                        <div className="tweetData flexCenterLeft">
                                            <div className="tweetUsername">
                                                <label>{t.user.username}</label>
                                            </div>
                                            <div className="tweetDate">
                                                <label>{t.date} | {t.time}</label>
                                            </div>
                                            <div className="tweetContent">
                                                <p>{t.content}</p>
                                            </div>
                                            <div className="tweetActions">
                                                <label>{t.likes} likes</label>
                                                <span>&#9825;</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}