import "./EntryButton.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ReportState } from "../reportitem/ReportItem.js";

export const ActionMode = {
  BLOCK: {
    getText: (state) => (state === ReportState.BLOCKED ? "Blocked" : "Block"),
    isDisabled: (state) => (state !== ReportState.OPEN ? true : false),
    getTicketStateRequest: () => "BLOCKED",
    getFinalState: () => "BLOCKED",
  },
  RESOLVE: {
    getText: (state) =>
      state === ReportState.RESOLVED ? "Resolved" : "Resolve",
    isDisabled: (state) => (state === ReportState.RESOLVED ? true : false),
    getTicketStateRequest: () => "CLOSED",
    getFinalState: () => "RESOLVED",
  },
};

export function EntryButton({ id, state, setState, mode, callbackFn }) {
  const [actionSuccess, setActionSuccess] = useState(null);
  const [isDisabled, setDisabled] = useState(mode.isDisabled(state));
  const [text, setText] = useState(mode.getText(state));
  useEffect(() => {
    setDisabled(mode.isDisabled(state));
    setText(mode.getText(state));
  }, [setState, state, mode]);

  const actionReport = () => {
    fetch(`http://localhost:3600/reports/${id}`, {
      method: "POST",
      body: JSON.stringify({
        ticketState: mode.getTicketStateRequest(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message.includes("failed")) {
          throw new Error(res.message);
        }
        setState(mode.getFinalState());
        setActionSuccess(mode === ActionMode.BLOCK);
        if (callbackFn != null) {
          callbackFn(id);
        }
      })
      .catch((err) => {
        setActionSuccess(false);
      });
  };

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setActionSuccess(null);
  };

  return (
    <div className="button-div">
      <Button
        className="button"
        disabled={isDisabled}
        onClick={actionReport}
        variant="contained"
      >
        {text}
      </Button>
      <Snackbar
        open={actionSuccess === true}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Spam item blocked successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={actionSuccess === false}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          There was an error while completing this operation
        </Alert>
      </Snackbar>
    </div>
  );
}
