import React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
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

export default function VerticalLinearStepper({
  contents,
  disabled,
  FinishButton,
}) {
  const classes = useStyles();
  const labelClasses = useLabelStyles();
  const stepperClasses = useStepperStyles();
  const [activeStep, setActiveStep] = React.useState(4);
  const steps = contents.map(content => content.title);

  function handleNext() {
    setActiveStep(prevActiveStep => {
      const { sideEffectOnNext } = contents[prevActiveStep];

      if (sideEffectOnNext) {
        sideEffectOnNext();
      }

      return prevActiveStep + 1;
    });
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

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
              <div className={classes.actionsContainer}>
                <div>
                  {activeStep !== 0 ? (
                    <Button
                      disabled={disabled}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                  ) : null}
                  {activeStep < steps.length - 1 ? (
                    <Button
                      disabled={contents[index].disabled}
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  ) : (
                    <FinishButton />
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

VerticalLinearStepper.propTypes = {
  contents: PropTypes.array,
  FinishButton: PropTypes.func,
  disabled: PropTypes.bool,
};
