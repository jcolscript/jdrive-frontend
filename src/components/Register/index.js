import React, { Component } from 'react';
import swal from 'sweetalert';
import { StageSpinner   } from "react-spinners-kit";

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import './styles.css';

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {name, lastName, email, password, birthDate} = this.state;
        this.setState({loading: true})
        let dataToSend = {
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            birthDate: birthDate,
        }

        console.log(dataToSend);
        
        if(!email.length) return;
        if(!password.length) return;

        await api.post('/users/signup', dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res => {
                if(res.status === 201){
                    this.setState({loading: false})
                    swal({
                        text: "Conta criada com sucesso.",
                        icon: "success",
                    });
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log(error);
                if(!error.response){
                    this.setState({loading: false})
                    swal({
                        text: "Ops, ocorreu um erro inesperado. Por favor, tente mais tarde.",
                        icon: "warning",
                      });
                } else {
                    const resData = error.response.data;
                    if(!resData.success || error){
                        this.setState({loading: false})
                        swal({
                            text: "Ops, ocorreu um erro inesperado. Por favor, tente mais tarde.",
                            icon: "warning",
                          });
                    }
                }
            });

    };

    handleLogin = (e) => {
        this.props.history.push('/');
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    handlePassChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleLastChange = (e) => {
        this.setState({
            lastName: e.target.value
        });
    };

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    handleBirthChange = (e) => {
        this.setState({
            birthDate: e.target.value
        });
    };


  render() {
    return (
        <div id="login-container">
            <form onSubmit={this.handleSubmit}>
                <img className="logo" width="250px" src={logo} alt="JDrive"/>
                <input
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    placeholder="Nome"
                    type="text"
                    required
                />
                <input
                    value={this.state.lastName}
                    onChange={this.handleLastChange}
                    placeholder="Sobrenome"
                    type="text"
                    required
                />
                <input
                    value={this.state.birthDate}
                    onChange={this.handleBirthChange}
                    placeholder="Nascimento"
                    type="date"
                    required
                />
                <input
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder="Email"
                    type="email"
                    required
                />
                <input
                    value={this.state.password}
                    onChange={this.handlePassChange}
                    placeholder="Senha"
                    type="password"
                    minLength="4"
                    required
                />
                <div className="secticon-actions">
                    {this.state.loading && 
                        <StageSpinner  
                            size={60}
                            color="#D14827"
                            loading={this.state.loading}
                        />
                    }
                    {!this.state.loading && <span onClick={this.handleLogin} className="create-acount">Fazer login</span> }
                    {!this.state.loading && <button type="submit">Salvar</button>}
                </div>
            </form>
        </div>
    );
  }
}