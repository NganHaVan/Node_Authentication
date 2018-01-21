import React, { Component } from 'react';
import {connect} from 'react-redux';

import ConfirmMessage from '../messages/ConfirmMessage';

class Profile extends Component {
    render() {
        return (
            <div>
            {(!this.props.isConfirmed)?(<ConfirmMessage/>):(<h1>Profile</h1>)}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        isConfirmed:!!state.user.confirmed
    }
}
export default connect(mapStateToProps)(Profile);