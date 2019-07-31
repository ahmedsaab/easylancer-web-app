/**
 *
 * TabSwitch
 *
 */

import React from 'react';
import { MDBCol, MDBNavItem, MDBRow } from 'mdbreact';
import {
  TabContent,
  TabNav,
  TabNavLink,
} from 'elements/organisms/TabSwitch/components';
import { Route, Switch } from 'react-router-dom';
import * as PropTypes from 'prop-types';

function TabSwitch({ tabs }) {
  const tabLinks = tabs.map(tab => (
    <MDBNavItem key={tab.path}>
      <TabNavLink exact={tab.exact} to={tab.path}>
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
  tabs: PropTypes.array,
};

export default TabSwitch;
