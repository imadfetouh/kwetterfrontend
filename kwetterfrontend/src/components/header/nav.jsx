import React from 'react';
import './nav.css'
import logo from '../../img/duck.png'
import manager from '../../img/manager.png'
import FormGroup from '../form-group/form-group'
import InputField from '../input/inputfield/inputfield'
import Button from '../button/button'
import Notification from '../notification/notification'
import {reactLocalStorage} from 'reactjs-localstorage'
import {debounce} from 'debounce'
import urls from '../../config/urls/requesturls'
import axios from '../../config/axios/axios'
import SearchResponseHandler from '../../config/axios/responsehandler/searchresponsehandler'
import SearchErrorHandler from '../../config/axios/errorhandler/searcherrorhandler'
import LogoutResponseHandler from '../../config/axios/responsehandler/logoutresponsehandler'
import LogoutErrorHandler from '../../config/axios/errorhandler/logouterrorhandler'

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: reactLocalStorage.get('userId'),
            results: [],
            notificationMessage: ""
        }
        this.search = debounce(this.search.bind(this), 300)
        this.logout = this.logout.bind(this)
    }

    search(event) {
        const search = event.target.value.trim()
        
        if(search !== "") {
            axios("GET", urls.search + '?search=' + search, null, null, new SearchResponseHandler(this), new SearchErrorHandler(this))
        }
        else {
            this.setState({results: []})
        }
    }

    viewResult(itemId) {
        window.location.href = "/profile?userId=" + itemId
    }

    logout() {
        axios("GET", urls.logout, null, null, new LogoutResponseHandler(this), new LogoutErrorHandler(this))
    }

    render() {
        const role = reactLocalStorage.get('role');
        let searchResults;
        let showAdminIcon;

        if(this.state.results.length > 0) {
            searchResults = (
                this.state.results.map((r, i) => {
                    return (
                        <div className="resultItem" key={i} onClick={() => this.viewResult(r.itemId)}>
                            <div className="itemPhoto">
                                <img src={logo} />
                            </div>
                            <div className="itemDescription">
                                <p>{r.description}</p>
                                <small>{r.type}</small>
                            </div>
                        </div>
                    )
                })
            )
        }

        if(role === "ADMINISTRATOR") {
            showAdminIcon = ( 
                <div id="menuManager" className="flexCenter">
                    <a href="/manage" className="flexCenter"><img src={manager} id="manager" alt=""/></a>
                </div>
            )
        }

        return (
            <div className="wrapper">
                <div id="menuWrapper" className="boxShadow">
                    <div id="menuFlexRow">
                        <div id="menuLeft">
                            <div id="menuLogo" className="flexCenterLeft">
                                <img src={logo} alt=""/>
                            </div>
                            <div id="menuSearch" className="flexCenterLeft">
                                <FormGroup>
                                    <InputField type="text" placeholder="Search.." id="search" onKeyUp={this.search}/>
                                </FormGroup>
                                <div id="resultsWrapper" className="boxShadow">
                                    <Notification message={this.state.notificationMessage}/>
                                    <div id="searchResults">
                                        {searchResults}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="menuRight" className="flexCenter">
                            {showAdminIcon}
                            <div id="menuUsername" className="flexCenter">
                                <a href={"/profile?userId="+this.state.userId} className="flexCenter">
                                    <label id="lblMenuUsername">{reactLocalStorage.get('username')}</label>
                                </a>
                            </div>
                            <div id="menuLogout" className="flexCenter">
                                <Button value="Logout" onClick={this.logout}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav