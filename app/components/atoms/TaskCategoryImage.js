import styled from 'styled-components';
import * as beauty from 'images/tasks/lipstick.png';
import * as repair from 'images/tasks/wrench.png';
import * as home from 'images/tasks/house.png';
import * as expat from 'images/tasks/passport.png';
import * as unknown from 'images/tasks/question.png';

function getImageByCategory(category) {
  switch (category) {
    case 'beauty':
      return beauty;
    case 'repair':
      return repair;
    case 'home':
      return home;
    case 'expat':
      return expat;
    default:
      return unknown;
  }
}

export default styled('img').attrs(props => ({
  src: getImageByCategory(props.category),
}))`
  overflow: hidden;
  border-radius: 50%;
  width: 60px;
  overflow: hidden;
  border: 5px solid #fff;
`;
