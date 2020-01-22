import React from "react";
import "./Outlay.css";

const outlay = props => {
  const indicatorDate = new Date(props.date);
  let indicatorMonth = "";
  switch (indicatorDate.getMonth()) {
    case 0:
      indicatorMonth = "Январь";
      break;
    case 1:
      indicatorMonth = "Февраль";
      break;
    case 2:
      indicatorMonth = "Март";
      break;
    case 3:
      indicatorMonth = "Апрель";
      break;
    case 4:
      indicatorMonth = "Май";
      break;
    case 5:
      indicatorMonth = "Июнь";
      break;
    case 6:
      indicatorMonth = "Июль";
      break;
    case 7:
      indicatorMonth = "Август";
      break;
    case 8:
      indicatorMonth = "Сентябрь";
      break;
    case 9:
      indicatorMonth = "Октябрь";
      break;
    case 10:
      indicatorMonth = "Ноябрь";
      break;
    case 11:
      indicatorMonth = "Декабрь";
      break;
    default:
      indicatorMonth = "Не определен";
  }

  return (
    <div className="ui four column centered grid outlayContainer">
      <div className="row">
        <h3>
          {indicatorMonth} {indicatorDate.getFullYear()}
        </h3>
      </div>
      <div className="three column row">
        <div className="column">
          <h4>Показатель</h4>
        </div>
        <div className="column">
          <h4>Расходы</h4>
        </div>
        <div className="column">
          <h4>Потребление</h4>
        </div>
      </div>
      <div className="three column row">
        <div className="column">
          <p>Эл-я день: </p>
          <p>Эл-я ночь: </p>
          <p>Холодная вода: </p>
          <p>Горячая вода: </p>
        </div>
        {props.outlay == null ? (
          "Загрузка..."
        ) : (
          <div className="column">
            <p>{props.indicators.electricity.Day}</p>
            <p>{props.indicators.electricity.Night}</p>
            <p>
              {Number(props.indicators.coldWater.Bathroom) +
                Number(props.indicators.coldWater.Kittchen)}
            </p>
            <p>
              {Number(props.indicators.hotWater.Bathroom) +
                Number(props.indicators.hotWater.Kittchen)}
            </p>
          </div>
        )}
        {props.outlay == null ? (
          "Загрузка..."
        ) : (
          <div className="column">
            <p>{props.outlay.electricityDay}</p>
            <p>{props.outlay.electricityNight}</p>
            <p>{props.outlay.coldWater}</p>
            <p>{props.outlay.hotWater}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default outlay;
