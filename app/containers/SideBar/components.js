import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MDBRow } from 'mdbreact';
import ActionButton from 'components/atoms/ActionButton';

export const SideBarContainer = styled('nav')`
  background: #313e59;
  overflow-y: auto;
  height: 100%;
  color: #fff;
  transition: all 0.3s;
  min-width: 250px;
  max-width: 250px;
  z-index: 1000;
  position: fixed;
  display: flex;
  flex-direction: column;
  &.active {
    margin-left: 0;
  }
  @media (max-width: 1200px) {
    margin-left: -250px;
  }
`;

export const SideBarListElement = styled('li')`
  &.active {
    a {
      color: #fff;
      background: #6d7fcc;
    }
  }
  :hover {
    color: #7386d5;
    background: #fff;
  }
`;

export const SideBarLinkElement = styled(NavLink).attrs(() => ({
  activeStyle: {
    backgroundColor: '#1C2331',
  },
}))`
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
  padding: 10px;
  padding-left: 20px;
  font-size: 1.1em;
  display: block;
  :focus :hover {
    color: #7386d5;
    background: #fff;
  }
`;

export const SideBarHeader = styled('div').attrs(() => ({
  className: 'sidebar-header',
}))`
  // height: 60px;
  padding: 20px;
  padding-left: 10px;
  padding-right: 10px;
  background: #1c2a48;
  text-align: center;
`;

export const SideBarButton = styled(ActionButton)`
  margin: 10px 10px 0 0 !important;
`;

export const SideBarButtonContainer = styled.div`
  padding: 10px;
`;

export const SideBarButtonContainerBottom = styled(SideBarButtonContainer)`
  bottom: 0;
  margin-top: auto;
`;

export const SideBarOverlay = styled('div')`
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 950;
  cursor: pointer;
`;

export const SideBarLinkElementText = styled('div')`
  display: inline-block;
  padding-left: 50px;
`;

export const SideBarList = styled('ul')`
  padding: 20px 0;
  margin: 0;
  border-bottom: 2px solid #47748b;
`;

export const SideBarUserName = styled('div').attrs(() => ({
  className: 'text-truncate',
}))`
  float: left;
  width: 100%;
  text-align: left;
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
`;

export const SideBarUserData = styled('div')`
  padding-left: 10px;
  padding-right: 10px;
`;

export const SideBarUser = styled(MDBRow).attrs(() => ({
  className: 'align-self-center no-gutters',
}))``;

export const SideBarUserImage = styled('img').attrs(() => ({
  className: 'img-fluid z-depth-1 rounded-circle',
}))`
  height: 48px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ImagePlaceholder = styled.div.attrs(() => ({
  className: 'img-fluid z-depth-1 rounded-circle',
}))`
  height: 48px;
  width: 48px;
  position: relative;
  margin: 0;
  background-color: #1c2331;
`;

export const SideBarUserCredit = styled('div')`
  text-align: left;
  font-weight: bolder;
`;

export const SideBarUserCreditAmount = styled('span')`
  padding-right: 10px;
`;
