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
  }

  getUploadParams = async ({ meta }) => {
    const { requestFileUpload, onUpdateUploadedImages, files } = this.props;
    const file = await requestFileUpload();
    const index = files.findIndex(f => f.id === meta.id);
    const newFiles = files.slice(0);

    newFiles[index].url = file.download.url;
    onUpdateUploadedImages(newFiles);

    return file.upload;
  };

  handleChangeStatus = async ({ meta, file }, status) => {
    const { onUpdateUploadedImages, files } = this.props;
    const index = files.findIndex(f => f.id === meta.id);
    const newFiles = files.slice(0);

    switch (status) {
      case 'preparing':
        newFiles.push({
          id: meta.id,
          url: null,
          uploaded: false,
        });
        onUpdateUploadedImages(newFiles);
        break;
      case 'done':
        newFiles[index].uploaded = true;
        onUpdateUploadedImages(newFiles);
        break;
      case 'removed':
        if (index > -1) {
          newFiles.splice(index, 1);
        }
        onUpdateUploadedImages(newFiles);
        break;
      default:
    }
  };

  render() {
    return (
      <DropZone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
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
  files: PropTypes.array,
};

export default MultiPhotoUploader;
