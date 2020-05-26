/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../axios-main";
import emailjs from "emailjs-com";
import CONFIG from "../../configuration.json";
import { MONTHS_LIST } from "../../components/IndicatorsInsertForm/Constants";

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
                  value={this.state.indicators.ElectricityDay.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("ElectricityDay", value)
                  }
                  error={!this.state.indicators.ElectricityDay.valid}
                  helperText={
                    !this.state.indicators.ElectricityDay.valid
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
                  value={this.state.indicators.ElectricityNight.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("ElectricityNight", value)
                  }
                  error={!this.state.indicators.ElectricityNight.valid}
                  helperText={
                    !this.state.indicators.ElectricityNight.valid
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
                  value={this.state.indicators.ColdWaterKittchen.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("ColdWaterKittchen", value)
                  }
                  error={!this.state.indicators.ColdWaterKittchen.valid}
                  helperText={
                    !this.state.indicators.ColdWaterKittchen.valid
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
                  value={this.state.indicators.HotWaterKittchen.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("HotWaterKittchen", value)
                  }
                  error={!this.state.indicators.HotWaterKittchen.valid}
                  helperText={
                    !this.state.indicators.HotWaterKittchen.valid
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
                  value={this.state.indicators.ColdWaterBathroom.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("ColdWaterBathroom", value)
                  }
                  error={!this.state.indicators.ColdWaterBathroom.valid}
                  helperText={
                    !this.state.indicators.ColdWaterBathroom.valid
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
                  value={this.state.indicators.HotWaterBathroom.value}
                  minimumValue="0"
                  onChange={(event, value) =>
                    this.addIndicatorHandler("HotWaterBathroom", value)
                  }
                  error={!this.state.indicators.HotWaterBathroom.valid}
                  helperText={
                    !this.state.indicators.HotWaterBathroom.valid
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

export default withRouter(IndicatorsInsert);
