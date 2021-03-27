import React from 'react'
import './home.css'
import New from '../../components/tweet/new/new'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="wrapper">
                <div id="flexColumnWrapper">
                    <div id="overviewWrapper">
                        <New></New>
                    </div>
                </div>
            </div>
        )
    }
}