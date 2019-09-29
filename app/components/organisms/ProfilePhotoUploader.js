import 'react-dropzone-uploader/dist/styles.css';
import DropZone from 'react-dropzone-uploader';
import React from 'react';
import * as PropTypes from 'prop-types';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ProfilePhotoPreview from 'components/organisms/ProfilePhotoReview';

const inputLabelStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  alignSelf: 'flex-start',
  minHeight: '32px',
  backgroundColor: '#ffffff00',
  color: '#2BBBAD',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '0',
  height: '100%',
  border: '2px #2BBBAD dashed',
  borderRadius: '50%',
  margin: 0,
  order: '-1',
  position: 'absolute',
  bottom: 0,
  overflow: 'hidden',
};

const ContainerStyles = {
  alignItems: 'center',
  width: '130px',
  height: '130px',
  overflow: 'auto',
  position: 'relative',
  boxSizing: 'border-box',
  transition: 'all 0.15s linear',
  border: 'none',
  display: 'block',
};

class ProfilePhotoUploader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeStatus.bind(this);
    this.getUploadParams.bind(this);
  }

  getUploadParams = async ({ meta }) => {
    const {
      requestFileUpload,
      onUpdateUploadedImage,
      profileFile,
    } = this.props;
    const file = await requestFileUpload();

    onUpdateUploadedImage({ ...profileFile, url: file.download.url });

    return file.upload;
  };

  handleChangeStatus = async ({ meta, file, restart }, status, files) => {
    const { onUpdateUploadedImage, profileFile } = this.props;
    if (files.length > 1 && status === 'preparing') {
      files.find(f => f.meta.id === profileFile.id).remove();
      onUpdateUploadedImage({
        id: meta.id,
        url: null,
        uploaded: false,
        data: file,
      });
    }

    if (profileFile.id === null && status === 'preparing') {
      onUpdateUploadedImage({ ...profileFile, id: meta.id });
    } else if (profileFile.uploaded === false && meta.id === profileFile.id) {
      switch (status) {
        case 'ready':
          restart();
          break;
        case 'done':
          onUpdateUploadedImage({ ...profileFile, uploaded: true });
          break;
        default:
      }
    }
  };

  render() {
    const { className, profileFile } = this.props;

    return (
      <DropZone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        PreviewComponent={ProfilePhotoPreview}
        autoUpload={false}
        multiple={false}
        SubmitButtonComponent={null}
        inputContent={null}
        inputWithFilesContent={() => (
          <div
            style={{ backgroundColor: '#00000042', padding: '10px 0px' }}
            key="label"
          >
            <AddAPhotoIcon style={{ width: '100%', fontSize: '16px' }} />
          </div>
        )}
        styles={{
          dropzone: ContainerStyles,
          inputLabelWithFiles: inputLabelStyles,
        }}
        initialFiles={[profileFile.data]}
        accept="image/*"
        className={className}
      />
    );
  }
}

ProfilePhotoUploader.propTypes = {
  onUpdateUploadedImage: PropTypes.func.isRequired,
  requestFileUpload: PropTypes.func.isRequired,
  profileFile: PropTypes.object,
  className: PropTypes.string,
};

export default ProfilePhotoUploader;
