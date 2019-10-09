import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { Panel } from 'containers/SettingsPage/PersonalSettings/Panel';
import { LocationSection } from 'components/organisms/LocationSection';
import { countries } from 'containers/CreateTaskModal/constants';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3),
    flex: 1,
  },
  input: {
    padding: '14px',
  },
}));

export function LocationPanel({
  settings,
  form,
  isLoading,
  onUpdateField,
  onSave,
}) {
  const classes = useStyles();
  const initAddress = form.location.city ? form.location.city : '';
  const initCountry = form.location.country
    ? countries.find(c => c.text === form.location.country)
    : '';
  const [text, setText] = useState(initAddress);
  const [city, setCity] = useState(initAddress);
  const [country, setCountry] = useState(initCountry);

  function onUpdateLocation(location) {
    onUpdateField('location', {
      country: location.country.long_name,
      city: location.city.long_name,
    });
    setCity(location.city.long_name);
    setText(location.city.long_name);
  }

  return (
    <Panel
      isLoading={isLoading}
      onSave={onSave}
      settings={settings}
      form={form}
      isInvalid={!(form.location.city && form.location.country)}
    >
      <LocationSection
        className={classes.field}
        country={country}
        address={text}
        label="City"
        type="city"
        city={city}
        onUpdateCountry={c => {
          setCountry(c);
          setCity(null);
          setText('');
        }}
        onUpdateAddress={t => {
          setText(t);
          setCity(null);
          onUpdateField('location', {
            country: null,
            city: null,
          });
        }}
        onUpdateLocation={onUpdateLocation}
      />
    </Panel>
  );
}

LocationPanel.propTypes = {
  form: PropTypes.object,
  settings: PropTypes.object,
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
  onUpdateField: PropTypes.func,
};
