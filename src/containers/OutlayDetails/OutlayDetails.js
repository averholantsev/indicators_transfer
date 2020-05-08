import React, { Component } from "react";
import axios from "../../axios-main";
import { Loader } from "semantic-ui-react";
import "./OutlayDetails.css";
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
    ],
    currentYear: new Date().getUTCFullYear(),
    error: null,
  };

  componentDidMount() {
    this.getListOfIndicators();
  }

  getListOfIndicators = () => {
    axios
      .get(`/indicators.json`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        if (Object.keys(response.data).length !== 0) {
          let indicatorsList = Object.keys(response.data).map((key) => {
            return {
              id: key,
              date: new Date(response.data[key].CurrentDate.today),
              indicators: [
                {
                  name: "Эл-я день:",
                  intake: Number(response.data[key].Electricity.Day),
                },
                {
                  name: "Эл-я ночь:",
                  intake: Number(response.data[key].Electricity.Night),
                },
                {
                  name: "Холодная вода:",
                  intake:
                    Number(response.data[key].ColdWater.Bathroom) +
                    Number(response.data[key].ColdWater.Kittchen),
                },
                {
                  name: "Горячая вода:",
                  intake:
                    Number(response.data[key].HotWater.Bathroom) +
                    Number(response.data[key].HotWater.Kittchen),
                },
              ],
            };
          });
          indicatorsList.sort((a, b) => a.date.getTime() - b.date.getTime());
          this.setState({ indicatorsList: this.countOutlay(indicatorsList) });
        } else {
          this.setState({
            error: `Данные за ${this.state.currentYear} год отсутствуют. Передайте показания счетчиков.`,
          });
        }
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

  changeCurrentYear = (year) => {
    this.setState({ currentYear: year });
  };

  // TODO: Добавить возможность редактирования и удаления записей
  render() {
    let indicatorsList = null;
    if (this.state.indicatorsList.length === 0 && this.state.error == null) {
      indicatorsList = (
        <Loader active inline="centered">
          Загрузка
        </Loader>
      );
    } else if (this.state.indicatorsList.length > 0) {
      indicatorsList = this.state.indicatorsList
        .filter((item) => {
          return (
            item.date.getUTCFullYear() === this.state.currentYear
          );
        })
        .map((item, index) => {
          return <Outlay key={index} indicatorsList={item} />;
        });
    } else if (this.state.indicatorsList.length === 0 && this.state.error) {
      indicatorsList = (
        <p style={{ textAlign: "center" }}>{this.state.error}</p>
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
