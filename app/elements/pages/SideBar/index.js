import React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectNavBarVisible } from 'elements/pages/SideBar/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { MDBCol, MDBIcon } from 'mdbreact';
import auth from 'utils/auth';
import { toggleSideNav } from 'elements/pages/Header/actions';
import {
  SideBarButton,
  SideBarContainer,
  SideBarHeader,
  SideBarLinkElement,
  SideBarLinkElementText,
  SideBarList,
  SideBarListElement,
  SideBarOverlay,
  SideBarUser,
  SideBarUserCredit,
  SideBarUserCreditAmount,
  SideBarUserData,
  SideBarUserImage,
  SideBarUserName,
} from 'elements/pages/SideBar/components';
import reducer from 'elements/pages/SideBar/reducer';
import Footer from 'elements/organisms/Footer';

function SideBar({ isOpen, handleToggle }) {
  useInjectReducer({ key: 'sideNavBar', reducer });

  return (
    <div>
      <SideBarOverlay
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={handleToggle}
      />
      <SideBarContainer className={isOpen ? 'active' : ''} id="sidebar">
        <SideBarHeader>
          <SideBarUser>
            <MDBCol size="4">
              <SideBarUserImage src="https://i.pravatar.cc/55" />
            </MDBCol>
            <MDBCol size="8">
              <SideBarUserData>
                <SideBarUserName>Angelina Parsutina</SideBarUserName>
                <SideBarUserCredit>
                  <SideBarUserCreditAmount>€ 112</SideBarUserCreditAmount>
                  <MDBIcon icon="wallet" />
                </SideBarUserCredit>
              </SideBarUserData>
            </MDBCol>
          </SideBarUser>
        </SideBarHeader>
        <SideBarList>
          <SideBarListElement onClick={handleToggle}>
            <SideBarLinkElement to="/search">
              <MDBIcon icon="search" />
              <SideBarLinkElementText>Find work</SideBarLinkElementText>
            </SideBarLinkElement>
          </SideBarListElement>
          <SideBarListElement onClick={handleToggle}>
            <SideBarLinkElement to="/my-orders">
              <MDBIcon icon="handshake" />
              <SideBarLinkElementText>My orders</SideBarLinkElementText>
            </SideBarLinkElement>
          </SideBarListElement>
          <SideBarListElement onClick={handleToggle}>
            <SideBarLinkElement to="/messages">
              <MDBIcon icon="comments" />
              <SideBarLinkElementText>Messages</SideBarLinkElementText>
            </SideBarLinkElement>
          </SideBarListElement>
          <SideBarListElement onClick={handleToggle}>
            <SideBarLinkElement to="/settings">
              <MDBIcon icon="cog" />
              <SideBarLinkElementText>Settings</SideBarLinkElementText>
            </SideBarLinkElement>
          </SideBarListElement>
        </SideBarList>
        <SideBarButton onClick={auth.login}>Log in</SideBarButton>
        <Footer />
      </SideBarContainer>
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  handleToggle: () => dispatch(toggleSideNav(false)),
});

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectNavBarVisible(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SideBar);
