import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import ReplayIcon from '@material-ui/icons/Replay';
import CenteredDiv from 'components/atoms/CenteredDiv';
import CircularProgress from '@material-ui/core/CircularProgress';

const ProgressOverlay = styled.div`
  background: #fff;
  height: 100%;
  width: ${props => 100 - props.percent}%;
  position: absolute;
  opacity: 0.5;
`;

const RetryIcon = styled(ReplayIcon)`
  background-color: #cececec7;
  border-radius: 39px;
  font-size: 45px;
  cursor: pointer;
`;

const CenterIcon = styled(CenteredDiv)`
  background: #fff0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const RemoveIcon = styled(ClearSharpIcon)`
  color: #989898;
  position: absolute;
  font-size: 22px;
  cursor: pointer;
  z-index: 2;
  top: 4px;
  right: 6px;
`;

const ProgressImage = styled.img`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 1px;
  border: 2px solid ${props => (props.error ? 'red' : 'white')};
  object-fit: cover;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  flex: 1;
`;

class Preview extends React.PureComponent {
  render() {
    const {
      fileWithMeta: { remove, restart },
      meta: { percent = 0, previewUrl, status },
    } = this.props;

    const errored =
      status === 'error_file_size' ||
      status === 'error_upload_params' ||
      status === 'exception_upload' ||
      status === 'error_upload' ||
      status === 'error_validation';

    const loading = !errored && status !== 'ready' && status !== 'done';

    return (
      <Container>
        {status !== 'preparing' &&
          status !== 'getting_upload_params' &&
          status !== 'uploading' && <RemoveIcon onClick={remove} />}
        <ProgressOverlay percent={loading ? percent : 100} />
        <CenterIcon>
          {errored && <RetryIcon fontSize="large" onClick={restart} />}
          {loading && <CircularProgress />}
        </CenterIcon>
        <ProgressImage error={errored} src={previewUrl} alt="" />
      </Container>
    );
  }
}

Preview.propTypes = {
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

export default Preview;
