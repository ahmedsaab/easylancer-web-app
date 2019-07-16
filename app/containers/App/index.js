/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { Helmet } from 'react-helmet';
import SideBar from 'containers/SideBar';
import { Switch, Route } from 'react-router-dom';
import { MDBCol, MDBRow } from 'mdbreact';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import TaskPage from 'containers/TaskPage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import auth from 'utils/auth';
import { Container, ContentRow, Wrapper } from 'containers/App/components';
import GlobalStyle from '../../global-styles';

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Easylancer" defaultTitle="Easylancer">
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
          <MDBRow>
            <Footer />
          </MDBRow>
        </Container>
      </Wrapper>
      <GlobalStyle />
    </div>
  );
}

export default App;
