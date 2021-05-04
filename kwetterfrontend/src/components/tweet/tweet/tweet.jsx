import React from 'react'
import './tweet.css'
import logo from '../../../img/duck.png'

export default class Tweet extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                            <span>&#9825;</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}