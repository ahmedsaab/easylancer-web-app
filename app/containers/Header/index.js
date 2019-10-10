import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toggleSideNav } from 'containers/Header/actions';
import * as logo from 'images/logo.png';
import {
  NavBar,
  NavIcon,
  NavLogoText,
  NavMenuButton,
  NavLogoIcon,
  Brand,
} from 'containers/Header/components';
import { setBodyScroll } from 'containers/App/actions';

function Header({ handleToggle }) {
  return (
    <NavBar>
      <NavMenuButton onClick={handleToggle}>
        <NavIcon icon="bars" size="2x" />
      </NavMenuButton>
      <Brand href="/">
        <NavLogoIcon src={logo} />
        <NavLogoText>Easylancer</NavLogoText>
      </Brand>
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
