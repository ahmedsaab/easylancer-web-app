import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { getWindowWidth } from 'utils/stylesHelper';
import { makeStyles } from '@material-ui/core';
import withTheme from '@material-ui/core/styles/withTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const stickStyle = {
  display: 'flex',
  position: 'fixed',
  bottom: '0',
  width: '100vw',
  left: '0',
  margin: '0',
  border: 'unset',
  background: '#ffffffcf',
  borderTop: '1px solid #d0d0d0',
  zIndex: '300',
  marginBottom: '0',
};

const normalStyle = {
  padding: 0,
  display: 'flex',
};

const useStyles = makeStyles(theme => ({
  container: props => (props.stick ? stickStyle : normalStyle),
}));

const setMarginOnRelative = (relativeComponent, stickWidth, component) => {
  const width = getWindowWidth();
  if (width < stickWidth && component.current) {
    // eslint-disable-next-line no-param-reassign
    relativeComponent.current.style.paddingBottom = window
      .getComputedStyle(component.current)
      .getPropertyValue('height');
  } else if (relativeComponent.current) {
    // eslint-disable-next-line no-param-reassign
    relativeComponent.current.style.paddingBottom = 0;
  }
};

function ActionButtons({
  relativeStyleRef,
  whenToStick,
  className,
  theme,
  children,
}) {
  const whenToStickPixels = theme.breakpoints.values[whenToStick];
  const stick = useMediaQuery(theme.breakpoints.between('xs', whenToStick));

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMarginOnRelative(relativeStyleRef, whenToStickPixels, ref);
    });
    setMarginOnRelative(relativeStyleRef, whenToStickPixels, ref);
  });

  const classes = useStyles({ stick });
  const ref = useRef(null);

  return (
    <div className={`${classes.container} ${className}`} ref={ref}>
      {children}
    </div>
  );
}

ActionButtons.propTypes = {
  relativeStyleRef: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  whenToStick: PropTypes.string,
  theme: PropTypes.object,
};

export default withTheme(ActionButtons);
