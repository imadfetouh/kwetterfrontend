import React from 'react'
import './home.css'
import Menu from '../../components/header/nav'
import New from '../../components/tweet/new/new'
import axios from '../../config/axios/axios'
import Tweet from '../../components//tweet/tweet/tweet'
import FormGroup from '../../components/form-group/form-group'
import Button from '../../components/button/button'
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
            trends: []
        }
        this.getTweets = this.getTweets.bind(this)
        this.getTrends = this.getTrends.bind(this)
        this.getMentions = this.getMentions.bind(this)
    }

    getTweets() {
        this.setState({showLoader: true})
        axios("GET", urls.tweet, null, null, new GetTweetsResponseHandler(this), new GetTweetsErrorHandler(this))
    }

    getTrends() {
        axios("GET", urls.trends, null, null, new GetTrendsResponseHandler(this), new GetTrendsErrorHandler(this))
    }

    getMentions() {
        this.setState({showLoader: true})
        axios("GET", urls.mentions, null, null, new GetTweetsResponseHandler(this), new GetTweetsErrorHandler(this))
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
                            <div className="boxShadow rounded filterBox paddingBox">
                                <h4>Filter</h4>
                                <div>
                                    <FormGroup>
                                        <Button value="Show tweets" onClick={this.getTweets}></Button>
                                    </FormGroup>
                                </div>
                                <div>
                                    <FormGroup>
                                        <Button value="Show tweets where i am mentioned" onClick={this.getMentions}></Button>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                        <div id="overviewWrapper">
                            <Notification message={this.state.notificationMessage}/>
                            <Spinner showLoader={this.state.showLoader}/>
                            <New></New>
                            {this.state.tweets.map((t, i) => {
                                return <Tweet tweet={t} username={t.user.username} key={i+'tweet'}/>
                            })}
                        </div>
                        <div id="trendWrapper">
                            <Notification message={this.state.notificationTrendMessage}/>
                            <div className="boxShadow rounded trendBox paddingBox">
                                <h4>Trends</h4>
                                {this.state.trends.map((t, i) => {
                                return (
                                    <label className="lblTrend" onClick={() => this.getTweetTrends(t.trend)} key={i+'trend'}>{t.trend}</label>
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