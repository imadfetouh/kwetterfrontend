import React from 'react';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }

        this.increaseCount = this.increaseCount.bind(this);
    }

    increaseCount() {
        this.setState({ count: this.state.count + 2 })
    }

    render() {
        return (
            <div class="wrapper">
                <input type="button" value="Increase Count" onClick={this.increaseCount} />
                <br />
                <label>{this.state.count}</label>
            </div>
        )
    }
}

export default Nav