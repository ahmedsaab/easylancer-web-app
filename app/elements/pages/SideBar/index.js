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
          <SideBarListElement>
            <SideBarLinkElement to="/search">
              <div onClick={handleToggle}>
                <MDBIcon icon="search" />
                <SideBarLinkElementText>Find work</SideBarLinkElementText>
              </div>
            </SideBarLinkElement>
          </SideBarListElement>
          <SideBarListElement>
            <SideBarLinkElement to="/my-orders">
              <div onClick={handleToggle}>
                <MDBIcon icon="handshake" />
                <SideBarLinkElementText>My orders</SideBarLinkElementText>
              </div>
            </SideBarLinkElement>
          </SideBarListElement>
          <SideBarListElement>
            <SideBarLinkElement to="/messages">
              <div onClick={handleToggle}>
                <MDBIcon icon="comments" />
                <SideBarLinkElementText>Messages</SideBarLinkElementText>
              </div>
            </SideBarLinkElement>
          </SideBarListElement>
          <SideBarListElement>
            <SideBarLinkElement to="/settings">
              <div onClick={handleToggle}>
                <MDBIcon icon="cog" />
                <SideBarLinkElementText>Settings</SideBarLinkElementText>
              </div>
            </SideBarLinkElement>
          </SideBarListElement>
        </SideBarList>
        <SideBarButton onClick={auth.login}>Log in</SideBarButton>
      </SideBarContainer>
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  handleToggle: () => dispatch(toggleSideNav()),
});

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectNavBarVisible(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SideBar);
