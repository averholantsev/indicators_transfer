import React from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@material-ui/core";
import CardBody from "../UI/CardBody/CardBody";
import Text from "../UI/Text/Text";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiStepper-root": {
      padding: "24px 0 0 0",
    },
  },
  stepLabel: {
    wordBreak: "break-word",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    <Text tid="regEnterUserDetails" />,
    <Text tid="regEnterPrevIndicators" />,
    <Text tid="regValidateData" />,
  ];
}

const RegistrationStepper = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === 0) {
      if (props.userDetailsValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else props.checkFormValidity("userDetails");
    }
    if (activeStep === 1) {
      if (props.prevIndicatorsValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else props.checkFormValidity("prevIndicators");
    }
    if (activeStep === 2) {
      props.registration();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <StepOne
            userDetails={props.userDetails}
            updateUserDataInState={props.updateUserDataInState}
            isDisabled={false}
          />
        );
      case 1:
        return (
          <StepTwo
            prevIndicators={props.prevIndicators}
            updatePrevIndicatorsInState={props.updatePrevIndicatorsInState}
            isDisabled={false}
          />
        );
      case 2:
        return (
          <div>
            <Typography
              variant="h5"
              align="center"
              style={{ padding: "0 0 20px 0" }}
            >
              <Text tid="regUserDetails" />
            </Typography>
            <StepOne
              userDetails={props.userDetails}
              updateUserDataInState={props.updateUserDataInState}
              isDisabled={true}
            />
            <Typography
              variant="h5"
              align="center"
              style={{ padding: "20px 0" }}
            >
              <Text tid="regPrevIndicators" />
            </Typography>
            <StepTwo
              prevIndicators={props.prevIndicators}
              updatePrevIndicatorsInState={props.updatePrevIndicatorsInState}
              isDisabled={true}
            />
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel classes={{ root: classes.stepLabel }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} style={{marginTop: "30px"}}>
              <Text tid="regSuccess" />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to="/auth"
            >
              <Text tid="authSignIn" />
            </Button>
          </div>
        ) : (
          <div>
            <CardBody>
              {getStepContent(
                activeStep,
                props.updateUserDataInState,
                props.updatePrevIndicatorsInState,
                props.userDetails,
                props.prevIndicators
              )}
            </CardBody>
            <div style={{ marginBottom: "20px" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                <Text tid="prev" />
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? <Text tid="finish" /> : <Text tid="next" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationStepper;
