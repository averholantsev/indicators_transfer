import React, { Component } from "react";
import axios from "../../axios-main";
import "./OutlayDetails.css";
import Loader from "../../components/UI/Loader/Loader";
import Outlay from "../../components/Outlay/Outlay";
import Tabs from "../../components/UI/Tabs/Tabs";
import Typography from "@material-ui/core/Typography";

class OutlayDetails extends Component {
  // TODO Хранить в бд первоначальные результаты
  state = {
    indicatorsList: [],
    prevIndicators: [
      {
        name: "Эл-я день:",
        intake: 18572,
      },
      {
        name: "Эл-я ночь:",
        intake: 6699,
      },
      {
        name: "Холодная вода:",
        intake: 402,
      },
      {
        name: "Горячая вода:",
        intake: 420,
      },
      {
        name: "Водоотведение:",
        intake: 822,
      },
    ],
    tariffs: [],
    currentYear: new Date().getUTCFullYear(),
    error: null,
  };

  componentDidMount() {
    this.getListOfIndicators();
    this.getListOfTariffs();
  }

  getListOfIndicators = () => {
    axios
      .get(`/indicators.json`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);

        let indicatorsList = Object.keys(response.data).map((key) => {
          return {
            id: key,
            date: new Date(response.data[key].CurrentDate.today),
            indicators: [
              {
                id: "day_electricity",
                name: "Эл-я день:",
                intake: Number(response.data[key].Electricity.Day),
              },
              {
                id: "night_electricity",
                name: "Эл-я ночь:",
                intake: Number(response.data[key].Electricity.Night),
              },
              {
                id: "cold_water",
                name: "Холодная вода:",
                intake:
                  Number(response.data[key].ColdWater.Bathroom) +
                  Number(response.data[key].ColdWater.Kittchen),
              },
              {
                id: "hot_water",
                name: "Горячая вода:",
                intake:
                  Number(response.data[key].HotWater.Bathroom) +
                  Number(response.data[key].HotWater.Kittchen),
              },
              {
                id: "disposal_water",
                name: "Водоотведение:",
                intake:
                  Number(response.data[key].ColdWater.Bathroom) +
                  Number(response.data[key].ColdWater.Kittchen) +
                  Number(response.data[key].HotWater.Bathroom) +
                  Number(response.data[key].HotWater.Kittchen),
              },
            ],
          };
        });
        indicatorsList.sort((a, b) => a.date.getTime() - b.date.getTime());
        this.setState({ indicatorsList: this.countOutlay(indicatorsList) });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Произошла ошибка, обратитесь к Системному Администратору.",
        });
      });
  };

  getListOfTariffs = () => {
    axios
      .get(`/tariffs.json`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);

        let tariffs = Object.keys(response.data).map((item) => {
          let tariff = response.data[item];
          tariff.id = item;
          return tariff;
        });
        this.setState({ tariffs: tariffs });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Произошла ошибка, обратитесь к Системному Администратору.",
        });
      });
  };

  countOutlay = (indicatorsList) => {
    let newIndicatorsList = [...indicatorsList];

    for (let i = 0; i < newIndicatorsList.length; i++) {
      if (newIndicatorsList[i] === newIndicatorsList[0]) {
        newIndicatorsList[i].indicators = newIndicatorsList[i].indicators.map(
          (item, index) => {
            let newItem = { ...item };
            newItem["outlay"] =
              newItem.intake - this.state.prevIndicators[index].intake;
            return newItem;
          }
        );
      } else {
        newIndicatorsList[i].indicators = newIndicatorsList[i].indicators.map(
          (item, index) => {
            let newItem = { ...item };
            newItem["outlay"] =
              newItem.intake -
              newIndicatorsList[i - 1].indicators[index].intake;
            return newItem;
          }
        );
      }
    }
    return newIndicatorsList;
  };

  countCostNovogor = (indicators, date) => {
    let coldWater = null;
    try {
      coldWater = indicators.find(({ id }) => id === "cold_water").outlay;
    } catch (e) {
      console.log("Холодная вода", e);
    }

    let hotWater = null;
    try {
      hotWater = indicators.find(({ id }) => id === "hot_water").outlay;
    } catch (e) {
      console.log("Горячая вода", e);
    }

    let disposalWater = null;
    try {
      disposalWater = indicators.find(({ id }) => id === "disposal_water")
        .outlay;
    } catch (e) {
      console.log("Водоотведение", e);
    }

    let waterTariff = null;
    try {
      waterTariff = this.state.tariffs.find(({ name, dateStart, dateEnd }) => {
        if (
          name === "water" &&
          Date.parse(dateStart) <= date &&
          Date.parse(dateEnd) >= date
        ) {
          return true;
        } else return false;
      }).cost;
    } catch (e) {
      console.log("Тариф на воду", e);
    }

    let disposalTariff = null;
    try {
      disposalTariff = this.state.tariffs.find(
        ({ name, dateStart, dateEnd }) => {
          if (
            name === "disposal_water" &&
            Date.parse(dateStart) <= date &&
            Date.parse(dateEnd) >= date
          ) {
            return true;
          } else return false;
        }
      ).cost;
    } catch (e) {
      console.log("Тариф на водоотведение", e);
    }

    let novogorCost = (
      (coldWater + hotWater) * waterTariff +
      disposalWater * disposalTariff
    ).toFixed(2);
    return novogorCost;
  };

  changeCurrentYear = (year) => {
    this.setState({ currentYear: year });
  };

  // TODO: Добавить возможность редактирования и удаления записей
  render() {
    let indicatorsList = null;
    if (this.state.indicatorsList.length === 0 && this.state.error == null) {
      indicatorsList = <Loader />;
    } else if (this.state.indicatorsList.length > 0) {
      indicatorsList = this.state.indicatorsList.filter((item) => {
        return item.date.getUTCFullYear() === this.state.currentYear;
      });

      if (indicatorsList.length > 0) {
        indicatorsList = indicatorsList.map((item, index) => {
          return (
            <Outlay
              key={index}
              indicatorsList={item}
              costNovogor={this.countCostNovogor(item.indicators, item.date)}
            />
          );
        });
      } else
        indicatorsList = (
          <p
            style={{ textAlign: "center" }}
          >{`Нет данных на ${this.state.currentYear} год`}</p>
        );
    } else {
      indicatorsList = (
        <p style={{ textAlign: "center" }}>{this.state.error}</p>
      );
    }

    const tabsList = [];
    for (
      let i = new Date().getUTCFullYear();
      i >= new Date().getUTCFullYear() - 1;
      i--
    ) {
      tabsList.push(i);
    }

    return (
      <div className="outlayContainer">
        <Typography variant="h4" align="center">
          Текущие расходы
        </Typography>
        <Tabs tabsList={tabsList} changeCurrentYear={this.changeCurrentYear} />
        <div className="indicatorsList">{indicatorsList}</div>
      </div>
    );
  }
}

export default OutlayDetails;
