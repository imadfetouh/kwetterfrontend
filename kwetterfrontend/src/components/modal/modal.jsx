import React from 'react'
import './modal.css'
import Spinner from '../../components/loader/spinner'
import Button from '../../components/button/button'

export default class Modal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="modal" className="flexCenter">
                <div id="contentWrapper" className="boxShadow rounded">
                    <Spinner showLoader={this.props.showLoader}/>
                    <div id="modalContent">
                        <div id="modalHeader">
                            <h3>{this.props.header}</h3>
                        </div>
                        <div id="modalBody">
                            {this.props.children}
                        </div>
                        <div id="modalFooter">
                            <div id="buttonWrapper">
                                <Button value="Close" onClick={this.props.onClick}></Button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}