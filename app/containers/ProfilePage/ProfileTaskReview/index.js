import TaskCardV2 from 'components/molecules/TaskCardV2';
import React from 'react';
import * as PropTypes from 'prop-types';
import ProfileReview from 'containers/ProfilePage/ProfileTaskReview/ProfileReview';
import { CardProfileReview } from 'containers/ProfilePage/ProfileTaskReview/CardProfileReview';

export default function ProfileTaskReview({ task, onClick, className = '' }) {
  return (
    <TaskCardV2
      className={className}
      onClick={onClick}
      task={task}
      compact
      DesktopExtension={() => (
        <CardProfileReview
          review={task.creatorRating}
          user={task.creatorUser}
        />
      )}
      MobileFooter={() => (
        <ProfileReview review={task.creatorRating} user={task.creatorUser} />
      )}
    />
  );
}

ProfileTaskReview.propTypes = {
  task: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
