import React from 'react';
import * as PropTypes from 'prop-types';
import SectionLabel from 'elements/atoms/SectionLabel';

function Section({ title, children, className, visible }) {
  return (
    <div style={{ display: visible ? 'block' : 'none' }} className={className}>
      <SectionLabel>{title}</SectionLabel>
      <div>{children}</div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  visible: PropTypes.bool,
};

export default Section;
