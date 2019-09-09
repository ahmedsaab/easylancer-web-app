import { styled } from '@material-ui/styles';
import DialogButton from 'components/atoms/DialogButton';

const MainDialogButton = styled(DialogButton)(() => ({
  minWidth: '130px',
}));

MainDialogButton.defaultProps = {
  variant: 'contained',
  color: 'secondary',
};

export default MainDialogButton;
