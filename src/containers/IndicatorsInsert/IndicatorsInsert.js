import React, { Component } from "react";
import InputNum from "../../components/UI/Inputs/InputNum";
import Button from "../../components/UI/Button/Button";
import { Modal } from "semantic-ui-react";
import "./IndicatorsInsert.css";

class IndicatorsInsert extends Component {
  state = {
    indicators: {
      ElectricityDay: { value: "1", valid: true },
      ElectricityNight: { value: "1", valid: true },
      ColdWaterKittchen: { value: "1", valid: true },
      ColdWaterBathroom: { value: "1", valid: true },
      HotWaterKittchen: { value: "1", valid: true },
      HotWaterBathroom: { value: "1", valid: true }
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

  sendIndicators = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

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
      CurrentDate: { today }
    };
    console.log(indicators);
  };

  render() {
    const errorMessage = "Поле обязательно для заполнения";
    const inputClasses = ["field"];
    const inputError = ["field", "error"];

    return (
      <div className="ui center ui_center">
        <Modal
          size="mini"
          open={this.state.modalOpen}
          onClose={this.modalHandlerClose}
        >
          <Modal.Header>
            Проверьте правильность передаваемых показателей
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <dl className="indicatorsList">
                <dt>Электричество день:</dt>
                <dd>{this.state.indicators.ElectricityDay.value}</dd>
                <br />
                <dt>Электричество ночь:</dt>
                <dd>{this.state.indicators.ElectricityNight.value}</dd>
                <br />
                <dt>Холодная вода кухня:</dt>
                <dd>{this.state.indicators.ColdWaterKittchen.value}</dd>
                <br />
                <dt>Холодная вода ванная:</dt>
                <dd>{this.state.indicators.ColdWaterBathroom.value}</dd>
                <br />
                <dt>Горячая вода кухня:</dt>
                <dd>{this.state.indicators.HotWaterKittchen.value}</dd>
                <br />
                <dt>Горячая вода ванная:</dt>
                <dd>{this.state.indicators.HotWaterBathroom.value}</dd>
              </dl>
            </Modal.Description>
            <div className="ui grid">
              <div className="right aligned sixteen wide column">
                <Button
                  classUI="ui button"
                  name={"Отмена"}
                  clicked={this.modalHandlerClose}
                />
                <Button
                  classUI="ui primary button"
                  name={"Отправить"}
                  clicked={this.sendIndicators}
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
            <div style={{textAlign: "center"}} className="column">
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

export default IndicatorsInsert;
