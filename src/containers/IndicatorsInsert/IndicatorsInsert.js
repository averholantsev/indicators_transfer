import React, { Component } from "react";
import InputNum from "../../components/UI/Inputs/InputNum";
import Button from "../../components/UI/Button/Button";

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
    HotWaterBathroomValid: true
  };

  setStateParam = (param, event) => {
    const eventValue = event.target.value.replace(/\D/, "");
    const enteredField = param + "Valid";

    if (Number(eventValue) || event.target.value === "") {
      this.setState({ [param]: eventValue });
      this.setState({ [enteredField]: true });
    }
  };

  sendIndicators = () => {
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

    if (this.state.ElectricityDay !== "" && this.state.ElectricityNight !== "" && this.state.ColdWaterKittchen !== "" && this.state.ColdWaterBathroom !== "" && this.state.HotWaterKittchen !== "" && this.state.HotWaterBathroom !== "") {
      console.log(indicators);
    } else {
      console.log('Не заполнено хотя бы одно поле');
    }
  };

  render() {
    const errorMessage = "Поле обязательно для заполнения";

    return (
      <div>
        <h1>Отправка показаний</h1>
        <div>
          <h2>Электроэнергия</h2>
          <InputNum
            id={"ElectricityDay"}
            label={"День"}
            placeholder={"Введите дневное потребление"}
            name={"ElectricityDay"}
            changed={event => this.setStateParam("ElectricityDay", event)}
            value={this.state.ElectricityDay}
          />
          <span>{this.state.ElectricityDayValid ? null : errorMessage}</span>
          <InputNum
            id={"ElectricityNight"}
            label={"Ночь"}
            placeholder={"Введите ночное потребление"}
            name={"ElectricityNight"}
            changed={event => this.setStateParam("ElectricityNight", event)}
            value={this.state.ElectricityNight}
          />
          <span>{this.state.ElectricityNightValid ? null : errorMessage}</span>
        </div>
        <div>
          <h2>Холодная вода</h2>
          <InputNum
            id={"ColdWaterKittchen"}
            label={"Кухня"}
            placeholder={"Введите потребление"}
            name={"ColdWaterKittchen"}
            changed={event => this.setStateParam("ColdWaterKittchen", event)}
            value={this.state.ColdWaterKittchen}
          />
          <span>{this.state.ColdWaterKittchenValid ? null : errorMessage}</span>
          <InputNum
            id={"ColdWaterBathroom"}
            label={"Ванная"}
            placeholder={"Введите потребление"}
            name={"ColdWaterBathroom"}
            changed={event => this.setStateParam("ColdWaterBathroom", event)}
            value={this.state.ColdWaterBathroom}
          />
          <span>{this.state.ColdWaterBathroomValid ? null : errorMessage}</span>
        </div>
        <div>
          <h2>Горячая вода</h2>
          <InputNum
            id={"HotWaterKittchen"}
            label={"Кухня"}
            placeholder={"Введите потребление"}
            name={"HotWaterKittchen"}
            changed={event => this.setStateParam("HotWaterKittchen", event)}
            value={this.state.HotWaterKittchen}
          />
          <span>{this.state.HotWaterKittchenValid ? null : errorMessage}</span>
          <InputNum
            id={"HotWaterBathroom"}
            label={"Ванная"}
            placeholder={"Введите потребление"}
            name={"HotWaterBathroom"}
            changed={event => this.setStateParam("HotWaterBathroom", event)}
            value={this.state.HotWaterBathroom}
          />
          <span>{this.state.HotWaterBathroomValid ? null : errorMessage}</span>
        </div>
        <Button name={"Отправить"} clicked={this.sendIndicators} />
      </div>
    );
  }
}

export default IndicatorsInsert;
