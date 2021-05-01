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
import GetTrendsResponseHandler from '../../config/axios/responsehandler/gettrendsresponsehandler'
import GetTrendsErrorHandler from '../../config/axios/errorhandler/gettrendserrorhandler'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoader: false,
            notificationMessage: "",
            notificationTrendMessage: "",
            tweets: [],
            mentions: [],
            trends: []
        }
        this.getTweets = this.getTweets.bind(this)
        this.getTrends = this.getTrends.bind(this)
    }

    getTweets() {
        this.setState({showLoader: true})
        axios("GET", urls.tweet, null, null, new GetTweetsResponseHandler(this), new GetTweetsErrorHandler(this))
    }

    getTrends() {
        axios("GET", urls.trends, null, null, new GetTrendsResponseHandler(this), new GetTrendsErrorHandler(this))
    }

    getTweetTrends(trend) {
        const trendWithoudHashtag = trend.substring(1)
        this.setState({showLoader: true})
        axios("GET", urls.trends + '/' + trendWithoudHashtag, null, null, new GetTweetsResponseHandler(this), new GetTweetsErrorHandler(this))
    }

    componentDidMount() {
        this.getTweets()
        this.getTrends()
    }

    render() {
        return (
            <div className="wrapper">
                <div id="flexColumnWrapper">
                    <Menu></Menu>
                    <div id="flexRowWrapper">
                        <div id="mentionWrapper">
                            <div className="boxShadow rounded mentionBox paddingBox">
                                <h4>Your mentions</h4>
                                <div>

                                </div>
                            </div>
                        </div>
                        <div id="overviewWrapper">
                            <Notification message={this.state.notificationMessage}/>
                            <Spinner showLoader={this.state.showLoader}/>
                            <New></New>
                            {this.state.tweets.map((t, i) => {
                                return (
                                    <div className="boxShadow rounded tweetBox paddingBox">
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
                        <div id="trendWrapper">
                            <Notification message={this.state.notificationTrendMessage}/>
                            <div className="boxShadow rounded trendBox paddingBox">
                                <h4>Trends</h4>
                                {this.state.trends.map((t, i) => {
                                return (
                                    <label className="lblTrend" onClick={() => this.getTweetTrends(t.trend)}>{t.trend}</label>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}