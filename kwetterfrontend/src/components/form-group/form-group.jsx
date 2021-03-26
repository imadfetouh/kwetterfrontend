import React from 'react'
import './form-group.css'

export default class FormGroup extends React.Component {
    render() {
        return (
            <div className="form-group">
                {this.props.children}
                <div className="inputBorder"></div>
            </div>
        )
    }
}