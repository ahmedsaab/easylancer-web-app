import React from 'react';
import { MDBCol, MDBNav, MDBNavItem, MDBRow } from 'mdbreact';
import { Route, Switch } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'utils/history';

const TabNav = styled(MDBNav)`
  border-bottom: 2px solid #dee2e6;
`;

const TabNavLink = styled.div`
  color: #4cbbad;
  margin-top: 28px;
  font-weight: bold;
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

function TabSwitch({ tabs, disabled }) {
  const tabLinks = tabs.map(tab => (
    <MDBNavItem disabled key={tab.path}>
      <TabNavLink onClick={() => (!disabled ? history.push(tab.path) : null)}>
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
        <Switch>{tabSwitch}</Switch>
      </MDBCol>
    </MDBRow>
  );
}

TabSwitch.propTypes = {
  disabled: PropTypes.bool,
  tabs: PropTypes.array,
};

export default TabSwitch;
