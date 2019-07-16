import React from 'react';
import * as PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import { withRouter } from 'react-router-dom';
import TaskCard from 'components/TaskCard';
import { CardDeckResp } from 'components/TaskDeck/components';

function TaskDeck({ loading, error, tasks, history }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }
  if (error) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
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
