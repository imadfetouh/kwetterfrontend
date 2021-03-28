import React from 'react' 
import './new.css'
import logo from '../../../img/duck.png'
import FormGroup from '../../form-group/form-group'
import TextArea from '../../input/textarea/textarea'
import Button from '../../button/button'
import {reactLocalStorage} from 'reactjs-localstorage'

export default class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            placeholder: "What are you doing, " + reactLocalStorage.get('username', true) + "?"
        }
    }

    render() {
        return (
            <div id="new" className="boxShadow rounded">
                <div id="newFlex">
                    <div id="userPic" className="flexCenterTop">
                        <img src={logo} alt=""/>
                    </div>
                    <div id="tweetInputWrapper" className="flexCenterLeft">
                        <FormGroup>
                            <TextArea placeholder={this.state.placeholder} id="newTweet" maxLength="10" />
                        </FormGroup>
                        <Button value="Add tweet" onClick={this.signIn}></Button>
                    </div>
                </div>
            </div>
        )
    }
}