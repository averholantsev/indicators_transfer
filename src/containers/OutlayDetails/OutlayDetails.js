import React, { Component } from "react";
import { connect } from "react-redux";
import emailjs from "emailjs-com";
import { extractTariff } from "../../api/tariffs";
import { extractIndicators, deleteIndicators } from "../../api/indicators";

import { withSnackbar } from "notistack";
import { MONTHS_LIST } from "../../components/IndicatorsInsert/Constants";
import * as CONFIG from "../../configuration.json";
import Loader from "../../components/UI/Loader/Loader";
import Outlay from "../../components/Outlay/Outlay";
import Tabs from "../../components/UI/Tabs/Tabs";
import DialogSimple from "../../components/UI/DialogSimple/DialogSimple";
import Typography from "@material-ui/core/Typography";
import Text from "../../components/UI/Text/Text";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./OutlayDetails.css";

class OutlayDetails extends Component {
  state = {
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
    if (this.props.userDetails) {
      this.getDataFromFirebase(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.userDetails !== newProps.userDetails) {
      this.getDataFromFirebase(newProps);
    }
  }

  getDataFromFirebase = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const promise1 = extractTariff(token, userId);
    const promise2 = extractIndicators(token, userId);

    Promise.all([promise1, promise2])
      .then((values) => {
        console.log("extractTariff", values[0]);
        console.log("extractIndicators", values[1]);

        const prevIndicators = this.getUserDetails(this.props.prevIndicators);
        const tariffs = this.getListOfTariffs(values[0].data);
        let indicatorsList = this.getListOfIndicators(values[1].data);

        indicatorsList = this.countOutlay(indicatorsList, prevIndicators);

        if (indicatorsList.length !== 0) {
          this.setState({
            prevIndicators: prevIndicators,
            tariffs: tariffs,
            indicatorsList: indicatorsList,
          });
        } else {
          this.setState({
            prevIndicators: prevIndicators,
            tariffs: tariffs,
            error: "outlayErrorNotYetSend",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "responseError",
        });
      });
  };

  getUserDetails = (prevIndicators) => {
    return [
      {
        id: "day_electricity",
        name: "outlayElectricityDay",
        intake: prevIndicators.electricity.day,
      },
      {
        id: "night_electricity",
        name: "outlayElectricityNight",
        intake: prevIndicators.electricity.night,
      },
      {
        id: "cold_water",
        name: "outlayColdWater",
        intake:
          prevIndicators.bathroom.coldWater + prevIndicators.kitchen.coldWater,
      },
      {
        id: "hot_water",
        name: "outlayHotWater",
        intake:
          prevIndicators.bathroom.hotWater + prevIndicators.kitchen.hotWater,
      },
      {
        id: "disposal_water",
        name: "outlayDisposalWater",
        intake:
          prevIndicators.bathroom.coldWater +
          prevIndicators.kitchen.coldWater +
          prevIndicators.bathroom.hotWater +
          prevIndicators.kitchen.hotWater,
      },
    ];
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
        year: data[key].currentDate.year,
        indicators: [
          {
            id: "day_electricity",
            name: "outlayElectricityDay",
            intake: data[key].electricity.day,
          },
          {
            id: "night_electricity",
            name: "outlayElectricityNight",
            intake: data[key].electricity.night,
          },
          {
            id: "cold_water",
            name: "outlayColdWater",
            intake: data[key].coldWater.bathroom + data[key].coldWater.kitchen,
            bathroom: data[key].coldWater.bathroom,
            kitchen: data[key].coldWater.kitchen,
          },
          {
            id: "hot_water",
            name: "outlayHotWater",
            intake: data[key].hotWater.bathroom + data[key].hotWater.kitchen,
            bathroom: data[key].hotWater.bathroom,
            kitchen: data[key].hotWater.kitchen,
          },
          {
            id: "disposal_water",
            name: "outlayDisposalWater",
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
      month: MONTHS_LIST[new Date(indicator.date).getMonth()].text,
      year: indicator.year,
      electricityDay: indicator.indicators[0].intake,
      electricityNight: indicator.indicators[1].intake,
      coldWaterKitchen: indicator.indicators[2].kitchen,
      coldWaterBathroom: indicator.indicators[2].bathroom,
      hotWaterKitchen: indicator.indicators[3].kitchen,
      hotWaterBathroom: indicator.indicators[3].bathroom,
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
          this.props.enqueueSnackbar(<Text tid="outlaySendSuccess" />, {
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
    let oneIndicator = this.state.indicatorsList.find(
      ({ id }) => id === this.state.sendIndicatorId
    );
    return oneIndicator;
  };

  deleteItemFromIndicators = () => {
    const token = localStorage.getItem("token");
    deleteIndicators(this.state.deleteIndicatorId, token)
      .then((response) => {
        console.log("deleteIndicators", response.data);
        this.setState({ deleteIndicatorId: null });
        this.props.enqueueSnackbar(<Text tid="objectDeleted" />, {
          variant: "info",
          preventDuplicate: true,
        });
      })
      .catch((error) => {
        console.log("[ERROR] deleteIndicators", error);
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

  countCostElectricity = (indicators, date) => {
    let indicatorsDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    let electricityDay = null;
    try {
      electricityDay = indicators.find(({ id }) => id === "day_electricity")
        .outlay;
    } catch (e) {
      console.log("Электричество день", e);
    }

    let electricityNight = null;
    try {
      electricityNight = indicators.find(({ id }) => id === "night_electricity")
        .outlay;
    } catch (e) {
      console.log("Электричество ночь", e);
    }

    let electricityDayTariff = null;
    try {
      electricityDayTariff = this.state.tariffs.find(
        ({ name, dateStart, dateEnd }) => {
          if (
            name === "electricity_day" &&
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
      console.log("Тариф на электричество день загружается...");
    }

    let electricityNightTariff = null;
    try {
      electricityNightTariff = this.state.tariffs.find(
        ({ name, dateStart, dateEnd }) => {
          if (
            name === "electricity_night" &&
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
      console.log("Тариф на электричество ночь загружается...");
    }

    return (
      electricityDay * electricityDayTariff +
      electricityNight * electricityNightTariff
    ).toFixed(2);
  };

  countCostWaterSupply = (indicators, date) => {
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

    return (
      (coldWater + hotWater) * waterTariff +
      disposalWater * disposalTariff
    ).toFixed(2);
  };

  changeCurrentYear = (year) => {
    this.setState({ currentYear: year });
  };

  render() {
    let indicatorsList = null;
    if (this.state.indicatorsList === null && this.state.error === null) {
      indicatorsList = <Loader style={{ marginTop: "30px" }} />;
    } else if (this.state.indicatorsList !== null) {
      indicatorsList = this.state.indicatorsList.filter((item) => {
        return item.date.getUTCFullYear() === this.state.currentYear;
      });

      if (indicatorsList.length > 0) {
        indicatorsList = (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={indicatorsList.length}
            className="carousel-provider"
          >
            <Slider style={{ height: "550px" }}>
              {indicatorsList
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((item, index) => {
                  const costWaterSupply = this.countCostWaterSupply(
                    item.indicators,
                    item.date
                  );
                  const costElectricity = this.countCostElectricity(
                    item.indicators,
                    item.date
                  );
                  return (
                    <Slide index={index} key={index}>
                      <Outlay
                        key={index}
                        indicatorsList={item}
                        costWaterSupply={costWaterSupply}
                        costElectricity={costElectricity}
                        handleDeleteDialogOpen={this.handleDeleteDialogOpen}
                        handleSendDialogOpen={this.handleSendDialogOpen}
                      />
                    </Slide>
                  );
                })}
            </Slider>
            <ButtonBack className="btn-carousel btn-left"></ButtonBack>
            <ButtonNext className="btn-carousel btn-right"></ButtonNext>
          </CarouselProvider>
        );
      } else
        indicatorsList = (
          <p style={{ textAlign: "center", marginTop: "30px" }}>
            <Text tid="outlayNoData" /> {this.state.currentYear}{" "}
            <Text tid="outlayNoDataYear" />
          </p>
        );
    } else {
      indicatorsList = (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          <Text tid={this.state.error} />
        </p>
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
          dialogTitle="outlaySendDialogTitle"
          dialogContent="outlaySendDialogContent"
          activeButtonName="send"
        />
        <DialogSimple
          open={this.state.deleteDialogOpen}
          handleClose={this.handleDeleteDialogClose}
          handleContinue={this.handleDeleteDialogContinue}
          dialogTitle="outlayDeleteDialogTitle"
          dialogContent="outlayDeleteDialogContent"
          activeButtonName="delete"
        />
        <Typography variant="h4" align="center">
          <Text tid="outlayCurrentExpenditure" />
        </Typography>
        <Tabs tabsList={tabsList} changeCurrentYear={this.changeCurrentYear} />
        {indicatorsList}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    prevIndicators: state.prevIndicators,
  };
};

export default connect(mapStateToProps)(withSnackbar(OutlayDetails));
