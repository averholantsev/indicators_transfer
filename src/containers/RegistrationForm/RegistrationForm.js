import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { NavLink } from "react-router-dom";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import RegistrationStepper from "../../components/Registration/RegistrationStepper";
import Alert from "@material-ui/lab/Alert";
import LanguageSelector from "../../components/Languages/LanguageSelector";
import Text from "../../components/UI/Text/Text";

class RegistrationForm extends Component {
  state = {
    userDetails: {
      firstName: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      lastName: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      userEmail: {
        value: "",
        validation: {
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        value: "",
        validation: {
          isPassord: true,
        },
        valid: false,
        touched: false,
      },
      accountantEmail: {
        value: "",
        validation: {
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    userDetailsValid: false,
    prevIndicators: {
      prevIndicatorsDate: {
        value: null,
        validation: {
          isDate: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      electricityDay: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      electricityNight: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      kitchenColdWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      kitchenHotWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      bathroomColdWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      bathroomHotWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
    },
    prevIndicatorsValid: false,
  };

  registration = () => {
    const userFormData = {
      userDetails: {
        firstName: this.state.userDetails.firstName.value,
        lastName: this.state.userDetails.lastName.value,
        userEmail: this.state.userDetails.userEmail.value,
        accountantEmail: this.state.userDetails.accountantEmail.value,
        address: this.state.userDetails.address.value,
      },
      prevIndicators: {
        prevIndicatorsDate: this.state.prevIndicators.prevIndicatorsDate.value,
        electricity: {
          day: this.state.prevIndicators.electricityDay.value,
          night: this.state.prevIndicators.electricityNight.value,
        },
        kitchen: {
          coldWater: this.state.prevIndicators.kitchenColdWater.value,
          hotWater: this.state.prevIndicators.kitchenHotWater.value,
        },
        bathroom: {
          coldWater: this.state.prevIndicators.bathroomColdWater.value,
          hotWater: this.state.prevIndicators.bathroomHotWater.value,
        },
      },
    };

    this.props.onRegistration(
      this.state.userDetails.userEmail.value,
      this.state.userDetails.password.value,
      userFormData
    );
  };

  updateUserDataInState = (key, value) => {
    let validation = checkFieldValidity(
      value,
      this.state.userDetails[key].validation
    );
    let newUserDetails = {
      ...this.state.userDetails,
      [key]: {
        ...this.state.userDetails[key],
        value: value,
        valid: validation.isValid,
        errorMessage: validation.errorMessage,
        touched: true,
      },
    };

    let formValid = this.checkFormValidity("userDetails", newUserDetails);

    this.setState({ userDetails: newUserDetails, userDetailsValid: formValid });
  };

  updatePrevIndicatorsInState = (key, value) => {
    let validation = checkFieldValidity(
      value,
      this.state.prevIndicators[key].validation
    );
    let newPrevIndicators = {
      ...this.state.prevIndicators,
      [key]: {
        ...this.state.prevIndicators[key],
        value: value,
        valid: validation.isValid,
        errorMessage: validation.errorMessage,
        touched: true,
      },
    };

    let formValid = this.checkFormValidity("prevIndicators", newPrevIndicators);

    this.setState({
      prevIndicators: newPrevIndicators,
      prevIndicatorsValid: formValid,
    });
  };

  checkFormValidity = (formId, stateData) => {
    if (formId === "userDetails" && typeof stateData !== "undefined") {
      const {
        firstName,
        lastName,
        userEmail,
        password,
        accountantEmail,
        address,
      } = stateData;
      if (
        firstName.valid &&
        lastName.valid &&
        userEmail.valid &&
        password.valid &&
        accountantEmail.valid &&
        address.valid
      ) {
        return true;
      }
    }

    if (formId === "userDetails" && typeof stateData === "undefined") {
      let newUserDetails = {
        ...this.state.userDetails,
        firstName: {
          ...this.state.userDetails.firstName,
          touched: true,
          errorMessage: "requiredField",
        },
        lastName: {
          ...this.state.userDetails.lastName,
          touched: true,
          errorMessage: "requiredField",
        },
        userEmail: {
          ...this.state.userDetails.userEmail,
          touched: true,
          errorMessage: "requiredField",
        },
        password: {
          ...this.state.userDetails.password,
          touched: true,
          errorMessage: "requiredField",
        },
        accountantEmail: {
          ...this.state.userDetails.accountantEmail,
          touched: true,
          errorMessage: "requiredField",
        },
        address: {
          ...this.state.userDetails.address,
          touched: true,
          errorMessage: "requiredField",
        },
      };
      this.setState({ userDetails: newUserDetails });
    }

    if (formId === "prevIndicators" && typeof stateData !== "undefined") {
      const {
        prevIndicatorsDate,
        electricityDay,
        electricityNight,
        kitchenColdWater,
        kitchenHotWater,
        bathroomColdWater,
        bathroomHotWater,
      } = stateData;
      if (
        prevIndicatorsDate.valid &&
        electricityDay.valid &&
        electricityNight.valid &&
        kitchenColdWater.valid &&
        kitchenHotWater.valid &&
        bathroomColdWater.valid &&
        bathroomHotWater.valid
      ) {
        return true;
      }
    }

    if (formId === "prevIndicators" && typeof stateData === "undefined") {
      let newPrevIndicators = {
        ...this.state.prevIndicators,
        prevIndicatorsDate: {
          ...this.state.prevIndicators.prevIndicatorsDate,
          touched: true,
          errorMessage: "requiredField",
        },
        electricityDay: {
          ...this.state.prevIndicators.electricityDay,
          touched: true,
          errorMessage: "requiredField",
        },
        electricityNight: {
          ...this.state.prevIndicators.electricityNight,
          touched: true,
          errorMessage: "requiredField",
        },
        kitchenColdWater: {
          ...this.state.prevIndicators.kitchenColdWater,
          touched: true,
          errorMessage: "requiredField",
        },
        kitchenHotWater: {
          ...this.state.prevIndicators.kitchenHotWater,
          touched: true,
          errorMessage: "requiredField",
        },
        bathroomColdWater: {
          ...this.state.prevIndicators.bathroomColdWater,
          touched: true,
          errorMessage: "requiredField",
        },
        bathroomHotWater: {
          ...this.state.prevIndicators.bathroomHotWater,
          touched: true,
          errorMessage: "requiredField",
        },
      };
      this.setState({ prevIndicators: newPrevIndicators });
    }

    return false;
  };

  render() {
    if (this.props.errorMessage) window.scrollTo(0, 0);

    return (
      <div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "20px",
            right: "20px",
            alignItems: "center",
          }}
        >
          <LanguageSelector theme="dark" />
          <Typography>
            <Link
              component={NavLink}
              to="/auth"
              variant="body2"
              style={{ fontSize: "14px" }}
            >
              <Text tid="authSignInShort" />
            </Link>
          </Typography>
        </div>
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          <Text tid="registration" />
        </Typography>
        {this.props.errorMessage ? (
          <Alert severity="error">
            <Text tid={this.props.errorMessage} />
          </Alert>
        ) : null}
        <RegistrationStepper
          userDetails={this.state.userDetails}
          userDetailsValid={this.state.userDetailsValid}
          prevIndicators={this.state.prevIndicators}
          prevIndicatorsValid={this.state.prevIndicatorsValid}
          updateUserDataInState={this.updateUserDataInState}
          updatePrevIndicatorsInState={this.updatePrevIndicatorsInState}
          checkFormValidity={this.checkFormValidity}
          registration={this.registration}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegistration: (email, password, userDetails) =>
      dispatch(actions.registration(email, password, userDetails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
