import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import './styles.css';

export default class Main extends Component {
  render() {
    return (
        <div id="main-container">
            <form action="">
                <img className="logo" width="250px" src= {logo} alt="" />
                <input placeholder="Criar uma pasta" />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
