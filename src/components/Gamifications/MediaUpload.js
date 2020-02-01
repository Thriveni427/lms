import React, { Component } from 'react'
import Dropzone from 'react-dropzone';

export default class MediaUpload extends Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      this.setState({
        files,
        showMessage: false
      })
    };
    this.state = {
      files: [],
      showMessage: true
    };
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));

    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps}) => (
          <section style={{
            borderWidth: 1,
            borderStyle:'dashed',
            borderColor: '#038D7D',
            padding: 20
          }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {this.state.showMessage && <p>Drag 'n' drop some files here, or click to select files</p>}
            </div>
            <aside>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}