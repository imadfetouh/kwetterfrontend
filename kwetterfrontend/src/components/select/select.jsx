import React from 'react'
import './select.css'

export default class Select extends React.Component {
    render() {
        return (
            <select id={this.props.id} onChange={this.props.onChange} className="input">
                {this.props.children}
            </select>
        )
    }
}