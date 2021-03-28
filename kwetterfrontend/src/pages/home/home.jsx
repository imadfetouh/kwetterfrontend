import React from 'react'
import './home.css'
import Menu from '../../components/header/nav'
import New from '../../components/tweet/new/new'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wrapper">
                <div id="flexColumnWrapper">
                    <Menu></Menu>
                    <div id="overviewWrapper">
                        <New></New>
                    </div>
                </div>
            </div>
        )
    }
}