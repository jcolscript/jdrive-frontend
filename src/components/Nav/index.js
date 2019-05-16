/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import utils from '../../utils';

import logo from '../../assets/logo.svg';
import './styles.css';
import { Link } from 'react-router-dom'

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
  }

  logout = async e => {
    await utils.storageRemoveItem('@JDriveToken');
  }

  render() {
    return [
      <div id="nav-container">
          <div className="nav_primary_placeholder">
            <div className="nav nav_primary">
              <div className="container nav__container">
                <div className="brand .brand__logo">
                <Link to="/jdrive"><img width="150px" src= {logo} alt="" /></Link>
                </div>
                <div className="userInfo">
                    <img className="avatar" src={this.state.avatar} alt="avatar"/>
                    <span className="drop">{this.state.name} {this.state.lastName}</span>
                    <div className="drop-content">
                      <a>Account</a>
                      <Link onClick={this.logout} to="/">Sair</Link>
                    </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    ];
  }
}
