import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '25px',
  },
  content: {
    paddingTop: theme.spacing(2),
  },
}));

const useLabelStyles = makeStyles({
  label: {
    fontSize: '1rem',
  },
});

const useStepperStyles = makeStyles({
  root: {
    padding: 0,
  },
});

export default function VerticalLinearStepper({ contents, activeStep }) {
  const classes = useStyles();
  const labelClasses = useLabelStyles();
  const stepperClasses = useStepperStyles();
  const steps = contents.map(content => content.title);

  return (
    <div className={classes.root}>
      <Stepper
        classes={stepperClasses}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel classes={labelClasses}>{label}</StepLabel>
            <StepContent className={classes.content}>
              {contents[index].component}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

VerticalLinearStepper.propTypes = {
  contents: PropTypes.array,
  activeStep: PropTypes.number,
};
