import React, { Component, Fragment } from "react";
import Dropzone from 'react-dropzone';

class ImageDropzone extends Component {

  state = {
    text : "Click here or drop a file to upload",
  };

  onDrop = (acceptedFiles) => {
      this.setState({text: acceptedFiles[0].name});
    }

    render() {
      const maxSize = 1048576;
      return (
        <div className="text-center mt-5">
          <Dropzone
            onDrop={this.onDrop}
            accept="image/*"
            minSize={0}
            maxSize={maxSize}
            style = {{backgroundColor: 'blue'}}
          >
            {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
              const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!isDragActive && this.state.text}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && "File type not accepted, sorry!"}
                  {isFileTooLarge && (
                    <div className="text-danger mt-2">
                      File is too large.
                    </div>
                  )}
                </div>
              )}
            }
          </Dropzone>
        </div>
      );
    }
}

export default ImageDropzone
