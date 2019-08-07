import React, { useEffect, useRef } from 'react';
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
import { ContainerRow } from 'elements/pages/TaskPage/components';
import OfferDetailsModal from 'elements/pages/OfferDetailsModal';
import saga from 'elements/pages/TaskPage/saga';
import reducer from 'elements/pages/TaskPage/reducer';
import {
  makeSelectTaskPageTask,
  makeSelectTaskPageOffers,
} from 'elements/pages/TaskPage/selectors';
import { makeSelectOfferDetailsIsSending } from 'elements/pages/OfferDetailsModal/selectors';
import TaskActionButtons from 'elements/organisms/TaskActionButtons';

export function TaskPage({
  match,
  history,
  task,
  offers,
  onPageLoad,
  isSendingOffer,
}) {
  useInjectReducer({ key: 'taskPage', reducer });
  useInjectSaga({ key: 'taskPage', saga });

  const ref = useRef(null);
  const { id } = match.params;

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
    <div ref={ref}>
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
          <TaskSwitch
            disabled={isSendingOffer}
            task={task.data}
            offers={offers}
          />
        </MDBCol>
        <MDBCol sm="12" md="4">
          <TaskActionButtons containerRef={ref} />
          <hr />
          <MDBRow className="no-gutters">
            <MDBCol>
              <OfferDetailsModal
                onClose={() => history.push(`/task/${task.data.id}/offers/`)}
              />
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
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
  isSendingOffer: PropTypes.bool,
  onPageLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  offers: makeSelectTaskPageOffers(),
  task: makeSelectTaskPageTask(),
  isSendingOffer: makeSelectOfferDetailsIsSending(),
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
