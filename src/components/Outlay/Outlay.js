import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Close, Email } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Text from "../UI/Text/Text";

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
      indicatorMonth = <Text tid="january" />;
      break;
    case 1:
      indicatorMonth = <Text tid="february" />;
      break;
    case 2:
      indicatorMonth = <Text tid="march" />;
      break;
    case 3:
      indicatorMonth = <Text tid="april" />;
      break;
    case 4:
      indicatorMonth = <Text tid="may" />;
      break;
    case 5:
      indicatorMonth = <Text tid="june" />;
      break;
    case 6:
      indicatorMonth = <Text tid="july" />;
      break;
    case 7:
      indicatorMonth = <Text tid="august" />;
      break;
    case 8:
      indicatorMonth = <Text tid="september" />;
      break;
    case 9:
      indicatorMonth = <Text tid="october" />;
      break;
    case 10:
      indicatorMonth = <Text tid="november" />;
      break;
    case 11:
      indicatorMonth = <Text tid="december" />;
      break;
    default:
      indicatorMonth = <Text tid="notDefined" />;
  }

  return (
    <Paper className={classes.root}>
      <IconButton
        className={classes.buttonSend}
        aria-label={<Text tid="send" />}
        component="span"
        color="primary"
        onClick={() => {
          props.handleSendDialogOpen(id);
        }}
        disableRipple
        disableFocusRipple
      >
        <Email />
      </IconButton>
      <IconButton
        className={classes.buttonClose}
        aria-label={<Text tid="delete" />}
        component="span"
        color="secondary"
        onClick={() => {
          props.handleDeleteDialogOpen(id);
        }}
        disableRipple
        disableFocusRipple
      >
        <Close />
      </IconButton>
      <Typography variant="h6" align="center">
        {indicatorMonth} {date.getFullYear()}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>
                  <Text tid="outlayIndicator" />
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <Text tid="outlayCharge" />
                </b>
              </TableCell>
              <TableCell align="center">
                <b>
                  <Text tid="outlayConsumption" />
                </b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {indicators.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Text tid={row.name} />
                </TableCell>
                <TableCell align="center">{row.intake}</TableCell>
                <TableCell align="center">{row.outlay}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <b>
                  <Text tid="outlayCost" />
                </b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colSpan={2}>
                <Text tid="outlayWaterSupply" />
              </TableCell>
              <TableCell align="center">{costWaterSupply} ₽</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" colSpan={2}>
                <Text tid="outlayElectricity" />
              </TableCell>
              <TableCell align="center">{costElectricity} ₽</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Outlay;
