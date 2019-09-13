import React from 'react';
import * as PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import TaskCard from 'components/molecules/TaskCard';
import { CardDeckResp } from 'containers/SearchPage/TaskDeck/components';
import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import Error500 from 'components/atoms/Error500';

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
