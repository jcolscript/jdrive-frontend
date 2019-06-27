/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import Nav from '../Nav';
import { MdFolder } from 'react-icons/md'
import  { distanceInWords } from 'date-fns'
import  pt from 'date-fns/locale/pt'
import { StageSpinner   } from "react-spinners-kit";
import socket from 'socket.io-client';

import utils from '../../utils';
import api from '../../services/api';

import logo from '../../assets/img1.png';
import './styles.css';

export default class Main extends Component {
  state = {
    newFolder: '',
    folders: '',
    loading: false
  };

  async componentDidMount() {
    this.setState({loading: true})
    this.subscribeToNewFolders();
    const token = utils.storageGetItem('@JDriveToken');
    const response = await api.get(`folders`,
    { 
      headers: {
        "x-access-token": token
      }
    });
    this.setState({loading: false})
    this.setState({folders: response.data});
  }

  subscribeToNewFolders = () => {
    const token = utils.storageGetItem('@JDriveToken');
    const userId = utils.jwtDecode(token);
    const io = socket('https://jdrive.azurewebsites.net');

    io.emit('connectRomm', userId.id);

    io.on('folder', data => {
      this.setState({ folders: [data, ...this.state.folders]})
      console.log(data);
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = utils.storageGetItem('@JDriveToken');
    const response = await api.post('/folders', 
    {
      title: this.state.newFolder,
    },
    { 
      headers: {
        "x-access-token": token
      }
    });

    this.props.history.push(`/jdrive/folder/${response.data._id}`)
  }

  handleInputChange = (e) => {
    this.setState({
      newFolder: e.target.value
    });
  }

  render() {
    return [
      <div className="App">
        <Nav />
        <div id="main-container">
            <form onSubmit={this.handleSubmit} action="">
                <img className="img" src= {logo} alt="" />
                <input 
                  placeholder="Criar uma pasta"
                  value = {this.state.newFolder}
                  onChange = {this.handleInputChange}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
        <div id="folders-container">
          {this.state.loading && 
            <StageSpinner  
                size={60}
                color="#D14827"
                loading={this.state.loading}
            />
          }
          <ul>
            {this.state.folders && this.state.folders.map( folder => (
              <li key={folder._id}>
                <a className="folderInfo" href onClick={() => { this.props.history.push(`/jdrive/folder/${folder._id}`) }}>
                  < MdFolder size={50} color='#CD3A17' />
                  <strong>{folder.title}</strong>
                </a>
                <span>há {distanceInWords(folder.createdAt, new Date(), {locale: pt})}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ];
  }
}
