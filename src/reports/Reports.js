import Entry from "./reportitem/ReportItem";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Reports() {
  const [reportsByID, setReportsByID] = useState(new Map());
  const [actionSuccess, setActionSuccess] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3600/get_reports")
      .then((response) => response.json())
      .then((data) => {
        setReportsByID(createMayByID(data));
      })
      .catch((err) => {
        setActionSuccess(false);
      });
  }, []);

  const createMayByID = (data) => {
    return new Map(data.map((obj) => [obj.id, obj]));
  };

  const removeReport = (id) => {
    reportsByID.delete(id);
    setReportsByID(new Map(reportsByID));
    setActionSuccess(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setActionSuccess(null);
  };

  return (
    <>
      {Array.from(reportsByID.values()).map((report) => (
        <Entry
          key={report.id}
          id={report.id}
          state={report.state}
          type={report.type}
          message={report.message}
          removeReport={removeReport}
        />
      ))}

      <Snackbar
        open={actionSuccess === true}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Report removed successfully
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
    </>
  );
}

export default Reports;
