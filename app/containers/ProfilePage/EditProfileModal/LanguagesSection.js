import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import SearchableTags from 'components/molecules/SearchableTags';
import * as langs from 'utils/languages.json';

const suggestions = Object.entries(langs.default).map(([key, value]) => ({
  label: value.name,
  value: key,
}));

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(-1, 1, 1, 1),
    flex: 1,
  },
  row: {
    display: 'flex',
  },
}));

export function LanguagesSection({ languages, onChange }) {
  const classes = useStyles();
  const tags = languages
    .map(l => l.toLowerCase())
    .map(l => suggestions.find(s => s.value === l));

  return (
    <div className={classes.row}>
      <SearchableTags
        onChange={onChange}
        suggestions={suggestions}
        tags={tags}
        placeHolder="English, Arabic, etc"
      />
    </div>
  );
}

LanguagesSection.propTypes = {
  languages: PropTypes.array,
  onChange: PropTypes.func,
};
