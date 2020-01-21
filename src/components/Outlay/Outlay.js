import React from "react";
import Aux from "../../hoc/AuxW/AuxW";

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
    <Aux>
      <p>
        {indicatorMonth} {indicatorDate.getFullYear()}
      </p>
    </Aux>
  );
};

export default outlay;
