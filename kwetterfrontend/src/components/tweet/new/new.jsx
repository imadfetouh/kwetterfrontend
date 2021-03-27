import React from 'react' 
import './new.css'
import logo from '../../../img/duck.png'
import FormGroup from '../../form-group/form-group'
import InputField from '../../input/inputfield/inputfield'

export default class New extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="new" className="contentWrapper">
                <div id="newFlex">
                    <div id="userPic">
                        <img src={logo} alt=""/>
                    </div>
                    <div id="tweetInputWrapper">
                        <FormGroup>
                            <InputField type="text" placeholder="What are you doing?" id="newTweet"/>
                        </FormGroup>
                    </div>
                </div>
            </div>
        )
    }
}