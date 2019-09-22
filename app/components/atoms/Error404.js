import styled from 'styled-components';
import FitPage from 'components/atoms/FitPage';
import ErrorImage from '../../images/404.png';

export default styled(FitPage)`
  background-image: url(${ErrorImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
