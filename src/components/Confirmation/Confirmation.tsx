import React, { FC } from "react";
import Button from "@mui/material/Button";
import DialogComponent from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmationProps = {
  name: string;
  onClose: () => void;
  onSubmit: () => void;
};

const Confirmation: FC<ConfirmationProps> = ({
  name,
  onClose,
  onSubmit,
}) => {
  return (
    <DialogComponent
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Delete</Button>
      </DialogActions>
    </DialogComponent>
  );
};

export default Confirmation;
