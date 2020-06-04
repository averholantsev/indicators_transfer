import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    position: "relative",
    marginTop: "30px",
  },
  buttonClose: {
    position: "absolute",
    right: "5px",
    top: "5px",
    padding: 0,
  },
  buttonSend: {
    position: "absolute",
    left: "5px",
    top: "5px",
    padding: 0,
  },
});

const Outlay = (props) => {
  const classes = useStyles();
  const { id, date, indicators } = props.indicatorsList;
  const { costWaterSupply, costElectricity } = props;

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
    <TableContainer component={Paper} className={classes.root}>
      <IconButton
        className={classes.buttonSend}
        aria-label="Отправить"
        component="span"
        color="primary"
        onClick={() => {
          props.handleSendDialogOpen(id);
        }}
        disableRipple
        disableFocusRipple
      >
        <EmailIcon />
      </IconButton>
      <IconButton
        className={classes.buttonClose}
        aria-label="Удалить"
        component="span"
        color="secondary"
        onClick={() => {
          props.handleDeleteDialogOpen(id);
        }}
        disableRipple
        disableFocusRipple
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" align="center">
        {indicatorMonth} {date.getFullYear()}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Показатель</b>
            </TableCell>
            <TableCell align="center">
              <b>Расход</b>
            </TableCell>
            <TableCell align="center">
              <b>Потребление</b>
            </TableCell>
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
            <TableCell align="center" colSpan={3}>
              <b>Расчет стоимости</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" colSpan={2}>
              Водоснабжение
            </TableCell>
            <TableCell align="center">{costWaterSupply}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" colSpan={2}>
              Электроэнергия
            </TableCell>
            <TableCell align="center">{costElectricity}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Outlay;
