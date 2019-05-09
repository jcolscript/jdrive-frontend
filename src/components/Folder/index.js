import React, { Component } from 'react';
import utils from '../../utils';
import api from '../../services/api';

import {MdInsertDriveFile} from 'react-icons/md'

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
      <div id='folder-container'>
        <header>
          <img src={logo} alt="" width="155px"/>
          <h1>{this.state.folder.title}</h1>
        </header>
        <ul>
          {this.state.folder.files && this.state.folder.files.map( file => (
            <li>
              <a className="fileInfo" href={file.url} target="_blank">
                < MdInsertDriveFile size={40} color='#8f8f8f' />
                <strong>{file.title}</strong>
              </a>
              <span>{file.createAt}</span>
            </li>
          ))}
        </ul>
      </div>
    ]
  }
}
