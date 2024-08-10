import React, { useState, FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogComponent from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type DialogProps = {
  title: string;
  buttonTitle: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
  defaultName?: string;
};

const Dialog: FC<DialogProps> = ({
  title,
  buttonTitle,
  defaultName,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState<string | undefined>(defaultName);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name) {
      setError("Name cannot be empty");
      return;
    }
    onSubmit(name);
  };

  return (
    <DialogComponent open={true} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Node name"
          fullWidth
          value={name}
          error={!!error}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{buttonTitle}</Button>
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;
