import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import MainDialogButton from 'components/hoc/LoadableMainDialogButton';
import React from 'react';
import * as PropTypes from 'prop-types';
import SectionHeader from 'components/molecules/SectionHeader';
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles } from '@material-ui/core';
import history from 'utils/history';

const useStyles = makeStyles(theme => ({
  icon: {
    color: '#3983bb',
    marginRight: theme.spacing(1),
  },
  reloadIcon: {
    marginRight: theme.spacing(1),
    fontSize: '1rem',
  },
  moreButton: {
    marginTop: theme.spacing(1),
    textTransform: 'none',
  },
}));

/**
 * @return {null}
 */

export default function List({
  loading,
  error,
  data,
  title,
  Icon,
  Task,
  page,
  className,
  hasNext,
  onLoadPage,
}) {
  const classes = useStyles();

  if (loading && !data) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }

  if (error) {
    return <FitPage>Error :(</FitPage>;
  }

  if (data.length === 0) {
    return null;
  }

  const tasksComponents = data.map(task => (
    <Task
      key={task.id}
      task={task}
      onClick={() => history.push(`/task/${task.id}`)}
    />
  ));

  return (
    <div className={className}>
      {title ? (
        <SectionHeader>
          {Icon ? <Icon className={classes.icon} /> : null}
          {title}
        </SectionHeader>
      ) : null}
      <div>{tasksComponents}</div>
      {hasNext ? (
        <MainDialogButton
          className={classes.moreButton}
          fullWidth
          disabled={loading}
          loading={loading}
          variant="text"
          color="default"
          onClick={() => {
            onLoadPage(page + 1);
          }}
        >
          <CachedIcon className={classes.reloadIcon} />
          Show more tasks
        </MainDialogButton>
      ) : null}
    </div>
  );
}

List.propTypes = {
  hasNext: PropTypes.bool,
  page: PropTypes.number,
  title: PropTypes.string,
  Icon: PropTypes.any,
  Task: PropTypes.any.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  data: PropTypes.array,
  className: PropTypes.string,
  onLoadPage: PropTypes.func,
};
