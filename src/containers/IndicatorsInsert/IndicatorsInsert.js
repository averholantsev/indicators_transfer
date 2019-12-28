import React, { Component } from "react";
import InputNum from "../../components/UI/Inputs/InputNum";
import Button from "../../components/UI/Button/Button";
import Modal from '../../components/UI/Modal/Modal'
import "./IndicatorsInsert.css";

class IndicatorsInsert extends Component {
  state = {
    ElectricityDay: "",
    ElectricityDayValid: true,
    ElectricityNight: "",
    ElectricityNightValid: true,
    ColdWaterKittchen: "",
    ColdWaterKittchenValid: true,
    ColdWaterBathroom: "",
    ColdWaterBathroomValid: true,
    HotWaterKittchen: "",
    HotWaterKittchenValid: true,
    HotWaterBathroom: "",
    HotWaterBathroomValid: true,
    Sending: true
  };

  setStateParam = (param, event) => {
    const eventValue = event.target.value; //.replace(/\D/, "")
    const enteredField = param + "Valid";

    this.setState({ [param]: eventValue });
    this.setState({ [enteredField]: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  sendIndicators = event => {
    event.preventDefault();

    if (this.state.ElectricityDay === "") {
      this.setState({ ElectricityDayValid: false });
    }
    if (this.state.ElectricityNight === "") {
      this.setState({ ElectricityNightValid: false });
    }
    if (this.state.ColdWaterKittchen === "") {
      this.setState({ ColdWaterKittchenValid: false });
    }
    if (this.state.ColdWaterBathroom === "") {
      this.setState({ ColdWaterBathroomValid: false });
    }
    if (this.state.HotWaterKittchen === "") {
      this.setState({ HotWaterKittchenValid: false });
    }
    if (this.state.HotWaterBathroom === "") {
      this.setState({ HotWaterBathroomValid: false });
    }

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    const indicators = {
      Electricity: {
        Day: this.state.ElectricityDay,
        Night: this.state.ElectricityNight
      },
      ColdWater: {
        Kittchen: this.state.ColdWaterKittchen,
        Bathroom: this.state.ColdWaterBathroom
      },
      HotWater: {
        Kittchen: this.state.HotWaterKittchen,
        Bathroom: this.state.HotWaterBathroom
      },
      CurrentDate: { today }
    };

    if (
      this.state.ElectricityDay !== "" &&
      this.state.ElectricityNight !== "" &&
      this.state.ColdWaterKittchen !== "" &&
      this.state.ColdWaterBathroom !== "" &&
      this.state.HotWaterKittchen !== "" &&
      this.state.HotWaterBathroom !== ""
    ) {
      console.log(indicators);
    } else {
      console.log("Не заполнено хотя бы одно поле");
    }
  };

  render() {
    const errorMessage = "Поле обязательно для заполнения";
    const inputClasses = ["field"];
    const inputError = ["field", "error"];

    return (
      <div className="ui center ui_center">
        <Modal
          show={this.state.Sending}
          modalClosed={this.purchaseCancelHandler}
        >
          Hello world!
        </Modal>
        <h1 className="ui header h1_center">Отправка показаний</h1>
        <form className="ui form">
          <div className="indicator_container">
            <h2 className="ui header">Электроэнергия</h2>
            <InputNum
              classEnter={
                this.state.ElectricityDayValid
                  ? inputClasses.join(" ")
                  : inputError.join(" ")
              }
              id={"ElectricityDay"}
              label={"День"}
              placeholder={"Введите дневное потребление"}
              name={"ElectricityDay"}
              changed={event => this.setStateParam("ElectricityDay", event)}
              value={this.state.ElectricityDay}
              invalid={this.state.ElectricityDayValid}
              errorMessage={errorMessage}
            />
            <InputNum
              classEnter={
                this.state.ElectricityNightValid
                  ? inputClasses.join(" ")
                  : inputError.join(" ")
              }
              id={"ElectricityNight"}
              label={"Ночь"}
              placeholder={"Введите ночное потребление"}
              name={"ElectricityNight"}
              changed={event => this.setStateParam("ElectricityNight", event)}
              value={this.state.ElectricityNight}
              invalid={this.state.ElectricityNightValid}
              errorMessage={errorMessage}
            />
          </div>
          <div className="indicator_container">
            <h2 className="ui header">Холодная вода</h2>
            <InputNum
              classEnter={
                this.state.ColdWaterKittchenValid
                  ? inputClasses.join(" ")
                  : inputError.join(" ")
              }
              id={"ColdWaterKittchen"}
              label={"Кухня"}
              placeholder={"Введите потребление"}
              name={"ColdWaterKittchen"}
              changed={event => this.setStateParam("ColdWaterKittchen", event)}
              value={this.state.ColdWaterKittchen}
              invalid={this.state.ColdWaterKittchenValid}
              errorMessage={errorMessage}
            />
            <InputNum
              classEnter={
                this.state.ColdWaterBathroomValid
                  ? inputClasses.join(" ")
                  : inputError.join(" ")
              }
              id={"ColdWaterBathroom"}
              label={"Ванная"}
              placeholder={"Введите потребление"}
              name={"ColdWaterBathroom"}
              changed={event => this.setStateParam("ColdWaterBathroom", event)}
              value={this.state.ColdWaterBathroom}
              invalid={this.state.ColdWaterBathroomValid}
              errorMessage={errorMessage}
            />
          </div>
          <div className="indicator_container">
            <h2 className="ui header">Горячая вода</h2>
            <InputNum
              classEnter={
                this.state.HotWaterKittchenValid
                  ? inputClasses.join(" ")
                  : inputError.join(" ")
              }
              id={"HotWaterKittchen"}
              label={"Кухня"}
              placeholder={"Введите потребление"}
              name={"HotWaterKittchen"}
              changed={event => this.setStateParam("HotWaterKittchen", event)}
              value={this.state.HotWaterKittchen}
              invalid={this.state.HotWaterKittchenValid}
              errorMessage={errorMessage}
            />
            <InputNum
              classEnter={
                this.state.HotWaterBathroomValid
                  ? inputClasses.join(" ")
                  : inputError.join(" ")
              }
              id={"HotWaterBathroom"}
              label={"Ванная"}
              placeholder={"Введите потребление"}
              name={"HotWaterBathroom"}
              changed={event => this.setStateParam("HotWaterBathroom", event)}
              value={this.state.HotWaterBathroom}
              invalid={this.state.HotWaterBathroomValid}
              errorMessage={errorMessage}
            />
          </div>
          <Button
            classUI="ui primary button"
            name={"Отправить"}
            clicked={this.sendIndicators}
          />
        </form>
      </div>
    );
  }
}

export default IndicatorsInsert;
