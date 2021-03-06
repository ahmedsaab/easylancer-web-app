import styled from 'styled-components';
import { MDBIcon, MDBNavbar } from 'mdbreact';

export const NavMenuButton = styled('div').attrs(props => ({
  size: 'sm',
}))`
  color: #f5f5f5;
  cursor: pointer;
  @media (min-width: 1280px) {
    display: none;
  }
`;

export const NavLogoText = styled('span')`
  vertical-align: middle;
  padding-left: 5px;
  font-size: 22px;
  font-weight: bolder;
`;

export const NavBar = styled(MDBNavbar).attrs(() => ({
  color: 'unique-color-dark',
  dark: true,
}))`
  height: 60px;
  position: fixed;
  z-index: 200;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  @media (min-width: 1280px) {
    padding-left: 266px;
  }
`;

export const NavIcon = styled(MDBIcon)`
  color: white;
`;

export const NavLogoIcon = styled('img').attrs(props => ({
  height: '30',
}))``;

export const Brand = styled('a')`
  color: white;
  :hover {
    color: white;
  }
`;
