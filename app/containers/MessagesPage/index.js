import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SessionsTable from './SessionsTable';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paperSession: {
    height: '96vh',
    width: '40%',
  },
  paperChat: {
    height: '96vh',
    width: '60%',
  },
  control: {
    padding: theme.spacing(2),
  },

  chatContainer: {
    display: 'flex',
    width: '100%',
  },
}));

function MessagesPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item className={classes.chatContainer}>
        <SessionsTable />
        <Paper className={classes.paperChat} />
      </Grid>
    </Grid>
  );
}

export default MessagesPage;
