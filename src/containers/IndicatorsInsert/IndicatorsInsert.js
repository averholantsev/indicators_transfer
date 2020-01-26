/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../axios-main";
import emailjs from "emailjs-com";
import CONFIG from '../../configuration.json'

import InputNum from "../../components/UI/Inputs/InputNum";
import Button from "../../components/UI/Button/Button";
import { Modal, Dropdown } from "semantic-ui-react";
import "./IndicatorsInsert.css";

const MONTHS_LIST = [
  {
    key: "0",
    text: "Январь",
    value: 0
  },
  {
    key: "1",
    text: "Феварль",
    value: 1
  },
  {
    key: "2",
    text: "Март",
    value: 2
  },
  {
    key: "3",
    text: "Апрель",
    value: 3
  },
  {
    key: "4",
    text: "Май",
    value: 4
  },
  {
    key: "5",
    text: "Июнь",
    value: 5
  },
  {
    key: "6",
    text: "Июль",
    value: 6
  },
  {
    key: "7",
    text: "Август",
    value: 7
  },
  {
    key: "8",
    text: "Сентябрь",
    value: 8
  },
  {
    key: "9",
    text: "Октябрь",
    value: 9
  },
  {
    key: "10",
    text: "Ноябрь",
    value: 10
  },
  {
    key: "11",
    text: "Декабрь",
    value: 11
  }
];

class IndicatorsInsert extends Component {
  state = {
    indicators: {
      ElectricityDay: { value: "", valid: true },
      ElectricityNight: { value: "", valid: true },
      ColdWaterKittchen: { value: "", valid: true },
      ColdWaterBathroom: { value: "", valid: true },
      HotWaterKittchen: { value: "", valid: true },
      HotWaterBathroom: { value: "", valid: true }
    },
    monthYear: {
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    },
    emailData: {
      email: CONFIG.EMAIL,
      recipient: CONFIG.RECIPIENT,
      subject: CONFIG.SUBJECT,
      address: CONFIG.ADDRESS
    },
    modalOpen: false
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

  modalHandlerOpen = event => {
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
      from_name: this.state.emailData.email,
      to_name: this.state.emailData.recipient,
      subject: this.state.emailData.subject,
      message_html: this.state.emailData.message
    };
    emailjs
      .send(
        "gmail",
        CONFIG.TEMPLATE_ID,
        templateParams,
        CONFIG.USER_ID
      )
      .then(
        response => {
          console.log("SUCCESS!", response.status, response.text);
        },
        error => {
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
        Night: this.state.indicators.ElectricityNight.value
      },
      ColdWater: {
        Kittchen: this.state.indicators.ColdWaterKittchen.value,
        Bathroom: this.state.indicators.ColdWaterBathroom.value
      },
      HotWater: {
        Kittchen: this.state.indicators.HotWaterKittchen.value,
        Bathroom: this.state.indicators.HotWaterBathroom.value
      },
      CurrentDate: { today: dateOfIndicators }
    };
    axios
      .post("/indicators.json", indicators)
      .then(response => {
        this.setState({ modalOpen: false });
        this.sendEmailHandler();
        this.props.history.push("/outlay");
      })
      .catch(error => {
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
        value: currentYear - i
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
    // TODO Добавить выбор месяца и года
    return (
      <div className="ui center ui_center">
        <Modal
          size="mini"
          open={this.state.modalOpen}
          onClose={this.modalHandlerClose}
        >
          <Modal.Header>
            <h3 className="ui center aligned header">
              Проверьте передаваемые <br />
              показатели за {MONTHS_LIST[this.state.monthYear.month].text}{" "}
              {this.state.monthYear.year} г.
            </h3>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div className="ui four column centered grid">
                <div className="row" style={{ paddingBottom: "0" }}>
                  <h4 className="ui center aligned header">Электроэнергия</h4>
                </div>
                <div className="row">
                  <div className="column">
                    <p>День:</p>
                  </div>
                  <div className="column">
                    <strong>
                      {this.state.indicators.ElectricityDay.value}
                    </strong>
                  </div>
                  <div className="column">
                    <p>Ночь:</p>
                  </div>
                  <div className="column">
                    <strong>
                      {this.state.indicators.ElectricityNight.value}
                    </strong>
                  </div>
                </div>
                <div className="row" style={{ paddingBottom: "0" }}>
                  <h4 className="ui center aligned header">Кухня</h4>
                </div>
                <div className="row">
                  <div className="column">
                    <p>Холодная вода:</p>
                  </div>
                  <div className="column">
                    <strong>
                      {this.state.indicators.ColdWaterKittchen.value}
                    </strong>
                  </div>
                  <div className="column">
                    <p>Горячая вода:</p>
                  </div>
                  <div className="column">
                    <strong>
                      {this.state.indicators.HotWaterKittchen.value}
                    </strong>
                  </div>
                </div>
                <div className="row" style={{ paddingBottom: "0" }}>
                  <h4 className="ui center aligned header">Ванная</h4>
                </div>
                <div className="row">
                  <div className="column">
                    <p>Холодная вода:</p>
                  </div>
                  <div className="column">
                    <strong>
                      {this.state.indicators.ColdWaterBathroom.value}
                    </strong>
                  </div>
                  <div className="column">
                    <p>Горячая вода:</p>
                  </div>
                  <div className="column">
                    <strong>
                      {this.state.indicators.HotWaterBathroom.value}
                    </strong>
                  </div>
                </div>
              </div>
            </Modal.Description>
            <div className="ui grid" style={{ marginTop: "2rem" }}>
              <div className="right aligned sixteen wide column">
                <Button
                  classUI="ui button"
                  name={"Отмена"}
                  clicked={this.modalHandlerClose}
                  style={{ marginRight: "1rem" }}
                />
                <Button
                  classUI="ui primary button"
                  name={"Отправить"}
                  clicked={this.sendIndicators}
                  style={{ marginRight: "0" }}
                />
              </div>
            </div>
          </Modal.Content>
        </Modal>

        <form className="ui form">
          <div className="ui one column centered grid">
            <div className="column">
              <h1 className="ui header centered">Отправка показаний</h1>
            </div>
          </div>

          <div className="ui grid">
            <div className="row">
              <div className="column">
                <h2 className="ui header">Месяц и год</h2>
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
              <h2 className="ui header">Электроэнергия</h2>
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
                  changed={event =>
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
                  changed={event =>
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
              <h2 className="ui header">Кухня</h2>
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
                  changed={event =>
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
                    this.state.indicators.HotWaterBathroom.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"HotWaterBathroom"}
                  label={"Горячая вода"}
                  placeholder={"Введите потребление"}
                  name={"HotWaterBathroom"}
                  changed={event =>
                    this.addIndicatorHandler("HotWaterBathroom", event)
                  }
                  value={this.state.indicators.HotWaterBathroom.value}
                  invalid={this.state.indicators.HotWaterBathroom.valid}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </div>

          <div className="ui two column centered grid indicator_container">
            <div className="left floated column">
              <h2 className="ui header">Ванная</h2>
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
                  changed={event =>
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
                    this.state.indicators.HotWaterKittchen.valid
                      ? inputClasses.join(" ")
                      : inputError.join(" ")
                  }
                  id={"HotWaterKittchen"}
                  label={"Горячая вода"}
                  placeholder={"Введите потребление"}
                  name={"HotWaterKittchen"}
                  changed={event =>
                    this.addIndicatorHandler("HotWaterKittchen", event)
                  }
                  value={this.state.indicators.HotWaterKittchen.value}
                  invalid={this.state.indicators.HotWaterKittchen.valid}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </div>

          <div className="ui one column centered grid">
            <div style={{ textAlign: "center" }} className="column">
              <Button
                classUI="ui primary button"
                name={"Отправить показания"}
                clicked={this.modalHandlerOpen}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(IndicatorsInsert);
