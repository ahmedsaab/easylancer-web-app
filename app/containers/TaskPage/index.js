import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingIndicator from 'components/LoadingIndicator';
import { loadTask, loadTaskOffers } from 'containers/TaskPage/actions';
import { MDBBadge, MDBCol, MDBIcon, MDBRow } from 'mdbreact';
import TaskDetails from 'components/TaskDetails';
import TaskOffers from 'components/TaskOffers';
import ProfileCard from 'components/ProfileCard';
import TaskHeader from 'components/TaskHeader';
import TabSwitch from 'components/TabSwitch';
import ActionButtons from 'components/ActionButtons';
import { ContainerRow } from 'containers/TaskPage/components';
import { updateModal } from 'containers/Modal/actions';
import saga from './saga';
import reducer from './reducer';
import { makeSelectTaskPageTask, makeSelectTaskPageOffers } from './selectors';

import './temp-styles.css';

export function TaskPage({
  match,
  task,
  offers,
  onPageLoad,
  onCreateOfferButtonClick,
}) {
  useInjectReducer({ key: 'taskPage', reducer });
  useInjectSaga({ key: 'taskPage', saga });

  const { id } = match.params;
  const tabs = [
    {
      path: `/task/${id}`,
      header: 'Details',
      component: () => <TaskDetails task={task.data} />,
      exact: true,
    },
    {
      path: `/task/${id}/offers`,
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
          offers={offers.data}
          loading={offers.loading}
          error={offers.error}
        />
      ),
    },
  ];
  const actionButtons = [
    {
      icon: 'file-contract',
      text: 'Offer',
      onClick: onCreateOfferButtonClick,
    },
    {
      icon: 'envelope',
      text: 'Message',
      onClick: () => {},
      far: true,
    },
  ];

  useEffect(() => {
    onPageLoad(id);
  }, [id]);

  if (task.loading || (!task.error && !task.data)) {
    return <LoadingIndicator />;
  }

  if (task.error) {
    return <div>{JSON.stringify(task.error.message)}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>TaskPage</title>
        <meta
          name="description"
          content="This is a page that shows the details of a Task"
        />
      </Helmet>
      <ContainerRow>
        <MDBCol sm="12" md="8">
          <MDBRow>
            <MDBCol size="12">
              <TaskHeader task={task.data} />
            </MDBCol>
          </MDBRow>
          <TabSwitch tabs={tabs} />
        </MDBCol>
        <MDBCol sm="12" md="4">
          <ActionButtons buttons={actionButtons} />
          <hr />
          <ProfileCard user={task.data.creatorUser} />
        </MDBCol>
      </ContainerRow>
    </div>
  );
}

TaskPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  task: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.instanceOf(Error),
  }),
  offers: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.instanceOf(Error),
  }),
  onPageLoad: PropTypes.func,
  onCreateOfferButtonClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  offers: makeSelectTaskPageOffers(),
  task: makeSelectTaskPageTask(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => {
    dispatch(loadTask(id));
    dispatch(loadTaskOffers(id));
  },
  onCreateOfferButtonClick: () => dispatch(updateModal('create-offer')),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskPage);
