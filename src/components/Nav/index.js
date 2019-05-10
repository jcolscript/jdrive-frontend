/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import utils from '../../utils';

import logo from '../../assets/logo.svg';
import './styles.css';

export default class Nav extends Component {
  state = {
    name: '',
    lastName: '',
    email: '',
    avatar: '',
  };

  async componentDidMount() {
    const token = utils.storageGetItem('@JDriveToken');
    let userData = {};
    if (token) {userData = await utils.jwtDecode(token)}
    this.setState({
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      avatar: userData.avatar,
    })
    console.log(userData);
  }

  render() {
    return [
      <div id="nav-container">
          <div className="nav_primary_placeholder">
            <div className="nav nav_primary">
              <div className="container nav__container">
                <div className="brand .brand__logo">
                  <img width="150px" src= {logo} alt="" />
                </div>
                <div className="userInfo">
                    <img className="avatar" src={this.state.avatar} alt="avatar"/>
                    <span className="drop">{this.state.name} {this.state.lastName}</span>
                    <div className="drop-content">
                      <a>Link1</a>
                      <a>Link2</a>
                      <a>Link3</a>
                    </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    ];
  }
}
