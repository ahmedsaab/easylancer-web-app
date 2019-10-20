import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

function SessionsTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.paperSession}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Sessions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell>Session 1</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Session 2</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Session 3</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell>Session 4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default SessionsTable;
