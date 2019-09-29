import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CenteredDiv from 'components/atoms/CenteredDiv';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from 'components/molecules/Avatar';

const ProgressOverlay = styled.div`
  background: #fff;
  height: 100%;
  width: ${props => 100 - props.percent}%;
  position: absolute;
  opacity: 0.5;
  z-index: 2;
`;

const ProgressIndicator = styled(CircularProgress)`
  z-index: 10;
`;

const CenterIcon = styled(CenteredDiv)`
  background: #fff0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const RemoveIcon = styled(RemoveCircleIcon)`
  position: absolute;
  font-size: 22px;
  cursor: pointer;
  z-index: 2;
  top: 4px;
  right: 6px;
  z-index: 10;
`;

const ErrorOverlay = styled(CenteredDiv)`
  background: #ff000059;
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  font-size: 12px;
  color: white;
  font-weight: 700;
`;

const Container = styled.div`
  position: relative;
  border-radius: 50%;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const FillAvatar = styled(Avatar)`
  height: 100%;
  width: 100%;
`;

class ProfilePhotoPreview extends React.PureComponent {
  render() {
    const {
      fileWithMeta: { remove },
      meta: { percent = 0, previewUrl, status },
    } = this.props;

    const errored =
      status === 'error_file_size' ||
      status === 'error_upload_params' ||
      status === 'exception_upload' ||
      status === 'error_upload' ||
      status === 'error_validation';

    const loading = !errored && status !== 'ready' && status !== 'done';

    // const removeIcon = status !== 'preparing' &&
    //   status !== 'getting_upload_params' &&
    //   status !== 'uploading' &&
    //   status !== 'done' &&
    //   !errored && <RemoveIcon color="error" onClick={remove} />;

    const removeIcon = null;

    return (
      <Container>
        {removeIcon}
        <ProgressOverlay percent={loading ? percent : 100} />
        <CenterIcon>{loading && <ProgressIndicator />}</CenterIcon>
        {errored ? <ErrorOverlay>Invalid photo</ErrorOverlay> : null}
        <FillAvatar
          imgStyle={{ objectFit: 'cover', height: '100%', width: '100%' }}
          imgSrc={previewUrl}
          alt=""
        />
      </Container>
    );
  }
}

ProfilePhotoPreview.propTypes = {
  fileWithMeta: PropTypes.shape({
    file: PropTypes.any.isRequired,
    meta: PropTypes.object.isRequired,
    cancel: PropTypes.func.isRequired,
    restart: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    xhr: PropTypes.any,
  }).isRequired,
  // copy of fileWithMeta.meta, won't be mutated
  meta: PropTypes.shape({
    status: PropTypes.oneOf([
      'preparing',
      'error_file_size',
      'error_validation',
      'ready',
      'getting_upload_params',
      'error_upload_params',
      'uploading',
      'exception_upload',
      'aborted',
      'error_upload',
      'headers_received',
      'done',
    ]).isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    uploadedDate: PropTypes.string.isRequired,
    percent: PropTypes.number,
    size: PropTypes.number,
    lastModifiedDate: PropTypes.string,
    previewUrl: PropTypes.string,
    duration: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    videoWidth: PropTypes.number,
    videoHeight: PropTypes.number,
    validationError: PropTypes.any,
  }).isRequired,
  files: PropTypes.arrayOf(PropTypes.any).isRequired, // eslint-disable-line react/no-unused-prop-types
  extra: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    reject: PropTypes.bool.isRequired,
    dragged: PropTypes.arrayOf(PropTypes.any).isRequired,
    accept: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    minSizeBytes: PropTypes.number.isRequired,
    maxSizeBytes: PropTypes.number.isRequired,
    maxFiles: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProfilePhotoPreview;
