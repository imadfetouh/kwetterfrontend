import React from 'react'
import './spinner.css'

export default class Spinner extends React.Component {
    
    render() {
        let showLoader = this.props.showLoader

        const renderLoader = function() {
            if(showLoader) {
                return (
                    <div className="loaderWrapper flexCenter">
                        <div className="spinnerWrapper">
                            <div className="spinner"></div>
                        </div>
                    </div>
                )
            }

            return null;
        }

        return (
            renderLoader()
        )
        
    }
}