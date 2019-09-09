import React from 'react';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectNavBarVisible } from 'containers/SideBar/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { MDBIcon } from 'mdbreact';
import { toggleSideNav } from 'containers/Header/actions';
import {
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
  SideBarButtonContainer,
  ImagePlaceholder,
  SideBarButtonContainerBottom,
  SideBarButton,
} from 'containers/SideBar/components';
import reducer from 'containers/SideBar/reducer';
import { makeSelectGlobalUser } from 'containers/App/selectors';
import { setBodyScroll } from 'containers/App/actions';
import Footer from 'components/molecules/Footer';
import auth from 'utils/auth';
import Spinner from 'components/atoms/Spinner';
import { updateTaskModalIsOpen } from 'containers/CreateTaskModal/actions';

function SideBar({ isOpen, user, handleToggle, onCreateTaskButtonClick }) {
  useInjectReducer({ key: 'sideNavBar', reducer });

  return (
    <div>
      <SideBarOverlay
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={handleToggle}
      />
      <SideBarContainer className={isOpen ? 'active' : ''} id="sidebar">
        <SideBarHeader>
          {user ? (
            <SideBarUser>
              <ImagePlaceholder>
                <SideBarUserImage src="https://i.pravatar.cc/55" />
              </ImagePlaceholder>
              <SideBarUserData>
                <SideBarUserData>
                  <SideBarUserName>
                    {user.firstName} {user.lastName}
                  </SideBarUserName>
                  <SideBarUserCredit>
                    <SideBarUserCreditAmount>€ 112</SideBarUserCreditAmount>
                    <MDBIcon icon="wallet" />
                  </SideBarUserCredit>
                </SideBarUserData>
              </SideBarUserData>
            </SideBarUser>
          ) : (
            <Spinner dimension="30px" margin="9px" />
          )}
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
        <SideBarButtonContainer>
          <SideBarButton
            variant="contained"
            fullWidth
            onClick={onCreateTaskButtonClick}
          >
            <MDBIcon className="mr-3" icon="magic" />
            Create task
          </SideBarButton>
        </SideBarButtonContainer>
        <SideBarButtonContainerBottom>
          <SideBarButton color="white" onClick={auth.logout}>
            Log out
          </SideBarButton>
        </SideBarButtonContainerBottom>
        <Footer />
      </SideBarContainer>
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
  user: PropTypes.object,
  onCreateTaskButtonClick: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  handleToggle: () => {
    dispatch(setBodyScroll(true));
    dispatch(toggleSideNav(false));
  },
  onCreateTaskButtonClick: () => {
    dispatch(updateTaskModalIsOpen(true));
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
