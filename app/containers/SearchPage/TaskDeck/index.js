import React from 'react';
import * as PropTypes from 'prop-types';

import LoadingIndicator from 'components/molecules/LoadingIndicator';
import { withRouter } from 'react-router-dom';
import TaskCard from 'components/molecules/TaskCard';
import { CardDeckResp } from 'containers/SearchPage/TaskDeck/components';

function TaskDeck({ loading, error, tasks, history }) {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>{JSON.stringify(error.message)}</div>;
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
