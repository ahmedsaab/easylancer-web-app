import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { countries } from 'containers/CreateTaskModal/constants';
import SelectDropDown from 'components/molecules/SelectDropDown';
import PlacesAutoComplete from 'components/organisms/PlacesAutoComplete';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    width: '100%',
  },
  row: {
    display: 'flex',
  },
}));

export function LocationSection({
  country,
  address,
  geo,
  city,
  onUpdateCountry,
  onUpdateLocation,
  onUpdateAddress,
}) {
  const classes = useStyles();
  const [dirty, setDirty] = useState({
    address: false,
  });

  return (
    <div>
      {onUpdateCountry ? (
        <div className={classes.row}>
          <SelectDropDown
            onSelect={onUpdateCountry}
            label="Country"
            selected={country}
            selection={countries}
            className={classes.field}
          />
        </div>
      ) : null}
      <div className={classes.row}>
        {country ? (
          <PlacesAutoComplete
            onSelect={onUpdateLocation}
            onChange={addr => {
              setDirty({ ...dirty, address: true });
              onUpdateAddress(addr);
            }}
            onError={err => console.error(err)}
            text={address}
            type="address"
            label="Address"
            error={(!geo || !city || !country) && dirty.address}
            countryISOCode={country.value}
            className={classes.field}
          />
        ) : null}
      </div>
    </div>
  );
}

LocationSection.propTypes = {
  country: PropTypes.object,
  geo: PropTypes.object,
  address: PropTypes.string,
  city: PropTypes.string,
  onUpdateCountry: PropTypes.func,
  onUpdateLocation: PropTypes.func,
  onUpdateAddress: PropTypes.func,
};
