import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux'


const UserRoutes = ({isAuthenticated,component:Component,...rest}) =>  {
    return (
    <div>
        <Route {...rest} render={ props => 
            (isAuthenticated && isAuthenticated!==undefined)?(<Component {...props}/>):(<Redirect to='/login'/>)} 
            />    
    </div>
    )
};

function mapStateToProps(state){
    return {
        isAuthenticated:!!state.user.token
    }
}

export default connect(mapStateToProps)(UserRoutes)
