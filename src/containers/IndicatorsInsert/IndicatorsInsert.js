/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import emailjs from "emailjs-com";
import { insertIndicators } from "../../api/indicators";

import "./IndicatorsInsert.css";
import * as CONFIG from "../../configuration.json";
import { MONTHS_LIST } from "../../components/IndicatorsInsertForm/Constants";
import { checkFieldValidity } from "../../components/Helpers/FormHelper";

import DialogCheck from "../../components/IndicatorsInsertForm/DialogCheck";
import CardBody from "../../components/UI/CardBody/CardBody";
import Indicators from "../../components/IndicatorsInsertForm/Indicators";
import { Typography } from "@material-ui/core";
import Text from "../../components/UI/Text/Text";

class IndicatorsInsert extends Component {
  state = {
    indicators: {
      electricityDay: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      electricityNight: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      coldWaterKitchen: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      coldWaterBathroom: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      hotWaterKitchen: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
      hotWaterBathroom: {
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: "",
        touched: false,
      },
    },
    indicatorsValid: false,
    monthYear: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
    sendDataToAccountant: true,
    modalOpen: false,
  };

  updateIndicatorsInState = (key, value) => {
    let validation = checkFieldValidity(
      value,
      this.state.indicators[key].validation
    );
    let newIndicators = {
      ...this.state.indicators,
      [key]: {
        ...this.state.indicators[key],
        value: value,
        valid: validation.isValid,
        errorMessage: validation.errorMessage,
        touched: true,
      },
    };

    let formValid = this.checkFormValidity(newIndicators);

    this.setState({
      indicators: newIndicators,
      indicatorsValid: formValid,
    });
  };

  checkFormValidity = (stateData) => {
    if (typeof stateData !== "undefined") {
      const {
        electricityDay,
        electricityNight,
        coldWaterKitchen,
        coldWaterBathroom,
        hotWaterKitchen,
        hotWaterBathroom,
      } = stateData;

      if (
        electricityDay.valid &&
        electricityNight.valid &&
        coldWaterKitchen.valid &&
        coldWaterBathroom.valid &&
        hotWaterKitchen.valid &&
        hotWaterBathroom.valid
      ) {
        return true;
      }
    }

    if (typeof stateData === "undefined") {
      let newIndicators = {
        ...this.state.indicators,
        electricityDay: {
          ...this.state.indicators.electricityDay,
          touched: true,
          errorMessage: "requiredField",
        },
        electricityNight: {
          ...this.state.indicators.electricityNight,
          touched: true,
          errorMessage: "requiredField",
        },
        coldWaterKitchen: {
          ...this.state.indicators.coldWaterKitchen,
          touched: true,
          errorMessage: "requiredField",
        },
        coldWaterBathroom: {
          ...this.state.indicators.coldWaterBathroom,
          touched: true,
          errorMessage: "requiredField",
        },
        hotWaterKitchen: {
          ...this.state.indicators.hotWaterKitchen,
          touched: true,
          errorMessage: "requiredField",
        },
        hotWaterBathroom: {
          ...this.state.indicators.hotWaterBathroom,
          touched: true,
          errorMessage: "requiredField",
        },
      };
      this.setState({ indicators: newIndicators });
    }

    return false;
  };

  modalHandlerClose = () => {
    this.setState({ modalOpen: false });
  };

  modalHandlerOpen = (event) => {
    event.preventDefault();

    for (let ind in this.state.indicators) {
      const indicators = { ...this.state.indicators };

      if (indicators[ind].value === "" || indicators[ind].value === 0) {
        const updatedIndicators = { ...this.state.indicators };
        updatedIndicators[ind].valid = false;
        this.setState({ indicators: updatedIndicators });
        this.setState({ indicatorsValid: false });
      }
    }

    if (
      this.state.indicators.electricityDay.valid &&
      this.state.indicators.electricityNight.valid &&
      this.state.indicators.coldWaterKitchen.valid &&
      this.state.indicators.coldWaterBathroom.valid &&
      this.state.indicators.hotWaterKitchen.valid &&
      this.state.indicators.hotWaterBathroom.valid
    )
      this.setState({ modalOpen: true });
  };

  sendEmailHandler = () => {
    let templateParams = {
      recipient: this.props.userDetails.accountantEmail,
      address: this.props.userDetails.address,
      month: MONTHS_LIST[this.state.monthYear.month].rusName,
      year: this.state.monthYear.year,
      electricityDay: this.state.indicators.electricityDay.value,
      electricityNight: this.state.indicators.electricityNight.value,
      coldWaterKitchen: this.state.indicators.coldWaterKitchen.value,
      coldWaterBathroom: this.state.indicators.coldWaterBathroom.value,
      hotWaterKitchen: this.state.indicators.hotWaterKitchen.value,
      hotWaterBathroom: this.state.indicators.hotWaterBathroom.value,
    };

    console.log(templateParams);

    emailjs
      .send(
        CONFIG.SERVICE_ID,
        CONFIG.TEMPLATE_ID,
        templateParams,
        CONFIG.USER_ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  sendIndicators = () => {
    let dateOfIndicators = new Date(
      Date.UTC(this.state.monthYear.year, this.state.monthYear.month, 1, 5)
    ).setUTCHours(0, 0, 0, 0);

    const indicatorsData = {
      electricity: {
        day: +this.state.indicators.electricityDay.value,
        night: +this.state.indicators.electricityNight.value,
      },
      coldWater: {
        kitchen: +this.state.indicators.coldWaterKitchen.value,
        bathroom: +this.state.indicators.coldWaterBathroom.value,
      },
      hotWater: {
        kitchen: +this.state.indicators.hotWaterKitchen.value,
        bathroom: +this.state.indicators.hotWaterBathroom.value,
      },
      currentDate: {
        today: new Date(dateOfIndicators).toUTCString(),
        year: this.state.monthYear.year,
      },
      userId: localStorage.getItem("userId"),
    };
    const token = localStorage.getItem("token");

    insertIndicators(token, indicatorsData)
      .then((response) => {
        console.log("insertIndicators", response);
        this.setState({ modalOpen: false });
        if (this.state.sendDataToAccountant) this.sendEmailHandler();
        this.props.history.push("/outlay");
      })
      .catch((error) => {
        console.log("[ERROR] insertIndicators", error);
      });
  };

  getCurrentMonth = () => {
    const currentMonth = new Date().getMonth();
    return currentMonth;
  };

  getCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    let currentYearList = [];
    for (let i = 2; i >= 0; i--) {
      currentYearList.push({
        text: currentYear - i,
        value: currentYear - i,
      });
    }
    return currentYearList;
  };

  setStateMonthYear = (key, value) => {
    const updatedMonthYear = {
      ...this.state.monthYear,
      [key]: value,
    };
    this.setState({ monthYear: updatedMonthYear });
  };

  switchChange = () => {
    this.setState({ sendDataToAccountant: !this.state.sendDataToAccountant });
  };

  render() {
    return (
      <div>
        <DialogCheck
          indicators={this.state.indicators}
          monthYear={this.state.monthYear}
          modalOpen={this.state.modalOpen}
          sendDataToAccountant={this.state.sendDataToAccountant}
          switchChange={this.switchChange}
          modalHandlerClose={this.modalHandlerClose}
          sendIndicators={this.sendIndicators}
        />

        <Typography variant="h4" align="center">
          <Text tid="sendIndicators" />
        </Typography>

        <CardBody>
          <Indicators
            indicators={this.state.indicators}
            monthYear={this.state.monthYear}
            indicatorsValid={this.state.indicatorsValid}
            setStateMonthYear={this.setStateMonthYear}
            getCurrentYear={this.getCurrentYear}
            updateIndicatorsInState={this.updateIndicatorsInState}
            modalHandlerOpen={this.modalHandlerOpen}
            checkFormValidity={this.checkFormValidity}
          />
        </CardBody>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};

export default withRouter(connect(mapStateToProps)(IndicatorsInsert));
