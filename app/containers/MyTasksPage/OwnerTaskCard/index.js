import React from 'react';
import * as PropTypes from 'prop-types';
import TaskCardV2 from 'components/molecules/TaskCardV2';
import { AssigneeCard } from 'containers/MyTasksPage/OwnerTaskCard/AssigneeCard';
import { StatisticFooter } from 'containers/MyTasksPage/OwnerTaskCard/StatisticFooter';

export function OwnerAssignedTaskCard({ task, onClick }) {
  return (
    <TaskCardV2
      onClick={onClick}
      task={task}
      DesktopExtension={() => <AssigneeCard user={task.workerUser} />}
      MobileFooter={() => <AssigneeCard user={task.workerUser} />}
      DesktopFooter={() => (
        <StatisticFooter number={task.offers} status={task.status} />
      )}
    />
  );
}

OwnerAssignedTaskCard.propTypes = {
  task: PropTypes.object,
  onClick: PropTypes.func,
};

export function OwnerOpenTaskCard({ task, onClick }) {
  return (
    <TaskCardV2
      onClick={onClick}
      task={task}
      MobileFooter={() => (
        <StatisticFooter number={task.offers} status={task.status} />
      )}
      DesktopFooter={() => (
        <StatisticFooter number={task.offers} status={task.status} />
      )}
    />
  );
}

OwnerOpenTaskCard.propTypes = {
  task: PropTypes.object,
  onClick: PropTypes.func,
};
