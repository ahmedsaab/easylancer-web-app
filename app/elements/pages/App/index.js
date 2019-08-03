/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MDBCol, MDBRow } from 'mdbreact';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import SideBar from 'elements/pages/SideBar';
import Header from 'elements/pages/Header';
import TaskPage from 'elements/pages/TaskPage/Loadable';
import SearchPage from 'elements/pages/SearchPage/Loadable';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import NotFoundPage from 'elements/pages/NotFoundPage/Loadable';
import auth from 'utils/auth';
import { Container, ContentRow, Wrapper } from 'elements/pages/App/components';
import Modal from 'elements/pages/Modal';
import GlobalStyle from 'global-styles';
import { useInjectSaga } from 'utils/injectSaga';
import { loadUser } from 'elements/pages/App/actions';
import saga from './saga';

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

function App({ onLoad }) {
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    onLoad();
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
            <MDBCol size="12">
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
            </MDBCol>
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
