import React from 'react';
import * as PropTypes from 'prop-types';
import { MDBIcon } from 'mdbreact';

function IconWithNumber({ metric, icon, iconColor, className }) {
  return (
    <div className={className}>
      <MDBIcon className="mr-1" style={{ color: iconColor }} far icon={icon} />
      {metric}
    </div>
  );
}

IconWithNumber.propTypes = {
  iconColor: PropTypes.string,
  metric: PropTypes.number,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default IconWithNumber;
