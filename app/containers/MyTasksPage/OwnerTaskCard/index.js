import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TaskCategoryImage from 'components/atoms/TaskCategoryImage';
import Tag from 'components/atoms/Tag';
import { formatTaskStartDateTime } from 'utils/date-time-helpers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PriceTag from 'components/molecules/PriceTag';

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(1),
    cursor: 'pointer',
  },
  icon: {
    color: '#3983bb',
    marginRight: theme.spacing(1),
    fontSize: '1.1rem',
  },
  card: {
    width: '100%',
  },
  text: {
    paddingLeft: theme.spacing(2),
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tags: {
    flex: '1 0 100%',
  },
  title: {
    flex: '1 0 100%',
    fontSize: 18,
  },
  tag: {
    fontSize: '0.7rem',
  },
  info: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    fontSize: '0.8rem',
  },
  image: {
    verticalAlign: 'top',
  },
  hideInMobile: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  hideInDesktop: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  offerCard: {
    height: '100%',
  },
  taskPrice: {
    fontSize: '1.4rem',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  offerPrice: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  mobileOfferHeader: {
    fontSize: '0.8rem',
    color: '#9e9595',
  },
  quotes: {
    flex: 3,
    fontSize: '0.8rem',
    fontStyle: 'italic',
    '&::before': {
      fontSize: '20px',
      fontWeight: '700',
      paddingRight: '5px',
    },
    '&::after': {
      visibility: 'hidden',
    },
  },
  mobileOfferData: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default function OwnerTaskCard({ task, onClick }) {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Card className={classes.card} onClick={onClick}>
          <CardContent>{JSON.stringify(task)}</CardContent>
        </Card>
      </Grid>
      <Grid className={classes.hideInMobile} item xs={12} sm={4}>
        <Card
          className={`${classes.card} ${classes.offerCard}`}
          onClick={onClick}
        >
          <CardContent>
            <div>{task.offers}</div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

OwnerTaskCard.propTypes = {
  task: PropTypes.object,
  onClick: PropTypes.func,
};
