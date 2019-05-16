import React, { Component } from 'react';
import swal from 'sweetalert';

import api from '../../services/api';
import utils from '../../utils';

import logo from '../../assets/logo.svg';
import './styles.css';

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        let dataToSend = {
            email: email,
            password: password
        }    
        
        if(!email.length) return;
        if(!password.length) return;

        await api.post('/users/signin', dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res => {

                if(res.status === 200){
                    utils.storageSetItem('@JDriveToken', res.data.jdrive_token)
                    this.props.history.push('/jdrive');
                }
            })
            .catch(error => {
                const resData = error.response.data;
                if(!resData.success){
                    swal({
                        text: "Usuário ou senha invalidos",
                        icon: "warning",
                      });
                }
                
            });

    };

    // handleRegister = (e) => {
    //     this.props.history.push('user/register');
    // }

    handleUserChange = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    handlePassChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };


  render() {
    return (
        <div id="login-container">
            <form onSubmit={this.handleSubmit}>
                <img className="logo" width="250px" src={logo} alt="JDrive"/>
                <input
                    value={this.state.email}
                    onChange={this.handleUserChange}
                    placeholder="Nome de usuário"
                    type="email"
                    required
                />
                <input
                    value={this.state.password}
                    onChange={this.handlePassChange}
                    placeholder="Senha"
                    type="password"
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
  }
}