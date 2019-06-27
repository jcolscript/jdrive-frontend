/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import  { distanceInWords } from 'date-fns'
import { StageSpinner   } from "react-spinners-kit";
import  pt from 'date-fns/locale/pt'
import Dropzone from 'react-dropzone'
import socket from 'socket.io-client';
import Nav from '../Nav';
import utils from '../../utils';
import api from '../../services/api';

import {MdInsertDriveFile, MdFolderOpen} from 'react-icons/md'

import './styles.css';

export default class Folder extends Component {
  state = { 
    folder: {},
    loading: false
  };

  async componentDidMount() {
    this.setState({loading: true})
    this.subscribeToNewFiles();
    const token = utils.storageGetItem('@JDriveToken');
    const folder = this.props.match.params.id;
    const response = await api.get(`folders/${folder}`,
    { 
      headers: {
        "x-access-token": token
      }
    });

    this.setState({loading: false})
    this.setState({folder: response.data});
  }

  subscribeToNewFiles = () => {
    const folder = this.props.match.params.id;
    const io = socket('http://localhost:3000');

    io.emit('connectRomm', folder);

    io.on('file', data => {
      this.setState({ folder: {...this.state.folder, files: [data, ...this.state.folder.files, ]}})
    })
  }

  handleUpload = (files) => {
    const folder = this.props.match.params.id;
    const token = utils.storageGetItem('@JDriveToken');
    files.forEach(file => {
      const data = new FormData();
      data.append('file', file);
      api.post(`folders/${folder}/files`, data,
      { 
        headers: {
          "x-access-token": token
        }
      });
    });
  };

  render() {
    return [
      <div className="App">
        <Nav />
        <div id='folder-container'>
          <header>
          < MdFolderOpen size={40} color='#cd3a17' /><h1>{this.state.folder.title}</h1>
          </header>
          <Dropzone onDropAccepted={this.handleUpload}>
            {({getRootProps, getInputProps }) => (
              <div className="upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Araste arquivos ou clique aqui</p>
              </div>
            )}
          </Dropzone>
          {this.state.loading && 
            <StageSpinner  
              size={60}
              color="#D14827"
              loading={this.state.loading}
            />
          }
          <ul>
            {this.state.folder.files && this.state.folder.files.map( file => (
              <li key={file._id}>
                <a className="fileInfo" href={file.url} target="_blank">
                  < MdInsertDriveFile size={50} color='#8f8f8f' />
                  <strong>{file.title}</strong>
                </a>
                <span>há {distanceInWords(file.createdAt, new Date(), {locale: pt})}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ]
  }
}
