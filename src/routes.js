import React from 'react';
import { isAuthenticated } from "./services/auth";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Login from './components/Login';
import Main from './components/Main';
import Folder from './components/Folder';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path='/jdrive' exact component={Main} />
            <PrivateRoute path='/jdrive/folder/:id' component={Folder}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;