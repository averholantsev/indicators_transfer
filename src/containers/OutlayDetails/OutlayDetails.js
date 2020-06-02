import React, { Component } from "react";
import axios from "../../axios-main";
import { connect } from "react-redux";

import "./OutlayDetails.css";
import Loader from "../../components/UI/Loader/Loader";
import Outlay from "../../components/Outlay/Outlay";
import Tabs from "../../components/UI/Tabs/Tabs";
import Typography from "@material-ui/core/Typography";
import DialogSimple from "../../components/UI/DialogSimple/DialogSimple";
import { withSnackbar } from "notistack";
import { MONTHS_LIST } from "../../components/IndicatorsInsertForm/Constants";
import emailjs from "emailjs-com";
import * as CONFIG from "../../configuration.json";

class OutlayDetails extends Component {
  state = {
    allIndicators: null,
    indicatorsList: null,
    prevIndicators: null,
    tariffs: null,
    currentYear: new Date().getUTCFullYear(),
    error: null,
    deleteDialogOpen: false,
    deleteIndicatorId: null,
    sendDialogOpen: false,
    sendIndicatorId: null,
  };

  componentDidMount() {
    this.getDataFromFirebase();
  }

  getDataFromFirebase = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const url_1 = `/users.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    const url_2 = `/tariffs.json`;
    const url_3 = `/indicators.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    const promise1 = axios.get(url_1);
    const promise2 = axios.get(url_2);
    const promise3 = axios.get(url_3);

    Promise.all([promise1, promise2, promise3])
      .then((values) => {
        console.log("Текущие расходы | запрос данных: ", values);

        const prevIndicators = this.getUserDetails(values[0].data);
        const tariffs = this.getListOfTariffs(values[1].data);
        let indicatorsList = this.getListOfIndicators(values[2].data);

        indicatorsList = this.countOutlay(indicatorsList, prevIndicators);

        if (indicatorsList.length !== 0) {
          this.setState({
            allIndicators: Object.keys(values[2].data).map((item) => {
              let id = item;
              let data = values[2].data[id];
              return { id, data };
            }),
            prevIndicators: prevIndicators,
            tariffs: tariffs,
            indicatorsList: indicatorsList,
          });
        } else {
          this.setState({
            prevIndicators: prevIndicators,
            tariffs: tariffs,
            error: "Передайте показания",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Произошла ошибка, попробуйте обновить страницу.",
        });
      });
  };

  getUserDetails = (data) => {
    const prevIndicatorsData = data[Object.keys(data)].prevIndicators;
    let prevIndicators = [
      {
        id: "day_electricity",
        name: "Эл-я день:",
        intake: prevIndicatorsData.electricity.day,
      },
      {
        id: "night_electricity",
        name: "Эл-я ночь:",
        intake: prevIndicatorsData.electricity.night,
      },
      {
        id: "cold_water",
        name: "Холодная вода:",
        intake:
          prevIndicatorsData.bathroom.coldWater +
          prevIndicatorsData.kitchen.coldWater,
      },
      {
        id: "hot_water",
        name: "Горячая вода:",
        intake:
          prevIndicatorsData.bathroom.hotWater +
          prevIndicatorsData.kitchen.hotWater,
      },
      {
        id: "disposal_water",
        name: "Водоотведение:",
        intake:
          prevIndicatorsData.bathroom.coldWater +
          prevIndicatorsData.kitchen.coldWater +
          prevIndicatorsData.bathroom.hotWater +
          prevIndicatorsData.kitchen.hotWater,
      },
    ];

    return prevIndicators;
  };

  getListOfTariffs = (data) => {
    let tariffs = Object.keys(data).map((item) => {
      let tariff = data[item];
      tariff.id = item;
      return tariff;
    });
    return tariffs;
  };

  getListOfIndicators = (data) => {
    let indicatorsList = Object.keys(data).map((key) => {
      return {
        id: key,
        date: new Date(data[key].currentDate.today),
        indicators: [
          {
            id: "day_electricity",
            name: "Эл-я день:",
            intake: data[key].electricity.day,
          },
          {
            id: "night_electricity",
            name: "Эл-я ночь:",
            intake: data[key].electricity.night,
          },
          {
            id: "cold_water",
            name: "Холодная вода:",
            intake: data[key].coldWater.bathroom + data[key].coldWater.kitchen,
          },
          {
            id: "hot_water",
            name: "Горячая вода:",
            intake: data[key].hotWater.bathroom + data[key].hotWater.kitchen,
          },
          {
            id: "disposal_water",
            name: "Водоотведение:",
            intake:
              data[key].coldWater.bathroom +
              data[key].coldWater.kitchen +
              data[key].hotWater.bathroom +
              data[key].hotWater.kitchen,
          },
        ],
      };
    });
    indicatorsList.sort((a, b) => a.date.getTime() - b.date.getTime());
    return indicatorsList;
  };

  sendEmailHandler = () => {
    const indicator = this.getOneIndicator();
    
    let templateParams = {
      recipient: this.props.userDetails.accountantEmail,
      address: this.props.userDetails.address,
      month: MONTHS_LIST[new Date(indicator.currentDate.today).getMonth()].text,
      year: indicator.currentDate.year,
      electricityDay: indicator.electricity.day,
      electricityNight: indicator.electricity.night,
      coldWaterKitchen: indicator.coldWater.kitchen,
      coldWaterBathroom:  indicator.coldWater.bathroom,
      hotWaterKitchen: indicator.hotWater.kitchen,
      hotWaterBathroom: indicator.hotWater.bathroom,
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
          this.props.enqueueSnackbar("Данные успешно переданы на почту!", {
            variant: "success",
            preventDuplicate: true,
          });
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  getOneIndicator = () => {
    let oneIndicator = this.state.allIndicators.find(({ id }) => id === this.state.sendIndicatorId);
    return oneIndicator.data;
  };

  deleteItemFromIndicators = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`/indicators/${this.state.deleteIndicatorId}.json?auth=${token}`)
      .then((response) => {
        console.log("Ответ с сервера: ", response.data);
        this.setState({ deleteIndicatorId: null });
        this.props.enqueueSnackbar("Объект успешно удален!", {
          variant: "info",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("Ошибка: ", error);
      });
  };

  removeIndicatorFromState = (removeId) => {
    let newIndicatorsList = [...this.state.indicatorsList];
    newIndicatorsList = newIndicatorsList.filter((item) => {
      return item.id !== removeId;
    });
    this.setState({ indicatorsList: newIndicatorsList });
  };

  handleDeleteDialogOpen = (id) => {
    this.setState({ deleteDialogOpen: true, deleteIndicatorId: id });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false });
  };

  handleDeleteDialogContinue = () => {
    this.removeIndicatorFromState(this.state.deleteIndicatorId);
    this.deleteItemFromIndicators();
    this.handleDeleteDialogClose();
  };

  handleSendDialogOpen = (id) => {
    this.setState({ sendDialogOpen: true, sendIndicatorId: id });
  };

  handleSendDialogClose = () => {
    this.setState({ sendDialogOpen: false });
  };

  handleSendDialogContinue = () => {
    this.sendEmailHandler();
    this.handleSendDialogClose();
  };

  countOutlay = (indicatorsList, prevIndicators) => {
    let newIndicatorsList = [...indicatorsList];

    for (let i = 0; i < newIndicatorsList.length; i++) {
      if (newIndicatorsList[i] === newIndicatorsList[0]) {
        newIndicatorsList[i].indicators = newIndicatorsList[i].indicators.map(
          (item, index) => {
            let newItem = { ...item };
            newItem["outlay"] = newItem.intake - prevIndicators[index].intake;
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
    let indicatorsDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

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
          indicatorsDate.setDate(indicatorsDate.getDate() + 1) >=
            new Date(dateStart) &&
          indicatorsDate.setDate(indicatorsDate.getDate() + 1) <=
            new Date(dateEnd)
        ) {
          return true;
        } else return false;
      }).cost;
    } catch (e) {
      console.log("Тариф на воду загружается...");
    }

    let disposalTariff = null;
    try {
      disposalTariff = this.state.tariffs.find(
        ({ name, dateStart, dateEnd }) => {
          if (
            name === "disposal_water" &&
            indicatorsDate.setDate(indicatorsDate.getDate() + 1) >=
              new Date(dateStart) &&
            indicatorsDate.setDate(indicatorsDate.getDate() + 1) <=
              new Date(dateEnd)
          ) {
            return true;
          } else return false;
        }
      ).cost;
    } catch (e) {
      console.log("Тариф на водоотведение загружается...");
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

  render() {
    let indicatorsList = null;
    if (this.state.indicatorsList === null && this.state.error === null) {
      indicatorsList = <Loader />;
    } else if (this.state.indicatorsList !== null) {
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
              handleDeleteDialogOpen={this.handleDeleteDialogOpen}
              handleSendDialogOpen={this.handleSendDialogOpen}
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
      <div>
        <DialogSimple
          open={this.state.sendDialogOpen}
          handleClose={this.handleSendDialogClose}
          handleContinue={this.handleSendDialogContinue}
          dialogTitle="Отправка показателей"
          dialogContent="Вы уверены, что хотите отправить показатели на адрес электронной почты бухгалтерии?"
          activeButtonName="Отправить"
        />
        <DialogSimple
          open={this.state.deleteDialogOpen}
          handleClose={this.handleDeleteDialogClose}
          handleContinue={this.handleDeleteDialogContinue}
          dialogTitle="Вы уверены?"
          dialogContent="Вы уверены, что хотите удалить данный объект? Этот процесс нельзя будет отменить."
          activeButtonName="Удалить"
        />
        <Typography variant="h4" align="center">
          Текущие расходы
        </Typography>
        <Tabs tabsList={tabsList} changeCurrentYear={this.changeCurrentYear} />
        <div className="indicatorsList">{indicatorsList}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};


export default withSnackbar(connect(mapStateToProps)(OutlayDetails));
