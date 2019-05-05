import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';



import Main from './pages/Main'
import Login from './pages/Login';

class App extends Component {
  render() {
    document.title = 'JDrive';
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/jdrive" component={Main}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
