import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import IconWithNumber from 'components/molecules/IconWithNumber';
import Avatar from 'components/molecules/Avatar';
import CenteredDiv from 'components/atoms/CenteredDiv';
import FullName from 'components/molecules/FullName';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import { makeStyles } from '@material-ui/core';
import RatingStars from 'components/molecules/RatingStars';
import NumberedTags from 'components/molecules/NumberedTags';
import EventIcon from '@material-ui/icons/Event';
import { formatProfileCreatedAtDate } from 'utils/date-time-helpers';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { arrayToCsv } from 'utils/object';
import * as langs from 'utils/languages.json';
import RoleSwitch from 'components/molecules/RoleSwitch';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CenterDiv = styled(CenteredDiv)`
  flex-grow: ${props => props.grow};
`;

const ProfileName = styled(FullName)`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px 0 0 0;
`;

const imgStyle = {
  width: '120px',
  height: '120px',
  objectFit: 'cover',
  border: '2px solid rgba(228, 222, 153, 0.54)',
};

const useStyles = makeStyles(theme => ({
  centered: {
    textAlign: 'center',
    margin: '0 3%',
  },
  metricIcon: {
    fontSize: '1.2rem',
  },
  about: {
    marginTop: theme.spacing(1.5),
    fontSize: '0.9rem',
    color: 'grey',
  },
  createdAtText: {
    color: 'grey',
    fontSize: '0.8rem',
  },
  editButton: {
    margin: theme.spacing(1, 0, -1, 0),
    padding: theme.spacing(1, 2),
    fontSize: '0.8rem',
  },
  editIcon: {
    marginRight: theme.spacing(0.7),
    fontSize: '1rem',
  },
  joinedIcon: {
    marginRight: theme.spacing(0.7),
    fontSize: '1rem',
  },
  header: {
    marginBottom: theme.spacing(-2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  tags: {
    marginTop: theme.spacing(1.5),
    fontSize: '0.8rem',
  },
  languages: {
    marginTop: theme.spacing(1.5),
    fontSize: '0.8rem',
    color: 'grey',
    fontStyle: 'italic',
  },
}));

const getLikesStyle = likes => ({ visibility: likes ? 'visible' : 'hidden' });

function ProfileHeader({
  imgSrc,
  isApproved,
  firstName,
  lastName,
  rating,
  tags,
  languages,
  about,
  role,
  createdAt,
  className,
  online,
  lastSeen,
  children,
  onClick,
  onEdit,
  onRoleSwitch,
}) {
  const classes = useStyles();

  return (
    <Container className={className} onClick={onClick}>
      <div className={classes.header}>
        {createdAt ? (
          <div className={classes.createdAtText}>
            <EventIcon className={classes.joinedIcon} />
            {formatProfileCreatedAtDate(createdAt)}
          </div>
        ) : null}
        {onEdit || (onRoleSwitch && role) ? (
          <div>
            {onRoleSwitch ? (
              <RoleSwitch onUpdate={onRoleSwitch} role={role} />
            ) : null}
          </div>
        ) : null}
      </div>
      <TopContainer>
        <CenterDiv grow="1" style={getLikesStyle(rating.likes)}>
          <IconWithNumber
            className={classes.metricIcon}
            iconColor="green"
            Icon={ThumbUpAltOutlinedIcon}
            metric={rating.likes}
          />
        </CenterDiv>
        <CenterDiv grow="2">
          <Avatar
            imgStyle={imgStyle}
            imgSrc={imgSrc}
            isApproved={isApproved}
            isWorker={role === 'WORKER'}
            isOwner={role === 'OWNER'}
          />
        </CenterDiv>
        <CenterDiv grow="1" style={getLikesStyle(rating.dislikes)}>
          <IconWithNumber
            className={classes.metricIcon}
            iconColor="red"
            Icon={ThumbDownOutlinedIcon}
            metric={rating.dislikes}
          />
        </CenterDiv>
      </TopContainer>
      <CenterDiv className={classes.centered}>
        {onEdit ? (
          <Button
            flex={2}
            color="primary"
            className={classes.editButton}
            onClick={onEdit}
          >
            <EditIcon className={classes.editIcon} />
            Edit
          </Button>
        ) : null}
        <ProfileName user={{ firstName, lastName }} />
        <RatingStars
          fontSize="20px"
          value={rating.value / rating.count}
          className={classes.rating}
          count={rating.count}
        />
        {about ? <div className={classes.about}>{about}</div> : null}
        {tags && tags.length ? (
          <NumberedTags className={classes.tags} tags={tags} />
        ) : null}
        {languages && languages.length ? (
          <div className={classes.languages}>
            {arrayToCsv(
              languages.map(l => langs.default[l.toLowerCase()].name),
            )}
          </div>
        ) : null}
      </CenterDiv>
      {children}
    </Container>
  );
}

ProfileHeader.propTypes = {
  className: PropTypes.string,
  imgSrc: PropTypes.string,
  isApproved: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  role: PropTypes.string,
  tags: PropTypes.array,
  languages: PropTypes.array,
  about: PropTypes.string,
  createdAt: PropTypes.number,
  online: PropTypes.bool,
  lastSeen: PropTypes.instanceOf(Date),
  rating: PropTypes.object,
  children: PropTypes.any,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onRoleSwitch: PropTypes.func,
};

export default ProfileHeader;
