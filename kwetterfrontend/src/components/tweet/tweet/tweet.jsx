import React from 'react'
import './tweet.css'
import logo from '../../../img/duck.png'
import urls from '../../../config/urls/requesturls'
import axios from '../../../config/axios/axios'

export default class Tweet extends React.Component {
    constructor(props) {
        super(props)
        this.likeTweet = this.likeTweet.bind(this)
    }

    likeTweet(event) {
        event.target.classList.add("fillSpan")
        event.target.innerHTML = "&#9829;"

        const tweetId = this.props.tweet.tweetId

        axios("PUT", urls.like + "/" + tweetId, null, null, null, null)
    }

    render() {
        let userLiked = new Boolean(this.props.tweet.userLiked).toString();
        let likeBtn;

        if(userLiked !== "true") {
            likeBtn = <span onClick={this.likeTweet}>&#9825;</span>
        }
        else {
            likeBtn = <span className="fillSpan">&#9829;</span>
        }

        return (
            <div className="boxShadow rounded tweetBox paddingBox">
                <div className="tweetFlex">
                    <div className="tweetPic flexCenterTop">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="tweetData flexCenterLeft">
                        <div className="tweetUsername">
                            <label>{this.props.username}</label>
                        </div>
                        <div className="tweetDate">
                            <label>{this.props.tweet.date} | {this.props.tweet.time}</label>
                        </div>
                        <div className="tweetContent">
                            <p>{this.props.tweet.content}</p>
                        </div>
                        <div className="tweetActions">
                            <label>{this.props.tweet.likes} likes</label>
                            {likeBtn}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}