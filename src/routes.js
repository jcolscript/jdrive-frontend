import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './components/Login';
import Main from './components/Main';
import Folder from './components/Folder';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path='/jdrive' exact component={Main} />
            <Route path='/jdrive/folder/:id' component={Folder}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;