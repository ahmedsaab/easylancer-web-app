import React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TaskCategoryImage from 'components/atoms/TaskCategoryImage';
import Tag from 'components/atoms/Tag';
import { formatTaskStartDateTime } from 'utils/date-time-helpers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PriceTag from 'components/molecules/PriceTag';
import Divider from '@material-ui/core/Divider';

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
    height: '100%',
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
    marginBottom: theme.spacing(0.5),
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
  price: {
    fontSize: '1.4rem',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
    },
  },
  paymentMethod: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(1),
    },
  },
  header: {
    display: 'flex',
  },
  categoryImage: {
    flexShrink: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
}));

export default function TaskCardV2({
  task,
  MobileFooter,
  DesktopFooter,
  DesktopExtension,
  onClick,
  className,
  compact,
}) {
  const classes = useStyles();
  let mobileFooter = null;
  let desktopFooter = null;
  let desktopExtension = null;

  if (MobileFooter) {
    mobileFooter = [
      <Grid key="divider" className={classes.hideInDesktop} item xs={12}>
        <Divider className={classes.divider} orientation="horizontal" />
      </Grid>,
      <Grid key="content" className={classes.hideInDesktop} item xs={12}>
        <MobileFooter />
      </Grid>,
    ];
  }

  if (DesktopFooter) {
    desktopFooter = [
      <Grid key="divider" className={classes.hideInMobile} item xs={12}>
        <Divider className={classes.divider} orientation="horizontal" />
      </Grid>,
      <Grid key="content" className={classes.hideInMobile} item sm={6}>
        <DesktopFooter />
      </Grid>,
    ];
  }

  if (DesktopExtension) {
    desktopExtension = (
      <Grid className={classes.hideInMobile} item xs={12} sm={5}>
        <Card className={classes.card} onClick={onClick}>
          <CardContent className={classes.content}>
            <DesktopExtension />
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid className={clsx(classes.container, className)} container spacing={2}>
      <Grid item xs={12} sm={desktopExtension ? 7 : 12}>
        <Card className={classes.card} onClick={onClick}>
          <CardContent className={classes.content}>
            <Grid container spacing={1}>
              <Grid
                className={classes.header}
                item
                sm={12}
                md={compact ? 12 : 7}
                lg={compact ? 12 : desktopExtension ? 7 : 9}
              >
                <div className={classes.categoryImage}>
                  <TaskCategoryImage
                    className={classes.image}
                    category={task.category}
                  />
                </div>
                <div className={classes.text}>
                  <div className={classes.title}>{task.title}</div>
                  {task.tags.length ? (
                    <div className={classes.tags}>
                      {task.tags.map(tag => (
                        <Tag className={classes.tag} key={tag}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Grid>
              <Grid
                item
                xs={9}
                md={compact ? 12 : 5}
                lg={compact ? 12 : desktopExtension ? 5 : 3}
              >
                <div className={classes.info}>
                  <ScheduleIcon className={classes.icon} />
                  <div>{formatTaskStartDateTime(task.startDateTime)}</div>
                </div>
                <div className={classes.info}>
                  <LocationOnIcon className={classes.icon} />
                  <div>{task.location.address}</div>
                </div>
              </Grid>
              {desktopFooter}
              <Grid item xs={3} sm={compact ? desktopFooter ? 6 : 3 : 6}>
                <PriceTag
                  className={classes.price}
                  price={task.price}
                  paymentMethod={task.paymentMethod}
                  classes={{ method: classes.paymentMethod }}
                />
              </Grid>
              {mobileFooter}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {desktopExtension}
    </Grid>
  );
}

TaskCardV2.propTypes = {
  task: PropTypes.object,
  className: PropTypes.string,
  compact: PropTypes.bool,
  onClick: PropTypes.func,
  MobileFooter: PropTypes.any,
  DesktopFooter: PropTypes.any,
  DesktopExtension: PropTypes.any,
};
