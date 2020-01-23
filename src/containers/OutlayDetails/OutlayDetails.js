import React, { Component } from "react";
import axios from "../../axios-orders";
import { Loader } from 'semantic-ui-react'

import Outlay from "../../components/Outlay/Outlay";

class OutlayDetails extends Component {
  state = {
    indicatorsList: null,
    prevIndicators: {
      electricity: {
        Day: "18572",
        Night: "6699"
      },
      coldWater: {
        Bathroom: "129",
        Kittchen: "273"
      },
      hotWater: {
        Bathroom: "263",
        Kittchen: "157"
      }
    }
  };

  componentDidMount() {
    axios
      .get("/indicators.json")
      .then(response => {
        let indicatorsList = Object.keys(response.data).map(key => {
          return {
            id: key,
            date: response.data[key].CurrentDate.today,
            indicators: {
              electricity: response.data[key].Electricity,
              coldWater: response.data[key].ColdWater,
              hotWater: response.data[key].HotWater
            },
            outlay: null
          };
        });
        indicatorsList.sort((a, b) => {
          let dateA = new Date(a.date),
            dateB = new Date(b.date);
          return dateA - dateB;
        });

        this.setState({ indicatorsList: indicatorsList });
        this.fun();
      })
      .catch(error => console.log(error));
  }

  fun = () => {
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
              Number(this.state.prevIndicators.hotWater.Kittchen))
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
              Number(outlayArray[i - 1].indicators.hotWater.Kittchen))
        };
      }
    }
    this.setState({ indicatorsList: outlayArray });
  };

  render() {
    return (
      <div>
        <h1 className="ui header centered">Текущие расходы</h1>
        {this.state.indicatorsList == null ? (
          <Loader active inline='centered'>Загрузка</Loader>
        ) : (
          this.state.indicatorsList.map(ind => {
            return (
              <Outlay
                key={ind.id}
                indicators={ind.indicators}
                date={ind.date}
                outlay={ind.outlay}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default OutlayDetails;
