import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import SideBarContainer from './sideBar/sideBar_container'
import MessageBoardContainer from './messageCenter/messageBoard'


const App = () => (
    <div>
        <header>

            {/* <GreetingContainer /> */}
        </header>
        <Switch>
            <AuthRoute exact path="/login" component={LogInFormContainer} />
            <AuthRoute exact path="/signup" component={SignUpFormContainer} />
            {/* <ProtectedRoute exact path= "/sidebar" component={SideBarContainer} /> */}
            <ProtectedRoute exact path="/client/:channel_id" component={MessageBoardContainer} />
            <AuthRoute exact path="/" component= {GreetingContainer}/>
        </Switch>
    </div>
);

export default App;