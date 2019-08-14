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

import SideBar from 'containers/SideBar';
import Header from 'containers/Header';
import TaskPage from 'containers/TaskPage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import auth from 'utils/auth';
import { Container, ContentRow, Wrapper } from 'containers/App/components';
import Modal from 'containers/Modal';
import GlobalStyle from 'global-styles';
import { useInjectSaga } from 'utils/injectSaga';
import { loadUser } from 'containers/App/actions';
import saga from 'containers/App/saga';

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

function App({ onLoad }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    if (
      process.env.AUTH &&
      !auth.isAuthenticated() &&
      // eslint-disable-next-line no-restricted-globals
      !location.pathname.includes('/callback')
    ) {
      auth.login();
    } else {
      onLoad();
    }
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Helmet titleTemplate="%s | Easylancer" defaultTitle="Easylancer">
        <meta
          name="description"
          content="Find local skilled workers in your city"
        />
      </Helmet>
      <Wrapper>
        <SideBar />
        <Container fluid>
          <MDBRow>
            <Header />
          </MDBRow>
          <ContentRow>
            <div style={{ width: '100%' }}>
              <Modal />
              <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route path="/task/:id" component={TaskPage} />
                <Route path="/search" component={SearchPage} />
                <Route
                  path="/callback"
                  render={props => {
                    handleAuthentication(props);
                    return <LoadingIndicator />;
                  }}
                />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </div>
          </ContentRow>
        </Container>
      </Wrapper>
      <GlobalStyle />
    </div>
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
