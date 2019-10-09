import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as PropTypes from 'prop-types';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels({
  panels,
  expanded,
  setExpanded,
}) {
  const classes = useStyles();
  const handleChange = panelKey => (event, isExpanded) => {
    setExpanded(isExpanded ? panelKey : false);
  };

  return (
    <div className={classes.root}>
      {panels.map(panel => (
        <ExpansionPanel
          className={classes.panel}
          key={panel.key}
          expanded={expanded === panel.key}
          onChange={handleChange(panel.key)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.heading}>
              {panel.primaryTitle}
            </div>
            {panel.secondaryTitle ? (
              <div className={classes.secondaryHeading}>
                {panel.secondaryTitle}
              </div>
            ) : null}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {expanded === panel.key ? panel.content : ''}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}

ControlledExpansionPanels.propTypes = {
  panels: PropTypes.array,
  expanded: PropTypes.any,
  setExpanded: PropTypes.func,
};
