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
import {
  makeSelectGlobalSettings,
  makeSelectGlobalUser,
} from 'containers/App/selectors';
import { setBodyScroll, updateUserMode } from 'containers/App/actions';
import Footer from 'components/molecules/Footer';
import auth from 'utils/auth';
import Spinner from 'components/atoms/Spinner';
import { updateTaskModalIsOpen } from 'containers/CreateTaskModal/actions';
import { makeStyles } from '@material-ui/core';
import history from 'utils/history';
import RoleSwitch from 'components/molecules/RoleSwitch';

const useStyles = makeStyles(() => ({
  footerControls: {
    display: 'flex',
  },
  roleSwitch: {
    margin: 'auto 0 auto auto',
  },
  toggleLabel: {
    fontSize: '0.6rem',
  },
}));

function SideBar({
  isOpen,
  user,
  settings,
  handleToggle,
  onCreateTaskButtonClick,
  onUpdateUserModeCheck,
  onProfileButtonClick,
}) {
  useInjectReducer({ key: 'sideNavBar', reducer });
  const classes = useStyles();

  return (
    <div>
      <SideBarOverlay
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={handleToggle}
      />
      <SideBarContainer className={isOpen ? 'active' : ''} id="sidebar">
        <SideBarHeader>
          {user ? (
            <SideBarUser
              onClick={() =>
                onProfileButtonClick(user.id, user.settings.role.toLowerCase())
              }
            >
              <ImagePlaceholder>
                <SideBarUserImage src={user.imageUrl} />
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
            <Spinner dimension="30px" margin="9px" strokeWidth={5} />
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
            <SideBarLinkElement to="/my-orders/">
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
            color="primary"
            fullWidth
            onClick={onCreateTaskButtonClick}
          >
            <MDBIcon className="mr-3" icon="magic" />
            Create task
          </SideBarButton>
        </SideBarButtonContainer>
        <SideBarButtonContainerBottom>
          <div className={classes.footerControls}>
            <SideBarButton textcolor="white" onClick={auth.logout}>
              Log out
            </SideBarButton>
            {user ? (
              <RoleSwitch
                onUpdate={onUpdateUserModeCheck}
                role={settings.role}
              />
            ) : null}
          </div>
        </SideBarButtonContainerBottom>
        <Footer />
      </SideBarContainer>
    </div>
  );
}
// background-color: #f50057;
// switchBase
SideBar.propTypes = {
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
  user: PropTypes.object,
  settings: PropTypes.object,
  onCreateTaskButtonClick: PropTypes.func,
  onUpdateUserModeCheck: PropTypes.func,
  onProfileButtonClick: PropTypes.func,
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
  onProfileButtonClick: (userId, profile) => {
    history.push(`/profile/${userId}/${profile}`);
    dispatch(toggleSideNav(false));
    dispatch(setBodyScroll(true));
  },
  onUpdateUserModeCheck: event => {
    const newRole = event.target.checked ? 'WORKER' : 'OWNER';

    dispatch(updateUserMode(newRole));
    dispatch(setBodyScroll(true));
    dispatch(toggleSideNav(false));
  },
});

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectNavBarVisible(),
  user: makeSelectGlobalUser(),
  settings: makeSelectGlobalSettings(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SideBar);
