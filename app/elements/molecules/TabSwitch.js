import React from 'react';
import { MDBCol, MDBNav, MDBNavItem, MDBNavLink, MDBRow } from 'mdbreact';
import { Route, Switch } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const TabNav = styled(MDBNav)`
  border-bottom: 3px solid #dee2e6;
`;

const TabNavLink = styled(MDBNavLink)`
  color: #4cbbad;
  margin-top: 28px;
  font-weight: 520;
  font-size: 1.2rem;
  &.active {
    background-color: #fafafa !important;
    border-color: #dee2e6 #dee2e6 #fafafa !important;
    border: solid 3px;
    margin-bottom: -2px;
    border-bottom: 3px solid;
  }
`;

const TabContent = styled('div')`
  border-left: 3px solid #dee2e6;
  border-right: 3px solid #dee2e6;
  border-bottom: 3px solid #dee2e6;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  margin-bottom: 20px;
  margin-top: -3px;
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
  );
}

TabSwitch.propTypes = {
  disabled: PropTypes.bool,
  tabs: PropTypes.array,
};

export default TabSwitch;
