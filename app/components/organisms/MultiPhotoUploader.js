import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import React from 'react';
import * as PropTypes from 'prop-types';

class MultiPhotoUploader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeStatus.bind(this);
    this.getUploadParams.bind(this);
    this.handleSubmit.bind(this);
    this.state = {
      files: [],
    };
  }

  // specify upload params and url for your files
  getUploadParams = async ({ meta }) => {
    const { requestFileUpload } = this.props;

    const file = await requestFileUpload();

    this.setState(prevState => {
      const oldFiles = prevState.files.slice(0);
      oldFiles.push({
        id: meta.id,
        url: file.download.url,
        uploaded: false,
      });

      return {
        files: oldFiles,
      };
    });

    return file.upload;
  };

  // called every time a file's `status` changes
  handleChangeStatus = async ({ meta, file }, status) => {
    // console.log(status, meta, file);
    const { onUpdateUploadedImages } = this.props;

    // eslint-disable-next-line default-case
    switch (status) {
      case 'done':
        this.setState(({ files }) => {
          const index = files.findIndex(f => f.id === meta.id);
          const newFiles = files.slice(0);
          newFiles[index].uploaded = true;
          return {
            files: newFiles,
          };
        });
        onUpdateUploadedImages(this.state.files.map(f => f.url));
        break;
      case 'removed':
        this.setState(({ files }) => {
          const index = files.findIndex(f => f.id === meta.id);
          const newFiles = files.slice(0);
          if (index > -1) {
            newFiles.splice(index, 1);
          }
          return {
            files: newFiles,
          };
        });
        onUpdateUploadedImages(this.state.files.map(f => f.url));
        break;
    }
  };

  // receives array of files that are done uploading when submit button is clicked
  handleSubmit = async (files, allFiles) => {
    // console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  render() {
    return (
      <Dropzone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        accept="image/*"
      />
    );
  }
}

MultiPhotoUploader.propTypes = {
  onUpdateUploadedImages: PropTypes.func.isRequired,
  requestFileUpload: PropTypes.func.isRequired,
};

export default MultiPhotoUploader;
