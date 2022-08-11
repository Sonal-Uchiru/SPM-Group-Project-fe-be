import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./userSummary.css";

export default function UserSummary() {
  return (
    <div className="container user-summary">
      <div className="card">
        <div className="row m-4">
          <div>
            <h2 className="summary-topic">Summary</h2>
          </div>
          <div>
            <div className="text-center summary-div p-5">
              <h2 className="p-3">20</h2>
            </div>
            <h2 className="text-center sub-text">Number of Applied Jobs</h2>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
