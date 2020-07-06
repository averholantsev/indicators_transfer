import React, { Component } from "react";
import { connect } from "react-redux";

import { withSnackbar } from "notistack";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";
import { updateUser } from "../../api/users";
import UserCard from "../../components/UserCard/UserCard";
import Loader from "../../components/UI/Loader/Loader";
import CardBody from "../../components/UI/CardBody/CardBody";
import Text from "../../components/UI/Text/Text";
import Typography from "@material-ui/core/Typography";

class UsersProfile extends Component {
  state = {
    userDetails: {
      firstName: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      lastName: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      userEmail: {
        value: "",
      },
      accountantEmail: {
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      address: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
    },
    userDetailsValid: false,
    prevIndicators: {
      prevIndicatorsDate: {
        value: null,
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      electricityDay: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      electricityNight: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      kitchenColdWater: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      kitchenHotWater: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      bathroomColdWater: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      bathroomHotWater: {
        value: "",
        validation: {
          required: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
    },
    prevIndicatorsValid: false,
  };

  componentDidMount() {
    if (this.props.userDetails) {
      this.updateState(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.userDetails !== newProps.userDetails) {
      this.updateState(newProps);
    }
  }

  updateState = (newProps) => {
    let newUserDetails = {
      ...this.state.userDetails,
      firstName: {
        ...this.state.userDetails.firstName,
        value: newProps.userDetails.firstName,
      },
      lastName: {
        ...this.state.userDetails.lastName,
        value: newProps.userDetails.lastName,
      },
      userEmail: {
        ...this.state.userDetails.userEmail,
        value: newProps.userDetails.userEmail,
      },
      accountantEmail: {
        ...this.state.userDetails.accountantEmail,
        value: newProps.userDetails.accountantEmail,
      },
      address: {
        ...this.state.userDetails.address,
        value: newProps.userDetails.address,
      },
    };
    let prevIndicators = {
      ...this.state.prevIndicators,
      prevIndicatorsDate: {
        ...this.state.prevIndicators.prevIndicatorsDate,
        value: newProps.prevIndicators.prevIndicatorsDate,
      },
      electricityDay: {
        ...this.state.prevIndicators.electricityDay,
        value: newProps.prevIndicators.electricity.day,
      },
      electricityNight: {
        ...this.state.prevIndicators.electricityNight,
        value: newProps.prevIndicators.electricity.night,
      },
      kitchenColdWater: {
        ...this.state.prevIndicators.kitchenColdWater,
        value: newProps.prevIndicators.kitchen.coldWater,
      },
      kitchenHotWater: {
        ...this.state.prevIndicators.kitchenHotWater,
        value: newProps.prevIndicators.kitchen.hotWater,
      },
      bathroomColdWater: {
        ...this.state.prevIndicators.bathroomColdWater,
        value: newProps.prevIndicators.bathroom.coldWater,
      },
      bathroomHotWater: {
        ...this.state.prevIndicators.bathroomHotWater,
        value: newProps.prevIndicators.bathroom.hotWater,
      },
    };

    this.setState({
      userDetails: newUserDetails,
      prevIndicators: prevIndicators,
    });
  };

  updateUserDetails = () => {
    console.log("Обновление записи по Id: ", this.state.id);
    const token = localStorage.getItem("token");
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
          day: +this.state.prevIndicators.electricityDay.value,
          night: +this.state.prevIndicators.electricityNight.value,
        },
        kitchen: {
          coldWater: +this.state.prevIndicators.kitchenColdWater.value,
          hotWater: +this.state.prevIndicators.kitchenHotWater.value,
        },
        bathroom: {
          coldWater: +this.state.prevIndicators.bathroomColdWater.value,
          hotWater: +this.state.prevIndicators.bathroomHotWater.value,
        },
      },
      userId: localStorage.getItem("userId"),
    };

    updateUser(this.state.id, token, userFormData)
      .then((response) => {
        console.log("updateUser", response.data);
        this.props.enqueueSnackbar(<Text tid="saveData" />, {
          variant: "success",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("[ERROR] updateUser", error);
      });
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

    let formValid = this.checkFormValidity();

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

    let formValid = this.checkFormValidity();

    this.setState({
      prevIndicators: newPrevIndicators,
      prevIndicatorsValid: formValid,
    });
  };

  checkFormValidity = () => {
    const {
      firstName,
      lastName,
      accountantEmail,
      address,
    } = this.state.userDetails;

    const {
      prevIndicatorsDate,
      electricityDay,
      electricityNight,
      kitchenColdWater,
      kitchenHotWater,
      bathroomColdWater,
      bathroomHotWater,
    } = this.state.prevIndicators;

    if (
      firstName.valid &&
      lastName.valid &&
      accountantEmail.valid &&
      address.valid &&
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

    return false;
  };

  render() {
    return (
      <div>
        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          <Text tid="userProfile" />
        </Typography>
        {this.props.userIdDb === null ? (
          <Loader />
        ) : (
          <CardBody>
            <UserCard
              userDetails={this.state.userDetails}
              prevIndicators={this.state.prevIndicators}
              updateUserDataInState={this.updateUserDataInState}
              updatePrevIndicatorsInState={this.updatePrevIndicatorsInState}
              checkFormValidity={this.checkFormValidity}
              updateUserDetails={this.updateUserDetails}
            />
          </CardBody>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    prevIndicators: state.prevIndicators,
    userIdDb: state.userIdDb,
  };
};

export default connect(mapStateToProps)(withSnackbar(UsersProfile));
