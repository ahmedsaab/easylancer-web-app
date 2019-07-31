import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import { loadTask, loadTaskOffers } from 'elements/pages/TaskPage/actions';
import { MDBCol, MDBRow } from 'mdbreact';
import ProfileCard from 'elements/organisms/ProfileCard';
import TaskHeader from 'elements/organisms/TaskHeader';
import TaskSwitch from 'elements/organisms/TaskSwitch';
import ActionButtons from 'elements/molecules/ActionButtons';
import { ContainerRow } from 'elements/pages/TaskPage/components';
import { updateModal } from 'elements/pages/Modal/actions';
import OfferDetailsModal from 'elements/pages/OfferDetailsModal';
import saga from 'elements/pages/TaskPage/saga';
import reducer from 'elements/pages/TaskPage/reducer';
import {
  makeSelectTaskPageTask,
  makeSelectTaskPageOffers,
} from 'elements/pages/TaskPage/selectors';

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
        <title>{task.data.title}</title>
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
          <TaskSwitch task={task.data} offers={offers} />
        </MDBCol>
        <MDBCol sm="12" md="4">
          <ActionButtons buttons={actionButtons} />
          <hr />
          <MDBRow className="no-gutters">
            <MDBCol>
              <OfferDetailsModal />
              <ProfileCard user={task.data.creatorUser} />
            </MDBCol>
          </MDBRow>
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
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
