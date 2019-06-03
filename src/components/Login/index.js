import React, { Component } from 'react';
import swal from 'sweetalert';
import { StageSpinner   } from "react-spinners-kit";

import api from '../../services/api';
import utils from '../../utils';

import logo from '../../assets/logo.svg';
import './styles.css';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        this.setState({loading: true})
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
                    this.setState({loading: false})
                    utils.storageSetItem('@JDriveToken', res.data.jdrive_token)
                    this.props.history.push('/jdrive');
                }
            })
            .catch(error => {
                console.log(error);
                const resData = error.response.data;
                if(!resData.success || error){
                    this.setState({loading: false})
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
                {this.state.loading && 
                    <StageSpinner  
                        size={60}
                        color="#D14827"
                        loading={this.state.loading}
                    />
                }
                {!this.state.loading && <button type="submit">Entrar</button>}
            </form>
        </div>
    );
  }
}