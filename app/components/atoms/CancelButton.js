import { styled } from '@material-ui/styles';
import DialogButton from 'components/atoms/DialogButton';

const CancelButton = styled(DialogButton)(props => ({
  color: props.theme.status.danger,
}));

export default CancelButton;
