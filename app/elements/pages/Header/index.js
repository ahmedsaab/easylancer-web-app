import React from 'react';
import { MDBNavbarBrand } from 'mdbreact';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toggleSideNav } from 'elements/pages/Header/actions';
import * as logo from 'images/logo.png';
import {
  NavBar,
  NavIcon,
  NavLogoText,
  NavMenuButton,
  NavLogoIcon,
} from 'elements/pages/Header/components';
import { setBodyScroll } from 'elements/pages/App/actions';

function Header({ handleToggle }) {
  return (
    <NavBar>
      <NavMenuButton onClick={handleToggle}>
        <NavIcon icon="bars" size="2x" />
      </NavMenuButton>
      <MDBNavbarBrand href="#">
        <NavLogoIcon src={logo} />
        <NavLogoText>Easylancer</NavLogoText>
      </MDBNavbarBrand>
      <NavIcon icon="bell" size="lg" />
    </NavBar>
  );
}

Header.propTypes = {
  handleToggle: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  handleToggle: () => {
    dispatch(setBodyScroll(false));
    dispatch(toggleSideNav(true));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
