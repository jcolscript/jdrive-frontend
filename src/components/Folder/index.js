/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import Nav from '../Nav';
import utils from '../../utils';
import api from '../../services/api';

import {MdInsertDriveFile, MdFolderOpen} from 'react-icons/md'

import logo from '../../assets/logo.svg'
import './styles.css';

export default class Folder extends Component {
  state = { folder: {}};
  async componentDidMount() {
    const token = utils.storageGetItem('@JDriveToken');
    const folder = this.props.match.params.id;
    const response = await api.get(`folders/${folder}`,
    { 
      headers: {
        "x-access-token": token
      }
    });

    this.setState({folder: response.data});
  }
  render() {
    return [
      <div className="App">
        <Nav />
        <div id='folder-container'>
          <header>
          < MdFolderOpen size={40} color='#cd3a17' /><h1>{this.state.folder.title}</h1>
          </header>
          <ul>
            {this.state.folder.files && this.state.folder.files.map( file => (
              <li>
                <a className="fileInfo" href={file.url} target="_blank">
                  < MdInsertDriveFile size={50} color='#8f8f8f' />
                  <strong>{file.title}</strong>
                </a>
                <span>{file.createdAt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ]
  }
}
