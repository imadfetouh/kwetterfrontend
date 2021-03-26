import React from 'react'
import '../input.css'
import './inputfield.css'

export default class InputField extends React.Component {
    render() {
        return (
            <input type={this.props.type} placeholder={this.props.placeholder} id={this.props.id} autoComplete="off" className="input"/>
        )
    }
}