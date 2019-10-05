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
import Tag from 'components/atoms/Tag';
import * as langs from 'utils/languages.json';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 2),
  },
  about: {
    fontStyle: 'italic',
  },
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
  const langsTags = languages.map(l => (
    <Tag key={l}>{langs.default[l.toLowerCase()].name}</Tag>
  ));

  return (
    <Grid
      className={`${className} ${classes.container}`}
      style={{ display: visible ? 'flex' : 'none' }}
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <Section
          Icon={InfoOutlinedIcon}
          className={classes.about}
          title="About"
          valid={!!about}
        >
          {about}
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Section
          Icon={TranslateIcon}
          title="Languages"
          valid={!!languages.length}
        >
          {langsTags}
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Section Icon={LabelOutlinedIcon} title="Tags" valid={!!tags.length}>
          <NumberedTags tags={tags} />
        </Section>
      </Grid>
      <Grid item xs={12}>
        <Section Icon={EventIcon} title="Joined">
          <div className={classes.text}>
            {formatProfileCreatedAtDate(createdAt)}
          </div>
        </Section>
      </Grid>
    </Grid>
  );
}

DetailsTab.propTypes = {
  createdAt: PropTypes.number,
  languages: PropTypes.array,
  about: PropTypes.string,
  tags: PropTypes.array,
  className: PropTypes.string,
  visible: PropTypes.bool,
};
