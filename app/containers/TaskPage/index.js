import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadTask, loadTaskOffers } from 'containers/TaskPage/actions';
import { MDBCol, MDBRow } from 'mdbreact';
import TaskHeader from 'containers/TaskPage/TaskHeader';
import TaskSwitch from 'containers/TaskPage/TaskSwitch';
import FitPage from 'components/atoms/FitPage';
import reducer from 'containers/TaskPage/reducer';
import {
  selectTaskPageTaskData,
  selectTaskPageTaskError,
  selectTaskPageTaskLoading,
} from 'containers/TaskPage/selectors';
import Spinner from 'components/atoms/Spinner';
import OfferModal from 'containers/TaskPage/OfferModal';
import ProfileCard from 'components/molecules/ProfileCard';
import history from 'utils/history';
import saga, { offerUrlRegex } from 'containers/TaskPage/saga';
import TaskActionButtons from 'containers/TaskPage/TaskActionButtons';
import CreateOfferModal from 'containers/TaskPage/CreateOfferModal';
import TaskAssignedModal from 'containers/TaskPage/TaskAssignedModal';
import WithdrawOfferModal from 'containers/TaskPage/WithdrawOfferModal';
import styled from 'styled-components';
import CancelTaskModal from 'containers/TaskPage/CancelTaskModal';

export const ContainerRow = styled(MDBRow)`
  padding-top: 0.5rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
`;

export function TaskPage({
  match,
  location,
  loading,
  error,
  task,
  onPageLoad,
}) {
  useInjectReducer({ key: 'taskPage', reducer });
  useInjectSaga({ key: 'taskPage', saga });

  const ref = useRef(null);
  const { id } = match.params;

  useEffect(() => {
    onPageLoad(id);
  }, [id]);

  if (loading) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }

  if (error) {
    return <div>{JSON.stringify(error.message)}</div>;
  }

  return (
    <div ref={ref}>
      <Helmet>
        <title>{task.title}</title>
        <meta
          name="description"
          content="This is a page that shows the details of a Task"
        />
      </Helmet>
      <ContainerRow>
        <CreateOfferModal />
        <TaskAssignedModal />
        <WithdrawOfferModal />
        <CancelTaskModal />
        <MDBCol sm="12" md="8">
          <MDBRow>
            <MDBCol size="12">
              <TaskHeader />
            </MDBCol>
          </MDBRow>
          <TaskSwitch />
        </MDBCol>
        <MDBCol sm="12" md="4">
          <TaskActionButtons containerRef={ref} />
          <hr />
          <MDBRow className="no-gutters">
            <MDBCol>
              <OfferModal
                onClose={() => history.push(`/task/${task.id}/offers/`)}
                isOpen={offerUrlRegex.test(location.pathname)}
              />
              <ProfileCard user={task.creatorUser} />
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
  task: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  onPageLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  task: selectTaskPageTaskData,
  loading: selectTaskPageTaskLoading,
  error: selectTaskPageTaskError,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => {
    dispatch(loadTask(id));
    dispatch(loadTaskOffers(id));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TaskPage);
