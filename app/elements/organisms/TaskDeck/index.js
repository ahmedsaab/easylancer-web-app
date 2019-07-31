import React from 'react';
import * as PropTypes from 'prop-types';

import LoadingIndicator from 'elements/organisms/LoadingIndicator';
import { withRouter } from 'react-router-dom';
import TaskCard from 'elements/organisms/TaskCard';
import { CardDeckResp } from 'elements/organisms/TaskDeck/components';

function TaskDeck({ loading, error, tasks, history }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (tasks.length > 0) {
    const taskCards = tasks.map(task => (
      <TaskCard
        key={task.id}
        task={task}
        viewTaskAction={() => history.push(`/task/${task.id}`)}
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
