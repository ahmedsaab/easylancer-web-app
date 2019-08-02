import React from 'react';
import * as PropTypes from 'prop-types';
import TaskDetails from 'elements/organisms/TaskDetails';
import { MDBBadge, MDBIcon } from 'mdbreact';
import TaskOffers from 'elements/organisms/TaskOffers';
import TabSwitch from 'elements/molecules/TabSwitch';

function TaskSwitch({ task, offers, disabled }) {
  const tabs = [
    {
      match: `/task/${task.id}`,
      path: `/task/${task.id}`,
      header: 'Details',
      component: () => <TaskDetails task={task} />,
      exact: true,
    },
    {
      match: `/task/${task.id}/offers/*`,
      path: `/task/${task.id}/offers/`,
      header: (
        <div>
          Offers
          {offers.data ? (
            <MDBBadge color="default" pill className="ml-2">
              {offers.data.length}
            </MDBBadge>
          ) : (
            <MDBIcon icon="spinner" pulse className="ml-2" spin fixed />
          )}
        </div>
      ),
      component: () => (
        <TaskOffers
          disabled={disabled}
          offers={offers.data}
          loading={offers.loading}
          error={offers.error}
        />
      ),
    },
  ];
  return <TabSwitch disabled={disabled} tabs={tabs} />;
}

TaskSwitch.propTypes = {
  disabled: PropTypes.bool,
  task: PropTypes.object,
  offers: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.instanceOf(Error),
  }),
};

export default TaskSwitch;
