import * as PropTypes from 'prop-types';
import React from 'react';

export function TabPanel({ visible, children, className }) {
  return (
    <div style={{ display: visible ? 'block' : 'none' }} className={className}>
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  visible: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
};
