import 'react-dropzone-uploader/dist/styles.css';
import DropZone from 'react-dropzone-uploader';
import React from 'react';
import * as PropTypes from 'prop-types';
import PhotoReview from 'components/organisms/PhotoReview';

const inputLabelStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start',
  minHeight: '32px',
  backgroundColor: '#ffffff00',
  color: '#2BBBAD',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '10px',
  margin: '0',
  width: '100%',
  height: '150px',
  border: '2px #2BBBAD dashed',
  borderRadius: '4px',
  order: '-1',
};

const inputLabelStylesEmpty = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start',
  backgroundColor: '#ffffff00',
  color: '#2BBBAD',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  border: '2px #2BBBAD dashed',
  borderRadius: '4px',
  width: '100%',
  margin: '0',
  padding: '10px',
  height: '100%',
};

const ContainerStyles = {
  alignItems: 'center',
  overflow: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  transition: 'all 0.15s linear',
  border: 'none',
  marginLeft: '8px',
  marginRight: '8px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 120px)',
  gridGap: '0.5rem',
};

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
      <DropZone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        PreviewComponent={PhotoReview}
        SubmitButtonComponent={null}
        inputContent="Add Photos"
        inputWithFilesContent="Add Photo"
        styles={{
          dropzone: ContainerStyles,
          inputLabel: inputLabelStylesEmpty,
          inputLabelWithFiles: inputLabelStyles,
        }}
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
