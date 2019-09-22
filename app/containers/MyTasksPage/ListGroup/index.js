import FitPage from 'components/atoms/FitPage';
import Spinner from 'components/atoms/Spinner';
import React from 'react';
import * as PropTypes from 'prop-types';
import List from 'containers/MyTasksPage/List';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
  list: {
    marginTop: theme.spacing(2),
  },
}));

export default function ListGroup({ lists, path, loadListPage }) {
  const classes = useStyles();

  if (lists.find(list => !list.data)) {
    return (
      <FitPage>
        <Spinner dimension="50px" />
      </FitPage>
    );
  }

  if (lists.find(list => list.error)) {
    return <FitPage>Error :(</FitPage>;
  }

  let content = 'All clear!';

  if (lists.find(list => list.data.length > 0)) {
    content = lists.map(list => (
      <List
        className={classes.list}
        key={list.name}
        onLoadPage={page => loadListPage(list.name, page)}
        {...list}
      />
    ));
  }

  return (
    <Route
      exact
      path={path}
      component={() => <div className={classes.container}>{content}</div>}
    />
  );
}

ListGroup.propTypes = {
  lists: PropTypes.array.isRequired,
  loadListPage: PropTypes.func,
  path: PropTypes.string,
};
