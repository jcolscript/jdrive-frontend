import React, { Component } from 'react';

import utils from '../../utils';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import './styles.css';

export default class Main extends Component {
  state = {
    newFolder: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = utils.storageGetItem('@JDriveToken');
    console.log(token);
    const response = await api.post('/folders', 
    {
      title: this.state.newFolder,
    },
    { 
      headers: {
        "x-access-token": token
      }
    });

    console.log(response);
  }

  handleInputChange = (e) => {
    this.setState({
      newFolder: e.target.value
    });
  }

  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit} action="">
                <img className="logo" width="250px" src= {logo} alt="" />
                <input 
                  placeholder="Criar uma pasta"
                  value = {this.state.newFolder}
                  onChange = {this.handleInputChange}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
