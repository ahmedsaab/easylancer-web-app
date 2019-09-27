import * as PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { formatProfileCreatedAtDate } from 'utils/date-time-helpers';
import Section from 'components/molecules/Section';
import NumberedTags from 'components/molecules/NumberedTags';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TranslateIcon from '@material-ui/icons/Translate';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles(theme => ({
  section: {},
  text: {
    color: 'grey',
    fontSize: '0.8rem',
  },
}));

export function DetailsTab({
  createdAt,
  languages,
  about,
  tags,
  className,
  visible = true,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      className={className}
      spacing={2}
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <Grid item xs={12}>
        <Section
          Icon={InfoOutlinedIcon}
          className={classes.section}
          title="About"
          valid={about}
        >
          {about}
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Section
          Icon={TranslateIcon}
          className={classes.section}
          title="Languages"
          valid={languages.length}
        >
          {JSON.stringify(languages)}
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Section
          Icon={LabelOutlinedIcon}
          className={classes.section}
          title="Tags"
          valid={tags.length}
        >
          <NumberedTags tags={tags} />
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Section Icon={EventIcon} className={classes.section} title="Joined">
          <div className={classes.text}>
            {formatProfileCreatedAtDate(createdAt)}
          </div>
        </Section>
      </Grid>
    </Grid>
  );
}

DetailsTab.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  languages: PropTypes.array,
  about: PropTypes.string,
  tags: PropTypes.array,
  className: PropTypes.string,
  visible: PropTypes.bool,
};
