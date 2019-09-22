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
import FullName from 'components/molecules/FullName';
import Avatar from 'components/molecules/Avatar';
import CenteredDiv from 'components/atoms/CenteredDiv';

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
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
    },
  },
  taskPriceMethod: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(1),
    },
  },
  mobileOfferPrice: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  desktopOfferPrice: {
    flexGrow: 1,
  },
  offerHeader: {
    fontSize: '0.8rem',
    color: '#9e9595',
  },
  quotes: {
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
  header: {
    display: 'flex',
  },
  categoryImage: {
    flexShrink: 1,
  },
  creatorName: {
    fontSize: '0.8rem',
    maxWidth: '80%',
    paddingLeft: theme.spacing(1),
    lineHeight: '35px',
  },
  creatorImage: {
    maxWidth: '20%',
    flexShrink: 1,
  },
  creator: {
    display: 'flex',
    alignItems: 'left',
  },
  cardContent: {
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
  offerCardContent: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
}));

export default function WorkerTaskCard({ task, onClick }) {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Card className={classes.card} onClick={onClick}>
          <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
              <Grid className={classes.header} item sm={12} md={8}>
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
              <Grid item xs={9} md={4}>
                <div className={classes.info}>
                  <ScheduleIcon className={classes.icon} />
                  <div>{formatTaskStartDateTime(task.startDateTime)}</div>
                </div>
                <div className={classes.info}>
                  <LocationOnIcon className={classes.icon} />
                  <div>{task.location.address}</div>
                </div>
              </Grid>
              <Grid className={classes.hideInMobile} item xs={12}>
                <Divider className={classes.divider} orientation="horizontal" />
              </Grid>
              <Grid className={classes.hideInMobile} item sm={6}>
                <div className={classes.creator}>
                  <Avatar
                    imgSrc="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
                    imgStyle={{ maxWidth: '35px' }}
                    className={classes.creatorImage}
                  />
                  <FullName
                    className={classes.creatorName}
                    user={task.creatorUser}
                  />
                </div>
              </Grid>
              <Grid item xs={3} sm={6}>
                <PriceTag
                  className={classes.taskPrice}
                  price={task.price}
                  paymentMethod={task.paymentMethod}
                  classes={{ method: classes.taskPriceMethod }}
                />
              </Grid>
              <Grid className={classes.hideInDesktop} item xs={12}>
                <Divider className={classes.divider} orientation="horizontal" />
              </Grid>
              <Grid className={classes.hideInDesktop} item xs={12}>
                <div className={classes.offerHeader}>Your Offer</div>
                <div className={classes.mobileOfferData}>
                  <q className={classes.quotes}>{task.offer.message}</q>
                  <PriceTag
                    className={classes.mobileOfferPrice}
                    price={task.offer.price}
                    paymentMethod={task.offer.paymentMethod}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.hideInMobile} item xs={12} sm={4}>
        <Card
          className={`${classes.card} ${classes.offerCard}`}
          onClick={onClick}
        >
          <CardContent
            className={`${classes.cardContent} ${classes.offerCardContent}`}
          >
            <div className={classes.offerHeader}>Your Offer</div>
            <q className={classes.quotes}>{task.offer.message}</q>
            <CenteredDiv className={classes.desktopOfferPrice}>
              <PriceTag
                price={task.offer.price}
                paymentMethod={task.offer.paymentMethod}
              />
            </CenteredDiv>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

WorkerTaskCard.propTypes = {
  task: PropTypes.object,
  onClick: PropTypes.func,
};
