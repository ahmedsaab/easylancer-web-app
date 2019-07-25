import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingIndicator from 'components/LoadingIndicator';
import { loadTask } from 'containers/TaskPage/actions';
import { MDBCol, MDBRow } from 'mdbreact';
import TaskDetails from 'components/TaskDetails';
import TaskOffers from 'components/TaskOffers';
import ProfileCard from 'components/ProfileCard';
import TaskHeader from 'components/TaskHeader';
import TabSwitch from 'components/TabSwitch';
import ActionButtons from 'components/ActionButtons';
import { ContainerRow } from 'containers/TaskPage/components';
import { makeSelectOpenedModal } from 'containers/App/selectors';
import { updateModal } from 'containers/App/actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectTaskPageTask,
  makeSelectTaskPageLoading,
  makeSelectTaskPageError,
} from './selectors';

import './temp-styles.css';
import CreateOfferModal from 'components/CreateOfferModal';

export function TaskPage({
  match,
  task,
  loading,
  error,
  onPageLoad,
  updateGlobalModal,
  openedModal,
}) {
  useInjectReducer({ key: 'taskPage', reducer });
  useInjectSaga({ key: 'taskPage', saga });

  const { id } = match.params;
  const tabs = [
    {
      path: `/task/${id}`,
      text: 'Details',
      component: () => <TaskDetails task={task} />,
      exact: true,
    },
    {
      path: `/task/${id}/offers`,
      text: 'Offers',
      component: TaskOffers,
    },
  ];
  const actionButtons = [
    {
      icon: 'file-contract',
      text: 'Offer',
      onClick: () => updateGlobalModal('create-offer'),
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

  if (loading || (!error && !task)) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>{JSON.stringify(error.message)}</div>;
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
              <TaskHeader task={task} />
            </MDBCol>
          </MDBRow>
          <TabSwitch tabs={tabs} />
        </MDBCol>
        <MDBCol sm="12" md="4">
          <ActionButtons buttons={actionButtons} />
          <hr />
          <ProfileCard user={task.creatorUser} />
        </MDBCol>
        <CreateOfferModal
          taskTitle={task.title}
          isOpen={openedModal === 'create-offer'}
          onClose={() => updateGlobalModal(null)}
          onSend={() => updateGlobalModal(null)}
        />
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
  onPageLoad: PropTypes.func,
  updateGlobalModal: PropTypes.func,
  openedModal: PropTypes.string,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
  task: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  task: makeSelectTaskPageTask(),
  loading: makeSelectTaskPageLoading(),
  error: makeSelectTaskPageError(),
  openedModal: makeSelectOpenedModal(),
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(loadTask(id)),
  updateGlobalModal: name => dispatch(updateModal(name)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskPage);
