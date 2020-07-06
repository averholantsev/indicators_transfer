import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Text from "../Text/Text";

const DialogSimple = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Text tid={props.dialogTitle} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Text tid={props.dialogContent} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          <Text tid="cancel" />
        </Button>
        <Button onClick={props.handleContinue} color="secondary" autoFocus>
          <Text tid={props.activeButtonName} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogSimple;
