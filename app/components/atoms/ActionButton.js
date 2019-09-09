import { styled, withTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import * as PropTypes from 'prop-types';

const ActionButton = styled(withTheme(Button))(props => ({
  marginRight: props.first || props.middle ? props.theme.spacing(0.5) : 0,
  marginLeft: props.last || props.middle ? props.theme.spacing(0.5) : 0,
  padding: '12px',
  flex: props.flex,
}));

ActionButton.defaultProps = {
  variant: 'contained',
  color: 'secondary',
  fullWidth: true,
};

ActionButton.propTypes = {
  first: PropTypes.bool,
  middle: PropTypes.bool,
  last: PropTypes.bool,
};

export default ActionButton;
