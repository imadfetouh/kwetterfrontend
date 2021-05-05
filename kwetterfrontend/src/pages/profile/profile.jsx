import React from 'react'
import './profile.css'
import Menu from '../../components/header/nav'
import Tweet from '../../components//tweet/tweet/tweet'
import Button from '../../components/button/button'
import Modal from '../../components/modal/modal'
import logo from '../../img/duck.png'
import axios from '../../config/axios/axios'
import urls from '../../config/urls/requesturls'
import Spinner from '../../components/loader/spinner'
import Notification from '../../components/notification/notification'
import GetProfileResponseHandler from '../../config/axios/responsehandler/getprofileresponsehandler'
import GetProfileErrorHandler from '../../config/axios/errorhandler/getprofileerrorhandler'
import AddFollowingResponseHandler from '../../config/axios/responsehandler/addfollowingresponsehandler'
import AddFollowingErrorHandler from '../../config/axios/errorhandler/addfollowingerrorhandler'
import GetFollowingUsersResponseHandler from '../../config/axios/responsehandler/getfollowingusersresponsehandler'
import GetFollowingUsersErrorHandler from '../../config/axios/errorhandler/getfollowinguserserrorhandler'
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: reactLocalStorage.get('userId'),
            showLoader: false,
            notificationMessage: "",
            profile: {tweets:[]},
            followUsers: [],
            modalHeader: "",
            showModal: false,
            showModalLoader: false
        }
        this.getProfile = this.getProfile.bind(this)
        this.addFollow = this.addFollow.bind(this)
        this.getFollowing = this.getFollowing.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }


    getProfile() {
        const userId = this.getParameterByName("userId")
        
        this.setState({showLoader: true})
        axios("GET", urls.profile + '/' + userId, null, null, new GetProfileResponseHandler(this), new GetProfileErrorHandler(this))
    }

    addFollow() {
        const userId = this.getParameterByName("userId")
        
        this.setState({showLoader: true})
        axios("POST", urls.following + '/' + userId, null, null, new AddFollowingResponseHandler(this), new AddFollowingErrorHandler(this))
    }

    getFollowing(header) {
        const userId = this.getParameterByName("userId")
        this.setState({modalHeader: header})
        this.setState({showModalLoader: true})
        this.setState({showModal: true})

        const url = (header === "Following") ? urls.following + '/followings/' + userId : urls.following + '/followers/' + userId

        axios("GET", url, null, null, new GetFollowingUsersResponseHandler(this), new GetFollowingUsersErrorHandler(this))
    }

    componentDidMount() {
        this.getProfile()
    }

    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    closeModal() {
        this.setState({showModal: false})
    }

    render() {
        let profile = this.state.profile
        let follow;
        
        if(profile.userId !== this.state.userId && profile.follow === null) {
            follow = (
                <Button value="Follow" onClick={this.addFollow}></Button>
            )
        }

        let showUsers;
        if(this.state.showModal) {
            showUsers = (
                <Modal header={this.state.modalHeader} showLoader={this.state.showModalLoader} onClick={this.closeModal}>
                    {this.state.followUsers.map((f, i) => {
                        return (
                            <div className="followUser">
                                <div className="followUserPhoto">
                                    <img src={logo} />
                                </div>
                                <div className="followUsername flexCenterLeft">
                                    <label>{f.username}</label>
                                </div>
                            </div>
                        )
                    })}
                </Modal>
            )
        }
        
        return (
            <div className="wrapper">
                {showUsers}
                <Spinner showLoader={this.state.showLoader}/>
                <div id="flexColumnWrapper">
                    <Menu></Menu>
                    <div id="flexColumnContent">
                        <Notification message={this.state.notificationMessage}/>
                        <div id="flexRowWrapper">
                            <div id="userInfo">
                                <div id="divUsername">
                                    <label>{profile.username}</label>
                                </div>
                                <div id="divPhoto">
                                    <img src={logo} />
                                </div>
                            </div>
                            <div id="userStats">
                                <div id="divFollowers">
                                    <div className="stat">
                                        <label className="lblBold">{profile.tweets.length}</label>
                                        <label>Tweets</label>
                                    </div>
                                    <div className="stat" onClick={() => this.getFollowing("Followers")}>
                                        <label className="lblBold">{profile.followers}</label>
                                        <label>Followers</label>
                                    </div>
                                    <div className="stat" onClick={() => this.getFollowing("Following")}>
                                        <label className="lblBold">{profile.following}</label>
                                        <label>Following</label>
                                    </div>
                                </div>
                                <div id="divAdd">
                                    {follow}
                                </div>
                                <div id="divBio">
                                    <p>{profile.bio}</p>
                                </div>
                                <div id="divLocation">
                                    <label>{profile.location}</label>
                                </div>
                                <div id="divWebsite">
                                    <a href={profile.website}>{profile.website}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tweetsWrapper">
                    {profile.tweets.map((t, i) => {
                        return <Tweet tweet={t} username={profile.username}/>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}
