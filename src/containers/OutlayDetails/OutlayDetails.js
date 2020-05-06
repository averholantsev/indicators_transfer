import React, { Component } from "react";
import axios from "../../axios-main";
import { Loader } from "semantic-ui-react";
import "./OutlayDetails.css";
import Outlay from "../../components/Outlay/Outlay";
import TabUI from "../../components/UI/Tab/TabUI";

class OutlayDetails extends Component {
  // TODO Хранить в бд первоначальные результаты
  state = {
    indicatorsList: [],
    prevIndicators: {
      electricity: {
        Day: "18572",
        Night: "6699",
      },
      coldWater: {
        Bathroom: "129",
        Kittchen: "273",
      },
      hotWater: {
        Bathroom: "263",
        Kittchen: "157",
      },
    },
    currentYear: new Date().getUTCFullYear(),
    error: null,
  };

  componentDidMount() {
    this.getListOfIndicators(this.state.currentYear);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentYear !== this.state.currentYear) {
      this.getListOfIndicators(this.state.currentYear);
    }
  }

  getListOfIndicators = (year) => {
    axios
      .get(
        `/indicators.json?orderBy="CurrentDate/year"&startAt=${year}&endAt=${year}`
      )
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          let indicatorsList = Object.keys(response.data).map((key) => {
            return {
              id: key,
              date: response.data[key].CurrentDate.today,
              indicators: {
                electricity: response.data[key].Electricity,
                coldWater: response.data[key].ColdWater,
                hotWater: response.data[key].HotWater,
              },
              outlay: null,
            };
          });
          indicatorsList.sort((a, b) => {
            let dateA = new Date(a.date),
              dateB = new Date(b.date);
            return dateA - dateB;
          });

          this.setState({ indicatorsList: indicatorsList });
          this.countOutlay();
        } else {
          this.setState({
            indicatorsList: [],
            error: `Данные за ${this.state.currentYear} год отсутствуют`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Данные отсутствуют. Передайте показания счетчиков.",
        });
      });
  };

  countOutlay = () => {
    let outlayArray = [...this.state.indicatorsList];
    for (let i = 0; i < outlayArray.length; i++) {
      if (outlayArray[i] === outlayArray[0]) {
        outlayArray[i].outlay = {
          electricityDay:
            Number(outlayArray[i].indicators.electricity.Day) -
            Number(this.state.prevIndicators.electricity.Day),
          electricityNight:
            Number(outlayArray[i].indicators.electricity.Night) -
            Number(this.state.prevIndicators.electricity.Night),
          coldWater:
            Number(outlayArray[i].indicators.coldWater.Bathroom) -
            Number(this.state.prevIndicators.coldWater.Bathroom) +
            (Number(outlayArray[i].indicators.coldWater.Kittchen) -
              Number(this.state.prevIndicators.coldWater.Kittchen)),
          hotWater:
            Number(outlayArray[i].indicators.hotWater.Bathroom) -
            Number(this.state.prevIndicators.hotWater.Bathroom) +
            (Number(outlayArray[i].indicators.hotWater.Kittchen) -
              Number(this.state.prevIndicators.hotWater.Kittchen)),
        };
      } else {
        outlayArray[i].outlay = {
          electricityDay:
            Number(outlayArray[i].indicators.electricity.Day) -
            Number(outlayArray[i - 1].indicators.electricity.Day),
          electricityNight:
            Number(outlayArray[i].indicators.electricity.Night) -
            Number(outlayArray[i - 1].indicators.electricity.Night),
          coldWater:
            Number(outlayArray[i].indicators.coldWater.Bathroom) -
            Number(outlayArray[i - 1].indicators.coldWater.Bathroom) +
            (Number(outlayArray[i].indicators.coldWater.Kittchen) -
              Number(outlayArray[i - 1].indicators.coldWater.Kittchen)),
          hotWater:
            Number(outlayArray[i].indicators.hotWater.Bathroom) -
            Number(outlayArray[i - 1].indicators.hotWater.Bathroom) +
            (Number(outlayArray[i].indicators.hotWater.Kittchen) -
              Number(outlayArray[i - 1].indicators.hotWater.Kittchen)),
        };
      }
    }
    this.setState({ indicatorsList: outlayArray });
  };

  changeCurrentYear = (year) => {
    this.setState({ currentYear: year });
  };

  // TODO: Сделать отображение списка в обратном порядке
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
      indicatorsList = this.state.indicatorsList.map((ind) => {
        return (
          <Outlay
            key={ind.id}
            indicators={ind.indicators}
            date={ind.date}
            outlay={ind.outlay}
          />
        );
      });
    } else if (this.state.indicatorsList.length === 0 && this.state.error) {
      indicatorsList = <p style={{ textAlign: "center" }}>{this.state.error}</p>;
    } else {
      indicatorsList = (
        <p style={{ textAlign: "center" }}>{this.state.error}</p>
      );
    }

    const tabsList = [];
    for (
      let i = new Date().getUTCFullYear();
      i >= new Date().getUTCFullYear() - 2;
      i--
    ) {
      tabsList.push(i);
    }

    console.log();

    return (
      <div className="outlayContainer">
        <h1 className="ui header centered">Текущие расходы</h1>
        <TabUI tabsList={tabsList} changeCurrentYear={this.changeCurrentYear} />
        <div className="indicatorsList">{indicatorsList}</div>
      </div>
    );
  }
}

export default OutlayDetails;
