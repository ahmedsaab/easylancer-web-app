import { styled, withTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const ActionButton = styled(withTheme(Button))(props => ({
  marginRight: props.theme.spacing(0.5),
  marginLeft: props.theme.spacing(0.5),
  padding: '12px',
  flex: props.flex,
}));

ActionButton.defaultProps = {
  variant: 'contained',
  color: 'secondary',
  fullWidth: true,
};

export default ActionButton;
