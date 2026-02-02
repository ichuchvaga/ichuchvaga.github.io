import React, { Component } from 'react';
import FileCard from './fileCard';

import './uploadField.sass';

class UploadWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
        files: []
    };
    
    this.dropArea = React.createRef();
    this.fileInput = React.createRef();
    this.deleteFile = this.deleteFile.bind(this);
  }

  handleDrop = (e) => {
    let dt = e.dataTransfer;
    let files = dt.files;

    this.handleFiles(files);
  };

  handleDefaultInput = (e) => {
    let inputElement = this.fileInput.current;
    let files = inputElement.files;    

    this.handleFiles(files);
  };

  handleFiles = (files) => {
    ([...files]).forEach(this.uploadFile);
  }

  uploadFile = (file) => {
    let self = this;

    let fileProps = {
        id: new Date().getTime().toString(),
        url: "",
        name: file.name,
        size: file.size,
        type: file.type
    };

    // Check MIME type
    const allowedFileTypes = [
        "image/png",
        "image/jpeg"
    ];

    const allowedTypeStatus = allowedFileTypes.some(elem => elem === file.type);
    
    if (allowedTypeStatus === false) {
        // Mime type is rejected
        fileProps.status = false;
        fileProps.statusMessage = "Error: File type is not JPG/PNG";
        fileProps.completed = true;
        let files = self.state.files;
        files.push(fileProps);

        self.setState({
            files
        });
        files = null;

        return false;
    }

    // Check file size
    const mb = 1024*1024;
    const fileSizeLimit = 15 * mb;

    if (file.size > fileSizeLimit) {
        fileProps.status = false;
        fileProps.statusMessage = "Error: File size over 15Mb limit";
        fileProps.completed = true;
        let files = self.state.files;
        files.push(fileProps);

        self.setState({
            files
        });
        files = null;

        return false;
    }

    const url = 'http://127.0.0.1:8000/upload';
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.open('POST', url, true);

    xhr.addEventListener('readystatechange', function(e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Success
        let files = self.state.files;

        fileProps.url = xhr.responseText;
        fileProps.status = true;
        fileProps.statusMessage = "Upload completed";
        fileProps.completed = false;
        files.push(fileProps);

        self.setState({
            files
        });

        files = null;
      }
      else if (xhr.readyState === 4 && xhr.status !== 200) {
        // Error
      }
    })

    formData.append('file', file);
    xhr.send(formData);

    //this.setState({ files });
  }

  deleteFile(id) {
    let files = this.state.files;
    let self = this;

    const newFiles = files.filter(function(item, index){
        if (item.id === id) {
            // Remove this file
            return false;            
        }

        return true;
    });

    self.setState({
        files: newFiles
    });
  }

  preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight = (e) => {
    this.dropArea.current.classList.add('dropzone--isActive');
  }
  unhighlight = (e) => {
    this.dropArea.current.classList.remove('dropzone--isActive');
  }

  componentDidMount() {
    let dropArea = this.dropArea.current;

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.preventDefaults, false);
    });

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.highlight, false);
    });

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, this.unhighlight, false);
    });

    dropArea.addEventListener('drop', this.handleDrop, false);      
  }

  componentWillUnmount() {
    let dropArea = this.dropArea.current;

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.removeEventListener(eventName, this.preventDefaults);
    });

    ;['dragenter', 'dragover'].forEach(eventName => {
        dropArea.removeEventListener(eventName, this.highlight);
    });

    ;['dragleave', 'drop'].forEach(eventName => {
        dropArea.removeEventListener(eventName, this.unhighlight);
    });

    dropArea.removeEventListener('drop', this.handleDrop);
  }


  render() {
    let self = this;

    return (
        <div className="form-group">
            <label htmlFor="upload-input">Photo:</label>
            
            <div className="upload-widget">
                
                <div className="dropzone-outer">
                    <div 
                        className='upload-widget__dropzone dropzone'
                        ref={this.dropArea}
                    >
                        <div className="dropzone__in">
                            <div className="dropzone__icon"></div>
                            <div className="dropzone__label">Drag files to upload</div>
                        </div>

                        <div className="dropzone__border-h"></div>
                        <div className="dropzone__border-v"></div>                            
                    </div>
                </div>
                

                <div className="upload-widget__body">

                    <div className="file-input-wrapper">

                        <div className="file-input-wrapper__l">
                            <div className="file-input">
                            <input className="sr-only" type="file" name="photos[]" id="upload-input" ref={this.fileInput} onChange={this.handleDefaultInput}/>
                            <label htmlFor="upload-input"><span className="btn btn-grey">Choose Files</span></label>
                            </div>
                            <div className="upload-widget__descr">JPG, PNG files only, 15Mb max file size<br/>Minimum size: 1000px x 1000px</div>
                        </div>

                        {/*eslint-disable-next-line*/}
                        <div className="file-input-wrapper__r file-input-mobile"><a className="link" href="javascript:void(0);">Take Photo with Camera<i className="icon icon-camera"></i></a></div>
                    </div>


                    <div className="upload-progress">
                        <div className="upload-progress-files">
                            {
                                this.state.files.map(function(item, index){
                                    return <FileCard 
                                        key={index}
                                        status={item.status}
                                        statusMessage={item.statusMessage}
                                        name={item.name}
                                        size={item.size}
                                        id={item.id}
                                        completed={item.completed}
                                        deleteHandler={self.deleteFile}
                                    />;
                                })
                            }                            
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
  }
}
  
export default UploadWidget;