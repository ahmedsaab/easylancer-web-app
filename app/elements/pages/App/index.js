/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Helmet } from 'react-helmet';
import SideBar from 'elements/pages/SideBar';
import { Switch, Route } from 'react-router-dom';
import { MDBCol, MDBRow } from 'mdbreact';
import Header from 'elements/pages/Header';
import TaskPage from 'elements/pages/TaskPage/Loadable';
import SearchPage from 'elements/pages/SearchPage/Loadable';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import NotFoundPage from 'elements/pages/NotFoundPage/Loadable';
import auth from 'utils/auth';
import { Container, ContentRow, Wrapper } from 'elements/pages/App/components';
import Modal from 'elements/pages/Modal';
import GlobalStyle from 'global-styles';

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

function App() {
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

export default App;
