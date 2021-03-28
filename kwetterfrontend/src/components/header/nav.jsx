import React from 'react';
import './nav.css'
import logo from '../../img/duck.png'
import FormGroup from '../form-group/form-group'
import InputField from '../input/inputfield/inputfield'
import {reactLocalStorage} from 'reactjs-localstorage'

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                                    <InputField type="text" placeholder="Search.." id="search"/>
                                </FormGroup>
                            </div>
                        </div>
                        <div id="menuRight" className="flexCenter">
                            <div id="menuUsername">
                                <label id="lblMenuUsername">{reactLocalStorage.get('username', true)}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav