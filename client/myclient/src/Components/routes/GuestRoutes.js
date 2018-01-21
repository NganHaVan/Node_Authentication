import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux'


const GuestRoutes = ({isAuthenticated,component:Component,...rest}) =>  {
    return (
    <div>
        <Route {...rest} render={ props => 
            (!isAuthenticated)?(<Component {...props}/>):(<Redirect to='/profile'/>)} 
            />    
    </div>
    )
};

function mapStateToProps(state){
    return {
        isAuthenticated:!!state.user.token
    }
}

export default connect(mapStateToProps)(GuestRoutes)
