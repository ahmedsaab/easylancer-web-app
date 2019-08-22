import React from 'react';
import * as PropTypes from 'prop-types';
import TaskDetails from 'containers/TaskPage/TaskDetails';
import { MDBBadge, MDBIcon } from 'mdbreact';
import TaskOffers from 'containers/TaskPage/TaskOffers';
import TabSwitch from 'components/molecules/TabSwitch';
import { createStructuredSelector } from 'reselect';
import {
  selectTaskPageTaskData,
  selectTaskPageOffersData,
} from 'containers/TaskPage/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

function TaskSwitch({ task, offers, disabled }) {
  const offersBadge =
    // eslint-disable-next-line no-nested-ternary
    !Array.isArray(offers) ? (
      <MDBIcon icon="spinner" pulse className="ml-2" spin fixed />
    ) : offers.length ? (
      <MDBBadge color="default" pill className="ml-2">
        {offers.length}
      </MDBBadge>
    ) : null;

  const tabs = [
    {
      match: `/task/${task.id}`,
      path: `/task/${task.id}`,
      header: 'Details',
      component: () => <TaskDetails />,
      exact: true,
    },
    {
      match: `/task/${task.id}/offers/*`,
      path: `/task/${task.id}/offers/`,
      header: (
        <div>
          Offers
          {offersBadge}
        </div>
      ),
      component: () => <TaskOffers />,
    },
  ];
  return <TabSwitch disabled={disabled} tabs={tabs} />;
}

TaskSwitch.propTypes = {
  disabled: PropTypes.bool,
  task: PropTypes.object,
  offers: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  offers: selectTaskPageOffersData,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TaskSwitch);
