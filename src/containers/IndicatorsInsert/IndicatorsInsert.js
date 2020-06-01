/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../axios-main";
import { MONTHS_LIST } from "../../components/IndicatorsInsertForm/Constants";
import { connect } from "react-redux";
import emailjs from "emailjs-com";
import * as CONFIG from "../../configuration.json";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import "./IndicatorsInsert.css";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "../../components/UI/Switch/Switch";

class IndicatorsInsert extends Component {
  state = {
    indicators: {
      electricityDay: { value: "", valid: true },
      electricityNight: { value: "", valid: true },
      coldWaterKitchen: { value: "", valid: true },
      coldWaterBathroom: { value: "", valid: true },
      hotWaterKitchen: { value: "", valid: true },
      hotWaterBathroom: { value: "", valid: true },
    },
    monthYear: {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
    sendDataToAccountant: true,
    modalOpen: false,
  };

  addIndicatorHandler = (type, value) => {
    //Обновляем показатель
    const updatedCount = value;
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
      month: MONTHS_LIST[this.state.monthYear.month].text,
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

    console.log(new Date(dateOfIndicators).toUTCString());

    const indicators = {
      electricity: {
        day: this.state.indicators.electricityDay.value,
        night: this.state.indicators.electricityNight.value,
      },
      coldWater: {
        kitchen: this.state.indicators.coldWaterKitchen.value,
        bathroom: this.state.indicators.coldWaterBathroom.value,
      },
      hotWater: {
        kitchen: this.state.indicators.hotWaterKitchen.value,
        bathroom: this.state.indicators.hotWaterBathroom.value,
      },
      currentDate: {
        today: new Date(dateOfIndicators).toUTCString(),
        year: this.state.monthYear.year,
      },
      userId: localStorage.getItem("userId"),
    };
    const token = localStorage.getItem("token");

    axios
      .post(`/indicators.json?auth=${token}`, indicators)
      .then((response) => {
        console.log(response);
        this.setState({ modalOpen: false });
        if (this.state.sendDataToAccountant) this.sendEmailHandler();
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

  setStateMonth = (e, value) => {
    const updatedMonth = value;
    const updatedMonthYear = { ...this.state.monthYear };
    updatedMonthYear.month = updatedMonth;
    this.setState({ monthYear: updatedMonthYear });
  };

  setStateYear = (e, value) => {
    const updatedYear = value;
    const updatedMonthYear = { ...this.state.monthYear };
    updatedMonthYear.year = updatedYear;
    this.setState({ monthYear: updatedMonthYear });
  };

  switchChange = () => {
    this.setState({ sendDataToAccountant: !this.state.sendDataToAccountant });
  }

  render() {
    const errorMessage = "Поле обязательно для заполнения";

    return (
      <div>
        <Dialog
          open={this.state.modalOpen}
          onClose={this.modalHandlerClose}
          maxWidth="xs"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" align="center">
            Проверьте показатели за{" "}
            {MONTHS_LIST[this.state.monthYear.month].text}{" "}
            {this.state.monthYear.year} г.
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={1}>
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
                  {this.state.indicators.electricityDay.value}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" align="center">
                  Ночь:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" align="center">
                  {this.state.indicators.electricityNight.value}
                </Typography>
              </Grid>

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
                  {this.state.indicators.coldWaterKitchen.value}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" align="center">
                  Горячая вода:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" align="center">
                  {this.state.indicators.hotWaterKitchen.value}
                </Typography>
              </Grid>

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
                  {this.state.indicators.coldWaterBathroom.value}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" align="center">
                  Горячая вода:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" align="center">
                  {this.state.indicators.hotWaterBathroom.value}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Switch label="Отправить в бухгалтерию" checked={this.state.sendDataToAccountant} switchChange={this.switchChange}/>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.modalHandlerClose} color="secondary">
              Отмена
            </Button>
            <Button onClick={this.sendIndicators} color="primary" autoFocus>
              Отправить
            </Button>
          </DialogActions>
        </Dialog>

        <Typography
          variant="h4"
          align="center"
          style={{ marginBottom: "10px" }}
        >
          Подать показания
        </Typography>

        <Card className="card">
          <CardContent className="cardPadding">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className="headerMargin">
                  Месяц и год
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel>Месяц</InputLabel>
                  <Select
                    value={this.state.monthYear.month || 0}
                    onChange={(event) =>
                      this.setStateMonth(event, event.target.value)
                    }
                  >
                    {MONTHS_LIST.map((item) => (
                      <MenuItem key={item.key} value={item.value}>
                        {item.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel>Год</InputLabel>
                  <Select
                    value={this.state.monthYear.year || 2020}
                    onChange={(event) =>
                      this.setStateYear(event, event.target.value)
                    }
                  >
                    {this.getCurrentYear().map((item) => (
                      <MenuItem key={item.key} value={item.value}>
                        {item.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className="headerMargin">
                  Электроэнергия
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CurrencyTextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="День"
                  currencySymbol=""
                  value={this.state.indicators.electricityDay.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("electricityDay", value)
                  }
                  error={!this.state.indicators.electricityDay.valid}
                  helperText={
                    !this.state.indicators.electricityDay.valid
                      ? errorMessage
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <CurrencyTextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="Ночь"
                  currencySymbol=""
                  value={this.state.indicators.electricityNight.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("electricityNight", value)
                  }
                  error={!this.state.indicators.electricityNight.valid}
                  helperText={
                    !this.state.indicators.electricityNight.valid
                      ? errorMessage
                      : null
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className="headerMargin">
                  Кухня
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CurrencyTextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="Холодная вода"
                  currencySymbol=""
                  value={this.state.indicators.coldWaterKitchen.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("coldWaterKitchen", value)
                  }
                  error={!this.state.indicators.coldWaterKitchen.valid}
                  helperText={
                    !this.state.indicators.coldWaterKitchen.valid
                      ? errorMessage
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <CurrencyTextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="Горячая вода"
                  currencySymbol=""
                  value={this.state.indicators.hotWaterKitchen.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("hotWaterKitchen", value)
                  }
                  error={!this.state.indicators.hotWaterKitchen.valid}
                  helperText={
                    !this.state.indicators.hotWaterKitchen.valid
                      ? errorMessage
                      : null
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className="headerMargin">
                  Ванная
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CurrencyTextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="Холодная вода"
                  currencySymbol=""
                  value={this.state.indicators.coldWaterBathroom.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("coldWaterBathroom", value)
                  }
                  error={!this.state.indicators.coldWaterBathroom.valid}
                  helperText={
                    !this.state.indicators.coldWaterBathroom.valid
                      ? errorMessage
                      : null
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <CurrencyTextField
                  style={{ width: "100%" }}
                  variant="standard"
                  label="Горячая вода"
                  currencySymbol=""
                  value={this.state.indicators.hotWaterBathroom.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("hotWaterBathroom", value)
                  }
                  error={!this.state.indicators.hotWaterBathroom.valid}
                  helperText={
                    !this.state.indicators.hotWaterBathroom.valid
                      ? errorMessage
                      : null
                  }
                />
              </Grid>
            </Grid>

            <Grid container justify="center" spacing={2}>
              <Grid
                item
                xs={12}
                style={{ textAlign: "center", marginTop: "15px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={this.modalHandlerOpen}
                >
                  Отправить
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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
