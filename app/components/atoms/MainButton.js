import { styled } from '@material-ui/styles';
import DialogButton from 'components/atoms/DialogButton';

const MainButton = styled(DialogButton)(() => ({
  minWidth: '130px',
}));

MainButton.defaultProps = {
  variant: 'contained',
  color: 'secondary',
};

export default MainButton;
