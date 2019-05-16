/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import  { distanceInWords } from 'date-fns'
import  pt from 'date-fns/locale/pt'
import Dropzone from 'react-dropzone'
import Nav from '../Nav';
import utils from '../../utils';
import api from '../../services/api';

import {MdInsertDriveFile, MdFolderOpen} from 'react-icons/md'

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
