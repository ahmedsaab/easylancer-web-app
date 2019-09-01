import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

export const withLoading = (Component, width) => {
  const Hoc = ({ loading, children, ...props }) => (
    <Component style={{ width }} {...props}>
      {loading ? (
        <Fragment>
          <LinearProgress style={{ display: 'block', width, height: '5px' }} />
          <br />
        </Fragment>
      ) : (
        children
      )}
    </Component>
  );

  Hoc.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.any,
  };

  return Hoc;
};
