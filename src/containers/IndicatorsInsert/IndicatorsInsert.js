/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../axios-main";
import emailjs from "emailjs-com";
import CONFIG from "../../configuration.json";
import { MONTHS_LIST } from "../../components/IndicatorsInsertForm/Constants";

import InputNum from "../../components/UI/Inputs/InputNum";
import { Dropdown } from "semantic-ui-react";
import "./IndicatorsInsert.css";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import ButtonUI from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class IndicatorsInsert extends Component {
  state = {
    indicators: {
      ElectricityDay: { value: "", valid: true },
      ElectricityNight: { value: "", valid: true },
      ColdWaterKittchen: { value: "", valid: true },
      ColdWaterBathroom: { value: "", valid: true },
      HotWaterKittchen: { value: "", valid: true },
      HotWaterBathroom: { value: "", valid: true },
    },
    monthYear: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
    emailData: {
      recipient: CONFIG.RECIPIENT,
      address: CONFIG.ADDRESS,
    },
    modalOpen: false,
  };

  addIndicatorHandler = (type, event) => {
    //Обновляем показатель
    const updatedCount = event.target.value;
    const updatedIndicators = { ...this.state.indicators };
    updatedIndicators[type].value = updatedCount;
    updatedIndicators[type].valid = true;

    //Обновляем state
    this.setState({ indicators: updatedIndicators });
  };

  modalHandlerClose = () => {
    this.setState({ modalOpen: false });
  };

  modalHandlerOpen = (event) => {
    event.preventDefault();

    for (let ind in this.state.indicators) {
      const indicators = { ...this.state.indicators };

      if (indicators[ind].value === "") {
        const updatedIndicators = { ...this.state.indicators };
        updatedIndicators[ind].valid = false;
        this.setState({ indicators: updatedIndicators });
        this.setState({ indicatorsValid: false });
      }
    }

    if (
      this.state.indicators.ElectricityDay.valid &&
      this.state.indicators.ElectricityNight.valid &&
      this.state.indicators.ColdWaterKittchen.valid &&
      this.state.indicators.ColdWaterBathroom.valid &&
      this.state.indicators.HotWaterKittchen.valid &&
      this.state.indicators.HotWaterBathroom.valid
    )
      this.setState({ modalOpen: true });
  };

  sendEmailHandler = () => {
    let templateParams = {
      recipient: this.state.emailData.recipient,
      address: this.state.emailData.address,
      month: MONTHS_LIST[this.state.monthYear.month].text,
      year: this.state.monthYear.year,
      electricityDay: this.state.indicators.ElectricityDay.value,
      electricityNight: this.state.indicators.ElectricityNight.value,
      coldWaterKittchen: this.state.indicators.ColdWaterKittchen.value,
      coldWaterBathroom: this.state.indicators.ColdWaterBathroom.value,
      hotWaterKittchen: this.state.indicators.HotWaterKittchen.value,
      hotWaterBathroom: this.state.indicators.HotWaterBathroom.value,
    };

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
      this.state.monthYear.year,
      this.state.monthYear.month,
      1,
      5,
      0,
      0,
      0
    ).toISOString();

    const indicators = {
      Electricity: {
        Day: this.state.indicators.ElectricityDay.value,
        Night: this.state.indicators.ElectricityNight.value,
      },
      ColdWater: {
        Kittchen: this.state.indicators.ColdWaterKittchen.value,
        Bathroom: this.state.indicators.ColdWaterBathroom.value,
      },
      HotWater: {
        Kittchen: this.state.indicators.HotWaterKittchen.value,
        Bathroom: this.state.indicators.HotWaterBathroom.value,
      },
      CurrentDate: { today: dateOfIndicators, year: this.state.monthYear.year },
    };
    axios
      .post("/indicators.json", indicators)
      .then((response) => {
        this.setState({ modalOpen: false });
        this.sendEmailHandler();
        this.props.history.push("/outlay");
      })
      .catch((error) => {
        console.log(error);
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
        key: currentYear - i,
        text: currentYear - i,
        value: currentYear - i,
      });
    }
    return currentYearList;
  };

  setStateMonth = (e, { value }) => {
    const updatedMonth = value;
    const updatedMonthYear = { ...this.state.monthYear };
    updatedMonthYear.month = updatedMonth;
    this.setState({ monthYear: updatedMonthYear });
  };

  setStateYear = (e, { value }) => {
    const updatedYear = value;
    const updatedMonthYear = { ...this.state.monthYear };
    updatedMonthYear.year = updatedYear;
    this.setState({ monthYear: updatedMonthYear });
  };

  render() {
    const errorMessage = "Поле обязательно для заполнения";
    const inputClasses = ["field"];
    const inputError = ["field", "error"];
    return (
      <div className="ui center ui_center">
        <Dialog
          open={this.state.modalOpen}
          onClose={this.modalHandlerClose}
          maxWidth="xs"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5" align="center">
              Проверьте показатели за{" "}
              {MONTHS_LIST[this.state.monthYear.month].text}{" "}
              {this.state.monthYear.year} г.
            </Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    Электроэнергия
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    День:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    {this.state.indicators.ElectricityDay.value}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    Ночь:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    {this.state.indicators.ElectricityNight.value}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    Кухня
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    Холодная вода:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    {this.state.indicators.ColdWaterKittchen.value}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    Горячая вода:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    {this.state.indicators.HotWaterKittchen.value}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    Ванная
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    Холодная вода:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    {this.state.indicators.ColdWaterBathroom.value}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    Горячая вода:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" align="center">
                    {this.state.indicators.HotWaterBathroom.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <ButtonUI onClick={this.modalHandlerClose} color="secondary">
              Отмена
            </ButtonUI>
            <ButtonUI onClick={this.sendIndicators} color="primary" autoFocus>
              Отправить
            </ButtonUI>
          </DialogActions>
        </Dialog>

        <form className="ui form">
          <div className="ui one column centered grid">
            <div className="column">
              <Typography variant="h4" align="center">
                Подать показания
              </Typography>
            </div>
          </div>

          <div className="ui grid">
            <div className="row">
              <div className="column">
                <Typography variant="h5">Месяц и год</Typography>
              </div>
            </div>
            <div className="two column row">
              <div className="column">
                <Dropdown
                  placeholder="Выберите месяц"
                  selection
                  fluid
                  defaultValue={MONTHS_LIST[this.getCurrentMonth()].value}
                  options={MONTHS_LIST}
                  onChange={this.setStateMonth}
                />
              </div>
              <div className="column">
                <div className="column">
                  <Dropdown
                    placeholder="Выберите месяц"
                    selection
                    fluid
                    defaultValue={this.getCurrentYear()[2].value}
                    options={this.getCurrentYear()}
                    onChange={this.setStateYear}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ui two column centered grid">
            <div className="left floated column">
              <Typography variant="h5">Электроэнергия</Typography>
            </div>
            <div className="two column row">
              <div className="column">
                <InputNum
                  classEnter={
                    this.state.indicators.ElectricityDay.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"ElectricityDay"}
                  label={"День"}
                  placeholder={"Введите дневное потребление"}
                  name={"ElectricityDay"}
                  changed={(event) =>
                    this.addIndicatorHandler("ElectricityDay", event)
                  }
                  value={this.state.indicators.ElectricityDay.value}
                  invalid={this.state.indicators.ElectricityDay.valid}
                  errorMessage={errorMessage}
                />
              </div>
              <div className="column">
                <InputNum
                  classEnter={
                    this.state.indicators.ElectricityNight.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"ElectricityNight"}
                  label={"Ночь"}
                  placeholder={"Введите ночное потребление"}
                  name={"ElectricityNight"}
                  changed={(event) =>
                    this.addIndicatorHandler("ElectricityNight", event)
                  }
                  value={this.state.indicators.ElectricityNight.value}
                  invalid={this.state.indicators.ElectricityNight.valid}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </div>

          <div className="ui two column centered grid indicator_container">
            <div className="left floated column">
              <Typography variant="h5">Кухня</Typography>
            </div>
            <div className="two column row">
              <div className="column">
                <InputNum
                  classEnter={
                    this.state.indicators.ColdWaterKittchen.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"ColdWaterKittchen"}
                  label={"Холодная вода"}
                  placeholder={"Введите потребление"}
                  name={"ColdWaterKittchen"}
                  changed={(event) =>
                    this.addIndicatorHandler("ColdWaterKittchen", event)
                  }
                  value={this.state.indicators.ColdWaterKittchen.value}
                  invalid={this.state.indicators.ColdWaterKittchen.valid}
                  errorMessage={errorMessage}
                />
              </div>
              <div className="column">
                <InputNum
                  classEnter={
                    this.state.indicators.HotWaterKittchen.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"HotWaterKittchen"}
                  label={"Горячая вода"}
                  placeholder={"Введите потребление"}
                  name={"HotWaterKittchen"}
                  changed={(event) =>
                    this.addIndicatorHandler("HotWaterKittchen", event)
                  }
                  value={this.state.indicators.HotWaterKittchen.value}
                  invalid={this.state.indicators.HotWaterKittchen.valid}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </div>

          <div className="ui two column centered grid indicator_container">
            <div className="left floated column">
              <Typography variant="h5">Ванная</Typography>
            </div>
            <div className="two column row">
              <div className="column">
                <InputNum
                  classEnter={
                    this.state.indicators.ColdWaterBathroom.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"ColdWaterBathroom"}
                  label={"Холодная вода"}
                  placeholder={"Введите потребление"}
                  name={"ColdWaterBathroom"}
                  changed={(event) =>
                    this.addIndicatorHandler("ColdWaterBathroom", event)
                  }
                  value={this.state.indicators.ColdWaterBathroom.value}
                  invalid={this.state.indicators.ColdWaterBathroom.valid}
                  errorMessage={errorMessage}
                />
              </div>
              <div className="column">
                <InputNum
                  classEnter={
                    this.state.indicators.HotWaterBathroom.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"HotWaterBathroom"}
                  label={"Горячая вода"}
                  placeholder={"Введите потребление"}
                  name={"HotWaterBathroom"}
                  changed={(event) =>
                    this.addIndicatorHandler("HotWaterBathroom", event)
                  }
                  value={this.state.indicators.HotWaterBathroom.value}
                  invalid={this.state.indicators.HotWaterBathroom.valid}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </div>

          <div className="ui one column centered grid">
            <div style={{ textAlign: "center" }} className="column">
              <ButtonUI
                variant="contained"
                color="primary"
                disableElevation
                onClick={this.modalHandlerOpen}
              >
                Отправить
              </ButtonUI>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(IndicatorsInsert);
