import React from 'react'
import '../input.css'
import './textarea.css'

export default class TextArea extends React.Component {
    render() {
        return (
            <textarea placeholder={this.props.placeholder} id={this.props.id} maxLength={this.props.maxLength} autoComplete="off" className="input"></textarea>
        )
    }
}