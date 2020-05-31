import React, { Component } from "react";
import axios from "../../axios-main";

import UserCard from "../../components/UserCard/UserCard";
import Loader from "../../components/UI/Loader/Loader";
import Typography from "@material-ui/core/Typography";
import CardBody from "../../components/UI/CardBody/CardBody";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";

import { withSnackbar } from "notistack";

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
          isDate: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      electricityDay: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      electricityNight: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      kitchenColdWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      kitchenHotWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      bathroomColdWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
      bathroomHotWater: {
        value: "",
        validation: {
          isNumber: true,
        },
        valid: true,
        errorMessage: "",
        touched: true,
      },
    },
    prevIndicatorsValid: false,
    userId: null,
  };

  componentDidMount() {
    this.getUserDetails(localStorage.getItem("userId"));
  }

  getUserDetails = (userId) => {
    console.log("Получение данных по UserId: ", userId);
    const token = localStorage.getItem("token");
    axios
      .get(`/users.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        let dataFromDB = response.data[Object.keys(response.data)];
        let newUserDetails = {
          ...this.state.userDetails,
          firstName: {
            ...this.state.userDetails.firstName,
            value: dataFromDB.userDetails.firstName,
          },
          lastName: {
            ...this.state.userDetails.lastName,
            value: dataFromDB.userDetails.lastName,
          },
          userEmail: {
            ...this.state.userDetails.userEmail,
            value: dataFromDB.userDetails.userEmail,
          },
          accountantEmail: {
            ...this.state.userDetails.accountantEmail,
            value: dataFromDB.userDetails.accountantEmail,
          },
          address: {
            ...this.state.userDetails.address,
            value: dataFromDB.userDetails.address,
          },
        };
        let prevIndicators = {
          ...this.state.prevIndicators,
          prevIndicatorsDate: {
            ...this.state.prevIndicators.prevIndicatorsDate,
            value: dataFromDB.prevIndicators.prevIndicatorsDate,
          },
          electricityDay: {
            ...this.state.prevIndicators.electricityDay,
            value: dataFromDB.prevIndicators.electricity.day,
          },
          electricityNight: {
            ...this.state.prevIndicators.electricityNight,
            value: dataFromDB.prevIndicators.electricity.night,
          },
          kitchenColdWater: {
            ...this.state.prevIndicators.kitchenColdWater,
            value: dataFromDB.prevIndicators.kitchen.coldWater,
          },
          kitchenHotWater: {
            ...this.state.prevIndicators.kitchenHotWater,
            value: dataFromDB.prevIndicators.kitchen.hotWater,
          },
          bathroomColdWater: {
            ...this.state.prevIndicators.bathroomColdWater,
            value: dataFromDB.prevIndicators.bathroom.coldWater,
          },
          bathroomHotWater: {
            ...this.state.prevIndicators.bathroomHotWater,
            value: dataFromDB.prevIndicators.bathroom.hotWater,
          },
        };

        this.setState({
          userDetails: newUserDetails,
          prevIndicators: prevIndicators,
          id: Object.keys(response.data)[0]
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Произошла ошибка, обратитесь к Системному Администратору.",
        });
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
      userId: localStorage.getItem("userId"),
    };

    axios
      .patch(`/users/${this.state.id}.json?auth=${token}`, userFormData)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        this.props.enqueueSnackbar("Данные успешно сохранены!", {
          variant: "success",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
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
          Профиль пользователя
        </Typography>
        {this.state.userDetails === null ? (
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

export default withSnackbar(UsersProfile);
