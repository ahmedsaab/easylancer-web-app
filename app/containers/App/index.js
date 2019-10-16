/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MDBRow } from 'mdbreact';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { red } from '@material-ui/core/colors';

import SideBar from 'containers/SideBar';
import Header from 'containers/Header';
import TaskPage from 'containers/TaskPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import MyTasksPage from 'containers/MyTasksPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import MessagesPage from 'containers/MessagesPage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import { Container, ContentRow, Wrapper } from 'containers/App/components';
import GlobalStyle from 'global-styles';
import { useInjectSaga } from 'utils/injectSaga';
import { loadUser } from 'containers/App/actions';
import saga from 'containers/App/saga';
import CreateTaskModal from 'containers/CreateTaskModal';
import Error404 from 'components/atoms/Error404';

const theme = createMuiTheme({
  status: {
    danger: red[500],
  },
});

const globalStyles = makeStyles({
  '@global': {
    button: {
      '&:focus': {
        outline: 'none',
      },
    },
  },
});

function App({ onLoad }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    onLoad();
  }, []);
  const classes = globalStyles();

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={1500}
    >
      <ThemeProvider theme={theme}>
        <div style={{ overflowX: 'hidden' }}>
          <Helmet titleTemplate="%s | skillRanks" defaultTitle="skillRanks">
            <meta
              name="description"
              content="Find local skilled workers in your city"
            />
          </Helmet>
          <Wrapper classes={classes.tomato}>
            <SideBar />
            <Container fluid>
              <MDBRow>
                <Header />
              </MDBRow>
              <ContentRow>
                <div style={{ width: '100%' }}>
                  <CreateTaskModal />
                  <Switch>
                    <Route exact path="/" component={SearchPage} />
                    <Route path="/task/:id" component={TaskPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="/messages" component={MessagesPage} />

                    <Route
                      path="/profile/:id/:profileType"
                      component={ProfilePage}
                    />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/my-orders" component={MyTasksPage} />
                    <Route path="" component={Error404} />
                  </Switch>
                </div>
              </ContentRow>
            </Container>
          </Wrapper>
          <GlobalStyle />
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

App.propTypes = {
  onLoad: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(loadUser()),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
