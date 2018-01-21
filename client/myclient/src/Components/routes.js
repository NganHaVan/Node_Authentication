import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';

import Home from './Main/Home';
import Login from './Main/Login';
import Signup from './Main/Signup';
import Profile from './Main/Profile';

// loggedin user cannot access to /signup /login via GuestRoutes
// strangers cannot access to /profile via UserRoutes
import UserRoutes from './routes/UserRoutes';
import GuestRoutes from './routes/GuestRoutes';


export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <GuestRoutes path="/login" exact component={Login} />
                    <GuestRoutes path="/signup" exact component={Signup} />
                    <UserRoutes path='/profile' exact component={Profile}/>
                </Switch>
            </div>
        )
    }
}
