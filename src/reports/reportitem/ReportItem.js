import "./ReportItem.css";
import React, { useState } from "react";
import { EntryButton, ActionMode } from "../button/EntryButton.js";
import Tooltip from "@mui/material/Tooltip";

export const ReportState = {
  OPEN: "OPEN",
  BLOCKED: "BLOCKED",
  RESOLVED: "RESOLVED",
};

function Entry({ id, type, message, state, removeReport }) {
  const maxLength = 16;
  const truncatedMessage =
    message !== null
      ? message.slice(0, Math.min(maxLength, message.length))
      : "None";
  const truncatedId = id.split("-").pop();
  const [reportState, setState] = useState(state);

  return (
    <div className="entry">
      <div className="entry-column-1">
        <div className="entry-row">
          <Tooltip title={id} placement="top">
            <p id={"id-" + id}>
              <b>Id:</b> {truncatedId}
            </p>
          </Tooltip>
        </div>
        <div className="entry-row">
          <p>
            <b>State:</b> {reportState}
          </p>
        </div>
      </div>
      <div className="entry-column-2">
        <div className="entry-row">
          <p>
            <b>Type:</b> {type}
          </p>
        </div>
        <div className="entry-row">
          <Tooltip title={message} placement="top">
            <p id={"message-" + id}>
              <b>Message:</b> {truncatedMessage}
            </p>
          </Tooltip>
        </div>
      </div>
      <div className="entry-column-3">
        <EntryButton
          id={id}
          state={reportState}
          mode={ActionMode.BLOCK}
          setState={setState}
          removeReport={null}
        />
        <EntryButton
          id={id}
          state={reportState}
          mode={ActionMode.RESOLVE}
          setState={setState}
          callbackFn={removeReport}
        />
      </div>
    </div>
  );
}

export default Entry;
