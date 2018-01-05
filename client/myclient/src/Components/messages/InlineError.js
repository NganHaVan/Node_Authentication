import React, { Component } from 'react'

export default class InlineError extends Component {
    render() {
        return (
            <div>
                <span style={{color:'#D92B30'}}>{this.props.text}</span>
            </div>
        )
    }
}
