import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const outlay = (props) => {
  const { date, indicators } = props.indicatorsList;
  const { costNovogor } = props

  let indicatorMonth = "";
  switch (date.getMonth()) {
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
    <TableContainer component={Paper} style={{ marginTop: "30px" }}>
      <Typography variant="h6" align="center">
        {indicatorMonth} {date.getFullYear()}
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Показатель</TableCell>
            <TableCell align="center">Расход</TableCell>
            <TableCell align="center">Потребление</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {indicators.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.intake}</TableCell>
              <TableCell align="center">{row.outlay}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">
              Новогор
            </TableCell>
            <TableCell align="center">{costNovogor}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default outlay;
