import React from 'react';
import { MDBCol, MDBNav, MDBNavItem, MDBNavLink, MDBRow } from 'mdbreact';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const TabNav = styled(MDBNav)`
  border-bottom: 2px solid #dee2e6;
`;

const TabNavLink = styled(MDBNavLink)`
  color: #4cbbad;
  margin-top: 28px;
  font-weight: 520;
  font-size: 1.2rem;
  &.active {
    border: solid 2px;
    margin-bottom: -2px;
    border-bottom: 2px solid;
  }
  :hover:not(.active) {
    border-color: white !important;
  }
`;

const TabContent = styled('div')`
  margin-bottom: 20px;
`;

function TabSwitch({ tabs, disabled }) {
  const tabLinks = tabs.map(tab => (
    <MDBNavItem disabled key={tab.path}>
      <TabNavLink
        onClick={disabled ? e => e.preventDefault() : () => {}}
        exact={tab.exact}
        to={tab.path}
      >
        {tab.header}
      </TabNavLink>
    </MDBNavItem>
  ));

  const tabSwitch = tabs.map(tab => (
    <Route key={tab.path} exact path={tab.match} component={tab.component} />
  ));

  return (
    <BrowserRouter>
      <MDBRow>
        <MDBCol size="12">
          <TabNav className="nav-tabs nav-justified">{tabLinks}</TabNav>
        </MDBCol>
        <MDBCol size="12">
          <TabContent>
            <Switch>{tabSwitch}</Switch>
          </TabContent>
        </MDBCol>
      </MDBRow>
    </BrowserRouter>
  );
}

TabSwitch.propTypes = {
  disabled: PropTypes.bool,
  tabs: PropTypes.array,
};

export default TabSwitch;
