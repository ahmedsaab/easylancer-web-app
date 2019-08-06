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
import { makeSelectGlobalUser } from 'elements/pages/App/selectors';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import { setBodyScroll } from 'elements/pages/App/actions';

function SideBar({ isOpen, user, handleToggle }) {
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
                {user ? (
                  <SideBarUserData>
                    <SideBarUserName>
                      {user.firstName} {user.lastName}
                    </SideBarUserName>
                    <SideBarUserCredit>
                      <SideBarUserCreditAmount>€ 112</SideBarUserCreditAmount>
                      <MDBIcon icon="wallet" />
                    </SideBarUserCredit>
                  </SideBarUserData>
                ) : (
                  <LoadingIndicator />
                )}
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
  user: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  handleToggle: () => {
    dispatch(setBodyScroll(true));
    dispatch(toggleSideNav(false));
  },
});

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectNavBarVisible(),
  user: makeSelectGlobalUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SideBar);