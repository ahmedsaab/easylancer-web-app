import React from 'react';
import * as PropTypes from 'prop-types';
import TaskCardV2 from 'components/molecules/TaskCardV2';
import { CreatorFooter } from 'containers/MyTasksPage/WorkerTaskCard/CreatorFooter';
import { OfferCard } from 'containers/MyTasksPage/WorkerTaskCard/OfferCard';
import { OfferFooter } from 'containers/MyTasksPage/WorkerTaskCard/OfferFooter';

export function WorkerTaskCardFull({ task, onClick }) {
  return (
    <TaskCardV2
      onClick={onClick}
      task={task}
      DesktopExtension={() => <OfferCard offer={task.offer} />}
      DesktopFooter={() => <CreatorFooter user={task.creatorUser} />}
      MobileFooter={() => <OfferFooter offer={task.offer} />}
    />
  );
}

WorkerTaskCardFull.propTypes = {
  task: PropTypes.object,
  onClick: PropTypes.func,
};

export function WorkerTaskCardNoOffer({ task, onClick }) {
  return (
    <TaskCardV2
      onClick={onClick}
      task={task}
      DesktopFooter={() => <CreatorFooter user={task.creatorUser} />}
    />
  );
}

WorkerTaskCardNoOffer.propTypes = {
  task: PropTypes.object,
  onClick: PropTypes.func,
};
