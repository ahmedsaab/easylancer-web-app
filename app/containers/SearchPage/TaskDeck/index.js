import React from 'react';
import * as PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import TaskCardV2 from 'components/molecules/TaskCardV2';
import { CardDeckResp } from 'containers/SearchPage/TaskDeck/components';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import Error500 from 'components/atoms/Error500';
import { CreatorFooter } from 'containers/MyTasksPage/WorkerTaskCard/CreatorFooter';
import styled from 'styled-components';

const Task = styled(TaskCardV2)`
  cursor: pointer;
`;

function TaskDeck({ loading, error, tasks, history }) {
  if (loading) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }
  if (error) {
    return <Error500 />;
  }
  if (tasks.length > 0) {
    const taskCards = tasks.map(task => (
      <Task
        key={task.id}
        task={task}
        compact
        MobileFooter={() => <CreatorFooter user={task.creatorUser} />}
        DesktopFooter={() => <CreatorFooter user={task.creatorUser} />}
        onClick={() => history.push(`/task/${task.id}`)}
      />
    ));
    return <CardDeckResp deck>{taskCards}</CardDeckResp>;
  }
  return <div />;
}

TaskDeck.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tasks: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TaskDeck);
