import { styled, withTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const DialogButton = styled(withTheme(Button))(props => ({
  margin: props.theme.spacing(0),
  padding: '12px',
}));

export default DialogButton;
