import React from 'react';
import * as PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: '100px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectDropDown({
  disabled,
  selected,
  label,
  selection,
  onSelect,
  className,
  fullWidth,
  inputClassName,
}) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      variant="outlined"
      className={`${className} ${classes.formControl}`}
      fullWidth={fullWidth}
    >
      <InputLabel ref={inputLabel}>{label}</InputLabel>
      <Select
        disabled={disabled}
        value={selected ? selected.value : ''}
        onChange={event =>
          onSelect(selection.find(s => s.value === event.target.value))
        }
        input={
          <OutlinedInput
            classes={{ input: inputClassName }}
            labelWidth={labelWidth}
            name={label}
            id="outlined-age-simple"
          />
        }
      >
        {/* <MenuItem value=""> */}
        {/*  <em>None</em> */}
        {/* </MenuItem> */}
        {selection.map(s => (
          <MenuItem key={s.value} value={s.value}>
            {s.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectDropDown.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  fullWidth: PropTypes.bool,
};
